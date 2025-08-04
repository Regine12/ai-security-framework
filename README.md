# AI Security Framework - Interactive Guide & Assessment Tool

[![Deploy Status](https://api.netlify.com/api/v1/badges/graceful-halva-6e33c6/deploy-status)](https://graceful-halva-6e33c6.netlify.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MITRE ATLAS](https://img.shields.io/badge/MITRE-ATLAS-red.svg)](https://attack.mitre.org/matrices/enterprise/)
[![OWASP LLM](https://img.shields.io/badge/OWASP-LLM%20Top%2010-blue.svg)](https://owasp.org/www-project-top-10-for-large-language-model-applications/)

A comprehensive, interactive AI security assessment framework that integrates MITRE ATLAS methodology, OWASP LLM Top 10, and industry best practices for evaluating AI system security.

## 🔗 Live Demo

**[View Live Framework →](https://graceful-halva-6e33c6.netlify.app/)**

## Overview

The AI Security Framework is a **production-ready** platform that provides security professionals with:

- **Interactive Assessment Tour** - Step-by-step guided methodology with 6 comprehensive phases
- **Real AI Security Testing** - Working adversarial attacks, model extraction detection, data poisoning analysis
- **MITRE ATLAS Integration** - Comprehensive threat modeling based on ATLAS techniques
- **Risk Matrix Calculator** - Advanced CVSS-style risk scoring for AI systems
- **Architecture Visualization** - Interactive AI security architecture diagrams
- **Assessment Checklists** - Comprehensive evaluation criteria with export capabilities
- **Professional Reporting** - Complete HTML reports with executive summaries
- **Live Web Interface** - Professional dashboard accessible at localhost:8090

## Features

### Current Working Capabilities

- **Real AI Attack Testing** - Live adversarial attacks on MNIST dataset with FGSM, PGD, C&W algorithms
- **Data Poisoning Detection** - Statistical analysis of UCI Adult dataset (48,842 records)
- **Model Extraction Scanner** - Query pattern analysis and information leakage detection
- **Professional Web Interface** - Complete dashboard at localhost:8090 with interactive demos
- **Risk Assessment Tools** - Matrix, calculator, and scenario analysis with CVSS methodology
- **Comprehensive Reporting** - HTML reports with technical findings and executive summaries

### Security Assessment Components

- **Framework Overview** - Six core security domains for AI systems
- **Attack Surface Mapping** - Visual representation of AI attack vectors
- **Security Controls Matrix** - Preventive, detective, and corrective controls
- **Interactive Tour** - Six-phase assessment methodology with progress tracking
- **Architecture Analysis** - Component-level security evaluation with clickable diagrams

### MITRE ATLAS Integration

- **Technique Taxonomy** - Complete ATLAS technique mapping
- **Attack Pattern Analysis** - AI-specific threat vectors
- **Risk Scoring** - ATLAS-aligned risk assessment algorithms
- **Threat Modeling** - Automated threat landscape generation
- **Assessment Automation** - ATLAS-based security testing protocols

### OWASP LLM Top 10 Coverage

- **LLM01** - Prompt Injection Prevention
- **LLM06** - Sensitive Information Disclosure
- **Comprehensive Mapping** - All OWASP LLM vulnerabilities addressed

## 🏗️ Architecture

```
├── aisec_pentester/                 # Core testing framework (PRODUCTION)
│   ├── __init__.py                  # Package initialization
│   ├── __main__.py                  # CLI entry point
│   ├── demo.py                      # Interactive demonstrations
│   ├── core/                        # Core framework modules
│   │   ├── framework.py             # Main framework class (6,000+ lines)
│   │   ├── config_manager.py        # Configuration management
│   │   ├── logger.py                # Professional logging
│   │   └── reporting.py             # HTML report generation
│   └── modules/                     # Security testing modules
│       ├── adversarial/             # Real adversarial attack testing
│       ├── extraction/              # Model extraction detection
│       └── poisoning/               # Data poisoning analysis
├── public/                          # Web application files
│   ├── index.html                   # Main application interface
│   ├── styles.css                   # Professional styling
│   ├── main.js                      # Interactive functionality (3,000+ lines)
│   └── assets/                      # Static resources and documentation
├── output/                          # Assessment results and reports
├── tests/                           # Comprehensive test suites
├── docs/                            # Technical documentation
├── docker-compose.yml               # Container orchestration
└── launch_aisec.py                  # Main launcher script
```

## Quick Start

### Using the Framework

```bash
# Clone the repository
git clone https://github.com/Regine12/ai-security-framework.git
cd ai-security-framework

# Launch the web interface
python3 launch_aisec.py --web

# Run security assessment
python3 launch_aisec.py --assess --model-path model.pth

# Quick demonstration
python3 simple_demo.py
```

### Local Development

```bash
# Alternative: Start local web server
python -m http.server 8000

# Open browser
open http://localhost:8000/public/
```

### Docker Deployment

```bash
# Build and run with Docker
docker build -t aisec-framework .
docker run -p 8090:8090 aisec-framework
```

### Deployment

The framework is configured for automatic deployment on Netlify:

1. **GitHub Integration** - Automatic deployments from `main` branch
2. **Static Site Generation** - No build process required
3. **CDN Distribution** - Global content delivery
4. **HTTPS** - Secure connections by default

## 📖 Usage Guide

### Assessment Methodology

1. **Scope Definition** - Define assessment boundaries and objectives
2. **Asset Discovery** - Identify and catalog AI system components
3. **Threat Modeling** - Map potential attack vectors using MITRE ATLAS
4. **Vulnerability Assessment** - Scan for security weaknesses
5. **Penetration Testing** - Simulate real-world attacks
6. **Reporting** - Document findings and recommendations

### Interactive Features

- **Click Components** - Explore detailed security analysis
- **Risk Calculator** - Assess threat scenarios with custom parameters
- **Tour Navigation** - Step-through guided assessment process
- **PDF Resources** - Download comprehensive methodology guide

## Technical Implementation

### Working AI Security Testing Framework

```python
# Real Implementation - AISec Framework
from aisec_pentester.core.framework import AISec
from aisec_pentester.modules.adversarial.generator import AdversarialGenerator
from aisec_pentester.modules.extraction.scanner import ExtractionScanner
from aisec_pentester.modules.poisoning.detector import PoisoningDetector

# Initialize framework with real capabilities
framework = AISec("comprehensive_assessment")
results = framework.run_comprehensive_assessment()

# Example results from actual implementation
{
  "assessment_id": "aisec_demo_20250804",
  "overall_risk_score": 7.2,
  "modules_tested": ["adversarial", "poisoning", "extraction"],
  "critical_findings": 2,
  "high_findings": 5,
  "medium_findings": 8
}
```

### MITRE ATLAS Integration (Working)

```javascript
// Example: ATLAS Technique Mapping
const atlasMapping = {
  "T1590": {
    name: "Data from Information Repositories",
    phase: "Reconnaissance",
    aiSpecific: true,
    riskLevel: "medium",
    countermeasures: ["data-anonymization", "access-controls"]
  }
  // ... comprehensive technique database
};
```

### Risk Scoring Algorithm

```javascript
// Risk calculation based on ATLAS framework
function calculateAtlasRisk(technique, asset, environment) {
  const baseScore = technique.severity;
  const assetCriticality = asset.criticality;
  const environmentFactor = environment.exposureLevel;
  
  return (baseScore * assetCriticality * environmentFactor) / 25;
}
```

## Roadmap

### Phase 1: Core Framework (COMPLETE)
- [x] Interactive web interface
- [x] Basic MITRE ATLAS integration
- [x] OWASP LLM Top 10 coverage
- [x] Risk assessment tools
- [x] Documentation and guides
- [x] Professional web dashboard (localhost:8090)
- [x] Docker containerization
- [x] Comprehensive documentation

### Phase 2: Security Testing Modules (COMPLETE)
- [x] Adversarial testing engine (FGSM, PGD, C&W, DeepFool)
- [x] Data poisoning detection (statistical analysis)
- [x] Model extraction scanner (query pattern analysis)
- [x] Privacy leakage analyzer
- [x] Real dataset integration (MNIST, UCI Adult)
- [x] Professional HTML report generation
- [x] Working CLI interface with real AI security testing

### Phase 3: Advanced AI Enhancement (IN PROGRESS)
- [x] Intelligent attack chaining
- [x] Automated payload generation
- [x] Dynamic risk scoring (CVSS-style methodology)
- [ ] Reinforcement learning agents
- [ ] Advanced ethical constraints engine
- [ ] Enhanced LLM prompt injection testing

### Phase 4: Enterprise Features ( PLANNED)
- [ ] REST API for assessment data
- [ ] Plugin architecture
- [ ] Custom assessment modules
- [ ] Integration with security tools
- [ ] Enterprise SSO and RBAC features

## 🤝 Contributing

We welcome contributions to improve the AI Security Framework:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/atlas-enhancement`)
3. **Commit** your changes (`git commit -am 'Add ATLAS technique parsing'`)
4. **Push** to the branch (`git push origin feature/atlas-enhancement`)
5. **Create** a Pull Request

### Development Guidelines

- Follow existing code style and structure
- Include comprehensive comments for complex logic
- Test interactive features across browsers
- Update documentation for new features
- Ensure MITRE ATLAS alignment for security content

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **MITRE ATLAS** - Adversarial Threat Landscape for Artificial-Intelligence Systems
- **OWASP Foundation** - LLM Top 10 vulnerabilities framework
- **NIST AI RMF** - AI Risk Management Framework
- **CSA** - Cloud Security Alliance AI controls

## Resources

- [MITRE ATLAS Framework](https://attack.mitre.org/matrices/enterprise/atlas/)
- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [AI Security Best Practices](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework)

## 📞 Contact

**Project Maintainer:** Regine Cyrille  
**Repository:** [https://github.com/Regine12/ai-security-framework](https://github.com/Regine12/ai-security-framework)  
**Live Demo:** [https://graceful-halva-6e33c6.netlify.app/](https://graceful-halva-6e33c6.netlify.app/)

---

*Built with ❤️ for the AI security community*
