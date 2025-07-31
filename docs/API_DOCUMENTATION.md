# AISec-Pentester API Documentation

## Overview

The AISec-Pentester framework provides both CLI and programmatic APIs for conducting AI security assessments. This documentation covers all available interfaces and integration options.

## Table of Contents

1. [CLI Interface](#cli-interface)
2. [Python API](#python-api)
3. [Web API](#web-api)
4. [Configuration](#configuration)
5. [Assessment Modules](#assessment-modules)
6. [Output Formats](#output-formats)
7. [Examples](#examples)

## CLI Interface

### Basic Usage

```bash
# Run full assessment
python -m aisec_pentester --target <target_model> --output-dir ./results

# Run specific module
python -m aisec_pentester --module adversarial --target <target_model>

# Run with configuration file
python -m aisec_pentester --config config.yaml --target <target_model>
```

### Command Line Options

| Option | Description | Default |
|--------|-------------|---------|
| `--target` | Target model path or API endpoint | Required |
| `--output-dir` | Output directory for results | `./output` |
| `--config` | Configuration file path | `config.yaml` |
| `--module` | Specific module to run | `all` |
| `--verbose` | Enable verbose logging | `False` |
| `--gpu` | Enable GPU acceleration | `False` |
| `--threads` | Number of worker threads | `4` |
| `--timeout` | Operation timeout in seconds | `300` |

### Module-Specific Options

#### Adversarial Testing
```bash
python -m aisec_pentester \
  --module adversarial \
  --target model.pt \
  --attack-type fgsm,pgd,cw \
  --epsilon 0.1 \
  --steps 10
```

#### Data Poisoning Detection
```bash
python -m aisec_pentester \
  --module poisoning \
  --target model.pt \
  --dataset training_data.csv \
  --threshold 0.95
```

#### Model Extraction Testing
```bash
python -m aisec_pentester \
  --module extraction \
  --target api_endpoint \
  --queries 1000 \
  --strategy active
```

## Python API

### Core Framework

```python
from aisec_pentester import AISec_Framework
from aisec_pentester.core import ConfigManager

# Initialize framework
config = ConfigManager.load_config('config.yaml')
framework = AISec_Framework(config)

# Run assessment
results = framework.run_assessment(
    target_model='path/to/model',
    modules=['adversarial', 'poisoning', 'extraction']
)

# Generate report
framework.generate_report(results, output_format='html')
```

### Module-Specific APIs

#### Adversarial Testing Module

```python
from aisec_pentester.modules.adversarial import AdversarialGenerator

# Initialize generator
generator = AdversarialGenerator(
    model=target_model,
    attack_types=['fgsm', 'pgd', 'cw'],
    epsilon=0.1
)

# Generate adversarial examples
adversarial_samples = generator.generate_attacks(test_data)

# Evaluate robustness
robustness_score = generator.evaluate_robustness(adversarial_samples)
```

#### Data Poisoning Detection Module

```python
from aisec_pentester.modules.poisoning import PoisoningDetector

# Initialize detector
detector = PoisoningDetector(
    model=target_model,
    threshold=0.95,
    detection_method='statistical'
)

# Analyze training data
poisoning_analysis = detector.analyze_dataset(training_data)

# Check for backdoors
backdoor_results = detector.detect_backdoors(test_samples)
```

#### Model Extraction Module

```python
from aisec_pentester.modules.extraction import ExtractionScanner

# Initialize scanner
scanner = ExtractionScanner(
    target_api='https://api.example.com/predict',
    query_budget=1000,
    strategy='active'
)

# Perform extraction attack
extraction_results = scanner.extract_model()

# Evaluate extraction success
similarity_score = scanner.evaluate_extraction(extraction_results)
```

## Web API

### Authentication

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "secure_password"
}
```

### Assessment Endpoints

#### Start Assessment

```http
POST /api/assessments
Authorization: Bearer <token>
Content-Type: application/json

{
  "target_model": "path/to/model",
  "modules": ["adversarial", "poisoning"],
  "config": {
    "epsilon": 0.1,
    "attack_types": ["fgsm", "pgd"]
  }
}
```

**Response:**
```json
{
  "assessment_id": "uuid-string",
  "status": "started",
  "estimated_duration": "15 minutes"
}
```

#### Get Assessment Status

```http
GET /api/assessments/{assessment_id}
Authorization: Bearer <token>
```

**Response:**
```json
{
  "assessment_id": "uuid-string",
  "status": "running",
  "progress": 45,
  "current_module": "adversarial",
  "estimated_remaining": "8 minutes"
}
```

#### Get Results

```http
GET /api/assessments/{assessment_id}/results
Authorization: Bearer <token>
```

**Response:**
```json
{
  "assessment_id": "uuid-string",
  "status": "completed",
  "results": {
    "overall_score": 7.2,
    "modules": {
      "adversarial": {
        "robustness_score": 6.5,
        "attacks_successful": 23,
        "total_attacks": 100
      }
    }
  },
  "report_url": "/api/reports/{assessment_id}"
}
```

## Configuration

### Configuration File Format (YAML)

```yaml
# config.yaml
framework:
  output_directory: "./output"
  log_level: "INFO"
  max_workers: 4
  timeout: 300
  gpu_enabled: false

modules:
  adversarial:
    enabled: true
    attack_types: ["fgsm", "pgd", "cw", "deepfool"]
    epsilon_values: [0.01, 0.03, 0.1]
    max_iterations: 100
    
  poisoning:
    enabled: true
    detection_methods: ["statistical", "clustering", "gradient"]
    threshold: 0.95
    sample_size: 1000
    
  extraction:
    enabled: true
    query_budget: 10000
    strategies: ["random", "active", "adaptive"]
    similarity_threshold: 0.8

reporting:
  formats: ["html", "json", "pdf"]
  include_raw_data: false
  executive_summary: true
  
security:
  encryption_enabled: true
  data_retention_days: 90
  audit_logging: true
```

### Programmatic Configuration

```python
from aisec_pentester.core import ConfigManager

config = ConfigManager()

# Framework settings
config.set_framework_config(
    output_directory="./custom_output",
    log_level="DEBUG",
    max_workers=8,
    gpu_enabled=True
)

# Module settings
config.set_module_config("adversarial", {
    "attack_types": ["fgsm", "pgd"],
    "epsilon_values": [0.01, 0.1],
    "max_iterations": 50
})

# Save configuration
config.save_config("custom_config.yaml")
```

## Assessment Modules

### Available Modules

| Module | Description | Key Features |
|--------|-------------|--------------|
| `adversarial` | Adversarial robustness testing | FGSM, PGD, C&W, DeepFool attacks |
| `poisoning` | Data poisoning detection | Statistical analysis, backdoor detection |
| `extraction` | Model extraction assessment | Query-based extraction, similarity analysis |
| `privacy` | Privacy leakage analysis | Membership inference, attribute inference |
| `fairness` | Bias and fairness evaluation | Demographic parity, equalized odds |

### Module Status Codes

| Code | Status | Description |
|------|--------|-------------|
| 0 | Success | Module completed successfully |
| 1 | Warning | Module completed with warnings |
| 2 | Error | Module failed to complete |
| 3 | Timeout | Module exceeded time limit |
| 4 | Skipped | Module was skipped due to conditions |

## Output Formats

### JSON Report Structure

```json
{
  "metadata": {
    "assessment_id": "uuid",
    "timestamp": "2025-07-31T12:00:00Z",
    "framework_version": "2.0",
    "target_model": "path/to/model",
    "duration": "14m32s"
  },
  "summary": {
    "overall_score": 7.2,
    "risk_level": "medium",
    "modules_run": 3,
    "modules_passed": 2,
    "critical_findings": 1
  },
  "modules": {
    "adversarial": {
      "status": "completed",
      "score": 6.5,
      "findings": [...],
      "recommendations": [...]
    }
  },
  "recommendations": [
    {
      "priority": "high",
      "category": "adversarial",
      "description": "Implement adversarial training",
      "impact": "Improve model robustness by 40%"
    }
  ]
}
```

### HTML Report Features

- Executive summary with key metrics
- Interactive charts and visualizations
- Detailed findings with evidence
- Remediation recommendations
- Exportable to PDF

## Examples

### Complete Assessment Script

```python
#!/usr/bin/env python3
"""
Complete AI security assessment example
"""

import os
import logging
from aisec_pentester import AISec_Framework
from aisec_pentester.core import ConfigManager, Logger

def main():
    # Setup logging
    Logger.setup_logging(level=logging.INFO)
    
    # Load configuration
    config = ConfigManager.load_config('assessment_config.yaml')
    
    # Initialize framework
    framework = AISec_Framework(config)
    
    # Define target model
    target_model = '/path/to/your/model.pt'
    
    # Run assessment
    print("Starting AI security assessment...")
    results = framework.run_assessment(
        target_model=target_model,
        modules=['adversarial', 'poisoning', 'extraction'],
        output_dir='./assessment_results'
    )
    
    # Generate reports
    print("Generating reports...")
    framework.generate_report(results, format='html')
    framework.generate_report(results, format='json')
    
    # Print summary
    print(f"Assessment completed!")
    print(f"Overall Score: {results['summary']['overall_score']}/10")
    print(f"Risk Level: {results['summary']['risk_level']}")
    print(f"Reports saved to: {results['output_directory']}")

if __name__ == "__main__":
    main()
```

### Custom Module Example

```python
from aisec_pentester.core.framework import BaseModule

class CustomSecurityModule(BaseModule):
    """Custom security assessment module"""
    
    def __init__(self, config):
        super().__init__("custom_module", config)
    
    def run(self, target_model, **kwargs):
        """Run custom security checks"""
        self.logger.info("Starting custom security assessment")
        
        findings = []
        recommendations = []
        
        # Implement your custom security checks here
        security_score = self._calculate_security_score(target_model)
        
        return {
            'status': 'completed',
            'score': security_score,
            'findings': findings,
            'recommendations': recommendations
        }
    
    def _calculate_security_score(self, model):
        # Your custom scoring logic
        return 8.5
```

## Error Handling

### Common Error Codes

| Code | Error | Description | Solution |
|------|-------|-------------|----------|
| E001 | Model Load Error | Cannot load target model | Check model path and format |
| E002 | Memory Error | Insufficient memory | Reduce batch size or enable GPU |
| E003 | Timeout Error | Operation exceeded time limit | Increase timeout or optimize model |
| E004 | API Error | API endpoint unreachable | Check network connectivity |
| E005 | Config Error | Invalid configuration | Validate configuration file |

### Exception Handling

```python
from aisec_pentester.exceptions import (
    ModelLoadError,
    AssessmentError,
    ConfigurationError
)

try:
    results = framework.run_assessment(target_model)
except ModelLoadError as e:
    print(f"Model loading failed: {e}")
except AssessmentError as e:
    print(f"Assessment failed: {e}")
except ConfigurationError as e:
    print(f"Configuration error: {e}")
```

## Support

For additional support and examples, please refer to:

- [GitHub Repository](https://github.com/Regine12/ai-security-framework)
- [Documentation Wiki](https://github.com/Regine12/ai-security-framework/wiki)
- [Issue Tracker](https://github.com/Regine12/ai-security-framework/issues)

---

**API Version**: 2.0  
**Last Updated**: July 31, 2025
