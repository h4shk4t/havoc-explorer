# HAVOC Explorer · Semantic Graph Instrument

HAVOC Explorer is an interactive web visualizer and dataset rack for exploring **EVR (Evidence Records)**—a structured semantic representation of vulnerability mechanics, causal exploit chains, numeric domain constraints, invariant breaks, and attack surface graph projections across CTFs, CVEs, smart contract security audits, and kernel crash reports.

---

## ⚡ Overview

HAVOC Explorer provides a high-density, machined-instrument UI for browsing and visualizing complex security vulnerability graphs. Each record in the dataset captures:
- **Attack Surface Boundaries**: Entrypoints, actor boundaries, and communication channels.
- **Causal Traces & Invariants**: Step-by-step invariant failures, numerical bounds, and failure operations.
- **Graph Projections**: Attack capability nodes, enable/grant relationships, mitigations, and impact objectives.
- **Provenance & Verification**: Source locators, audited commits, ground truth verification status, and taxonomic mappings (CWE / CAPEC).

---

## 📊 Dataset Breakdown

The dataset contains **600+ EVR evidence records** categorized across multiple security domains:

| Category | Record Count | Primary Data Sources |
| :--- | :---: | :--- |
| **Smart Contract & Protocol Audits** | ~171 | Trail of Bits, OSTIF, Sigma Prime, Spearbit, Doyensec, Cure53, Zellic, NCC Group |
| **Security Research & Writeups** | ~143 | GitHub Security Lab, WatchTowr, Assetnote, Google Project Zero, ZDI, Mozilla, Talos |
| **CTF Challenges & Archives** | ~121 | CTF Archives (`sajjadium/ctf-archives`), SECCON, Google CTF, PlaidCTF, DiceCTF, HITCON |
| **Vulnerability Databases** | ~67 | OSV.dev, RustSec, Go Vuln DB, CVE / NVD, GitLab Advisories |
| **Web Security Research** | ~25 | PortSwigger Web Security Academy & Research |
| **Kernel Crashes & Fuzzing** | ~14 | Syzkaller / Syzbot (Linux, NetBSD, & FreeBSD kernel fuzzing), OSS-Fuzz |

---

## 🚀 Getting Started

The project is static-web compatible and can be viewed locally or hosted on platforms like GitHub Pages.

### Local Preview
Simply launch an HTTP server in the repository directory:

```bash
# Using Python 3
python3 -m http.server 8000
```

Then open your browser to:
- **Index Directory**: `http://localhost:8000/index.html`
- **Graph Visualizer**: `http://localhost:8000/visualizer.html`

---

## 📜 License & Non-Commercial Usage Notice

This repository, including dataset records and visualizer components, is licensed under the **[Creative Commons Attribution-NonCommercial 4.0 International Public License (CC-BY-NC-4.0)](LICENSE)**.

### Usage Restrictions:
- **Non-Commercial Use Only**: The dataset and code are provided strictly for educational, academic, and non-commercial security research.
- **Attribution**: Any derivative works, research publications, or re-distributions must provide proper attribution to HAVOC Explorer and the original vulnerability report authors.

---

## 🔒 Safety & Compliance Audit

Prior to public release, an automated safety check was performed on this dataset:
- **API Keys & Credentials**: 0 active API tokens, private SSH keys, AWS credentials, or passwords found.
- **Malware & Executables**: 0 binary payload files (`.exe`, `.elf`, `.dll`, `.so`) are present.
- **CTF Flags**: All flag strings (e.g. `FLAG{test}`) are synthetic mock values used in schema validation.
- **PII**: All email addresses present (e.g. `support@acme.org`) are dummy test domains.

---

## 🙏 Acknowledgements & Sources

HAVOC Explorer synthesizes data derived from public security research, audit reports, open vulnerability databases, and CTF writeups. We extend our sincere gratitude and credit to the security researchers, audit firms, CTF creators, and open-source maintainers whose research enables structural security modeling.

The dataset sources are exhaustively grouped by category below:

### 🛡️ 1. Security Audit & Assessment Firms
* **Smart Contract & Web3 Audits**: [Sigma Prime](https://sigp.io), [Spearbit](https://spearbit.com), [Trail of Bits](https://trailofbits.com), [Zellic](https://zellic.io), [Veridise](https://veridise.com).
* **Software & Web Audits**: [Cure53](https://cure53.de), [OSTIF (Open Source Technology Improvement Fund)](https://ostif.org), [Doyensec](https://doyensec.com), [NCC Group](https://nccgroup.com), [X41 D-Sec](https://x41-dsec.de), [Quarkslab](https://quarkslab.com), [Ambionics](https://ambionics.io), [Include Security](https://includesecurity.com).

### 🔬 2. Security Research Labs & Threat Intelligence
* [Google Project Zero](https://googleprojectzero.blogspot.com)
* [GitHub Security Lab (GHSL)](https://securitylab.github.com)
* [watchTowr Labs](https://labs.watchtowr.com)
* [Assetnote](https://www.assetnote.io)
* [Zero Day Initiative (ZDI)](https://www.zerodayinitiative.com)
* [Cisco Talos Intelligence](https://talosintelligence.com)
* [Mozilla Security](https://bugzilla.mozilla.org)
* [Star Labs](https://starlabs.sg)
* [Lexfo Security](https://blog.lexfo.fr)

### 🎓 3. Academic Research, Cryptographic Attacks & Hardware Papers
* **Cryptographic & Protocol Attacks**: Minerva Attack, KyberSlash / KyberSlash2, GoFetch, Terrapin Attack, Trojan Source, Raccoon Attack, Logjam (CCS'15), Zenbleed, WeakDH.
* **Academic Conferences**: USENIX Security, IEEE Symposium on Security and Privacy (S&P), ACM Conference on Computer and Communications Security (CCS), IACR Cryptology ePrint Archive.

### 🗃️ 4. Open Source Vulnerability Databases & Fuzzers
* **Vulnerability Databases**: [Google OSV.dev](https://osv.dev), [RustSec Advisory Database](https://rustsec.org), [Go Vulnerability Database](https://pkg.go.dev/vuln/), [NIST NVD / CVE](https://nvd.nist.gov), [GitLab Security Advisories](https://gitlab.com).
* **Fuzzing Infrastructure**: [Syzkaller / Syzbot](https://syzkaller.appspot.com) (Linux, NetBSD, & FreeBSD kernel coverage), [OSS-Fuzz](https://oss-fuzz.com).

### 🚩 5. CTF Competitions & Challenge Repositories
* **Archives**: [`sajjadium/ctf-archives`](https://github.com/sajjadium/ctf-archives)
* **Competitions**: SECCON CTF, Google CTF, DEF CON CTF, PlaidCTF, DiceCTF, HITCON CTF, DownUnderCTF (DUCTF), LakeCTF, Real World CTF (RWCTF), kernelCTF.

### 🌐 6. Web Application & Infrastructure Vendor Advisories
* [PortSwigger Web Security Academy & Research](https://portswigger.net)
* [Jenkins Security Advisories](https://www.jenkins.io/security/)
* [Kubernetes Security](https://kubernetes.io)
* [Xen Hypervisor Advisories (XSA)](https://xenbits.xen.org)
* [OpenBao](https://openbao.org), [Django](https://djangoproject.com), [Curl](https://curl.se).

---

## 📩 Takedown & Removal Requests

All records in HAVOC Explorer are synthesized analytical abstractions linked to original public sources for research and educational purposes. If you are a copyright holder, audit firm, or researcher and would like to request the removal or modification of any specific record, please open an issue in this repository or contact the maintainer at:

- **Maintainer**: Ashutosh Srivastava ([@h4shk4t](https://github.com/h4shk4t))
