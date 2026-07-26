// Physics Web Worker for Force-Directed Graph Layout
let nodes = [];
let edges = [];
let nodeMap = new Map();
let familyCenters = new Map();

// Expanded canvas bounds for crisp, non-overlapping spacing
let width = 5000;
let height = 3200;

let isRunning = false;
let alpha = 1.0;
let alphaMin = 0.003;
let alphaDecay = 0.018;

self.onmessage = function(e) {
  const { type, payload } = e.data;
  
  if (type === 'INIT') {
    initSimulation(payload);
  } else if (type === 'START') {
    startSimulation();
  } else if (type === 'STOP') {
    isRunning = false;
  } else if (type === 'DRAG') {
    const { id, x, y } = payload;
    const n = nodeMap.get(id);
    if (n) {
      n.x = x;
      n.y = y;
      n.vx = 0;
      n.vy = 0;
      alpha = Math.max(alpha, 0.12);
      if (!isRunning) startSimulation();
    }
  } else if (type === 'RESIZE') {
    width = payload.width || 5000;
    height = payload.height || 3200;
    assignFamilyCenters();
  }
};

function initSimulation({ nodes: rawNodes, edges: rawEdges, width: w, height: h }) {
  // Keep the world close to viewport scale so clusters fill the frame instead of
  // scattering to the edges with a dead centre (esp. with few families).
  width = Math.max(w * 1.6, 2800);
  height = Math.max(h * 1.6, 1900);
  
  // Collect unique families for clustering
  const families = Array.from(new Set(rawNodes.map(n => n.family))).sort();
  
  // Arrange family cluster target centers in a spacious grid
  assignFamilyCenters(families);
  
  // Copy and initialize node positions
  nodeMap.clear();
  nodes = rawNodes.map(n => {
    const fc = familyCenters.get(n.family) || { x: width / 2, y: height / 2 };
    // Initial offset around family center
    const rx = (Math.random() - 0.5) * 450;
    const ry = (Math.random() - 0.5) * 450;
    
    const nodeObj = {
      id: n.id,
      family: n.family,
      kind: n.kind,
      support: n.support || 1,
      x: fc.x + rx,
      y: fc.y + ry,
      vx: 0,
      vy: 0
    };
    nodeMap.set(n.id, nodeObj);
    return nodeObj;
  });

  // Map edges to node references
  edges = [];
  for (const e of rawEdges) {
    const srcNode = nodeMap.get(e.src);
    const dstNode = nodeMap.get(e.dst);
    if (srcNode && dstNode) {
      edges.push({
        source: srcNode,
        target: dstNode,
        type: e.type,
        family: e.family
      });
    }
  }

  alpha = 1.0;
  startSimulation();
}

function assignFamilyCenters(familiesList) {
  if (!familiesList) {
    familiesList = Array.from(familyCenters.keys());
  }
  const count = familiesList.length;
  if (count === 0) return;
  
  const cols = Math.ceil(Math.sqrt(count * 1.3));
  const rows = Math.ceil(count / cols);
  
  const marginX = width * 0.26;
  const marginY = height * 0.24;
  const stepX = (width - 2 * marginX) / Math.max(1, cols - 1);
  const stepY = (height - 2 * marginY) / Math.max(1, rows - 1);
  
  familyCenters.clear();
  familiesList.forEach((fam, idx) => {
    const c = idx % cols;
    const r = Math.floor(idx / cols);
    familyCenters.set(fam, {
      x: marginX + c * stepX,
      y: marginY + r * stepY
    });
  });
}

function startSimulation() {
  if (isRunning) return;
  isRunning = true;
  runLoop();
}

function runLoop() {
  if (!isRunning) return;

  for (let i = 0; i < 2; i++) {
    if (alpha > alphaMin) {
      stepPhysics();
      alpha *= (1 - alphaDecay);
    } else {
      isRunning = false;
      break;
    }
  }

  // Post positions back to main thread
  const posArray = new Float32Array(nodes.length * 2);
  for (let i = 0; i < nodes.length; i++) {
    posArray[i * 2] = nodes[i].x;
    posArray[i * 2 + 1] = nodes[i].y;
  }

  self.postMessage({
    type: 'TICK',
    alpha,
    positions: posArray.buffer
  }, [posArray.buffer]);

  if (isRunning && alpha > alphaMin) {
    setTimeout(runLoop, 16);
  } else {
    self.postMessage({ type: 'STABILIZED' });
  }
}

function stepPhysics() {
  const kRepulsion = 8000 * alpha;
  const kLink = 0.05 * alpha;
  const kGravity = 0.005 * alpha;
  const kFamily = 0.11 * alpha;
  const targetDist = 110;

  // 1. Repulsion (Spatial Grid optimization)
  const cellSize = 220;
  const grid = new Map();
  
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    const cx = Math.floor(a.x / cellSize);
    const cy = Math.floor(a.y / cellSize);
    const key = `${cx},${cy}`;
    if (!grid.has(key)) grid.set(key, []);
    grid.get(key).push(a);
  }

  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    const cx = Math.floor(a.x / cellSize);
    const cy = Math.floor(a.y / cellSize);
    
    for (let dx = -2; dx <= 2; dx++) {
      for (let dy = -2; dy <= 2; dy++) {
        const cell = grid.get(`${cx + dx},${cy + dy}`);
        if (!cell) continue;
        for (let j = 0; j < cell.length; j++) {
          const b = cell[j];
          if (a === b) continue;
          let ddx = b.x - a.x;
          let ddy = b.y - a.y;
          let distSq = ddx * ddx + ddy * ddy;
          if (distSq < 1) distSq = 1;
          if (distSq > cellSize * cellSize * 4) continue;
          
          let dist = Math.sqrt(distSq);
          let force = kRepulsion / distSq;
          a.vx -= (ddx / dist) * force;
          a.vy -= (ddy / dist) * force;
        }
      }
    }
  }

  // 2. Link Attraction
  for (let i = 0; i < edges.length; i++) {
    const e = edges[i];
    const a = e.source;
    const b = e.target;
    let ddx = b.x - a.x;
    let ddy = b.y - a.y;
    let dist = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
    let delta = dist - targetDist;
    let force = delta * kLink;

    let fx = (ddx / dist) * force;
    let fy = (ddy / dist) * force;

    a.vx += fx;
    a.vy += fy;
    b.vx -= fx;
    b.vy -= fy;
  }

  // 3. Family Cluster Center Gravity
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    const fc = familyCenters.get(a.family);
    if (fc) {
      a.vx += (fc.x - a.x) * kFamily;
      a.vy += (fc.y - a.y) * kFamily;
    }
    
    // Central Gravity
    a.vx += (width / 2 - a.x) * kGravity;
    a.vy += (height / 2 - a.y) * kGravity;
  }

  // 4. Velocity Damping & Limits
  const damping = 0.80;
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    a.vx *= damping;
    a.vy *= damping;
    
    const speed = Math.sqrt(a.vx * a.vx + a.vy * a.vy);
    if (speed > 30) {
      a.vx = (a.vx / speed) * 30;
      a.vy = (a.vy / speed) * 30;
    }

    a.x += a.vx;
    a.y += a.vy;
  }
}
