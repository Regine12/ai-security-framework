#!/usr/bin/env python3
"""
AISec-Pentester: Production-ready AI Security Testing Framework
Setup script for PyPI distribution and development installation
"""

from setuptools import setup, find_packages
from pathlib import Path

# Read the README file
this_directory = Path(__file__).parent
long_description = (this_directory / "README_AISEC.md").read_text()

# Read requirements
requirements = []
with open('aisec_pentester/requirements.txt') as f:
    requirements = [line.strip() for line in f if line.strip() and not line.startswith('#')]

setup(
    name="aisec-pentester",
    version="2.0.0",
    author="AI Security Research Team",
    author_email="security@aisec-pentester.org",
    description="Production-ready AI Security Testing Framework for comprehensive security assessments",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/Regine12/AISec-pentester",
    project_urls={
        "Bug Tracker": "https://github.com/Regine12/AISec-pentester/issues",
        "Documentation": "https://aisec-pentester.readthedocs.io/",
        "Source Code": "https://github.com/Regine12/AISec-pentester",
    },
    packages=find_packages(),
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Information Technology",
        "Intended Audience :: Science/Research",
        "Topic :: Security",
        "Topic :: Scientific/Engineering :: Artificial Intelligence",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.8",
    install_requires=requirements,
    extras_require={
        "dev": [
            "pytest>=6.0",
            "pytest-cov>=2.0",
            "black>=22.0",
            "flake8>=4.0",
            "mypy>=0.950",
            "pre-commit>=2.15",
        ],
        "docs": [
            "sphinx>=4.0",
            "sphinx-rtd-theme>=1.0",
            "myst-parser>=0.17",
        ],
        "gpu": [
            "torch[cuda]>=1.13.0",
            "torchvision[cuda]>=0.14.0",
        ]
    },
    entry_points={
        "console_scripts": [
            "aisec=aisec_pentester.__main__:main",
            "aisec-pentester=aisec_pentester.__main__:main",
            "aisec-cli=aisec_pentester.__main__:main",
        ],
    },
    include_package_data=True,
    package_data={
        "aisec_pentester": [
            "config/*.yaml",
            "templates/*.json",
            "data/*.csv",
        ],
    },
    keywords=[
        "ai-security", "adversarial-attacks", "machine-learning-security",
        "penetration-testing", "data-poisoning", "model-extraction",
        "cybersecurity", "pytorch", "tensorflow", "mitre-atlas"
    ],
    zip_safe=False,
)
