#!/usr/bin/env python3
"""
Interactive AI Security Testing Suite
Test real ML attacks on real models with real datasets
"""

import os
import sys
import json
from datetime import datetime

def main():
    print("[SUITE] Interactive AI Security Testing Suite")
    print("=" * 50)
    print()
    
    print("Available Test Options:")
    print("1. [ATTACK] Adversarial Attacks (FGSM, PGD, C&W)")
    print("2. [TEST] Data Poisoning Detection")
    print("3. [SCAN]  Model Extraction Testing")
    print("4. [REPORT] Comprehensive Security Assessment")
    print("5. [LAUNCH] Real Model Upload & Test")
    print()
    
    choice = input("Select test type (1-5): ").strip()
    
    if choice == "1":
        run_adversarial_tests()
    elif choice == "2":
        run_poisoning_tests()
    elif choice == "3":
        run_extraction_tests()
    elif choice == "4":
        run_comprehensive_assessment()
    elif choice == "5":
        run_custom_model_test()
    else:
        print("Invalid choice. Exiting.")

def run_adversarial_tests():
    print("\n[ATTACK] Running Adversarial Attack Testing...")
    print("Testing model robustness against:")
    print("- FGSM (Fast Gradient Sign Method)")
    print("- PGD (Projected Gradient Descent)")
    print("- C&W (Carlini & Wagner)")
    print("- DeepFool")
    print()
    
    # Change to the aisec_pentester directory
    os.chdir("aisec_pentester")
    
    # Run the adversarial testing module
    os.system("python3 -c \"from modules.adversarial.generator import AdversarialGenerator; from core.config_manager import ConfigManager; config = ConfigManager(); gen = AdversarialGenerator(config); results = gen.test_model(); print('\\n[SUITE] Attack Results:', json.dumps(results, indent=2))\"")

def run_poisoning_tests():
    print("\n[TEST] Running Data Poisoning Detection...")
    print("Testing for malicious training data:")
    print("- Label flipping attacks")
    print("- Backdoor injection")
    print("- Feature manipulation")
    print()
    
    os.chdir("aisec_pentester")
    os.system("python3 -c \"from modules.poisoning.detector import PoisoningDetector; from core.config_manager import ConfigManager; config = ConfigManager(); detector = PoisoningDetector(config); results = detector.scan_dataset(); print('\\n[TEST] Poisoning Results:', json.dumps(results, indent=2))\"")

def run_extraction_tests():
    print("\n[SCAN] Running Model Extraction Testing...")
    print("Testing for intellectual property vulnerabilities:")
    print("- Query-based extraction")
    print("- Gradient-based extraction")
    print("- Side-channel analysis")
    print()
    
    os.chdir("aisec_pentester")
    os.system("python3 -c \"from modules.extraction.scanner import ExtractionScanner; from core.config_manager import ConfigManager; config = ConfigManager(); scanner = ExtractionScanner(config); results = scanner.test_extraction(); print('\\n[SCAN] Extraction Results:', json.dumps(results, indent=2))\"")

def run_comprehensive_assessment():
    print("\n[REPORT] Running Comprehensive Security Assessment...")
    print("Full security evaluation including all test types")
    print()
    
    os.chdir("aisec_pentester")
    os.system("python3 demo.py")

def run_custom_model_test():
    print("\n[LAUNCH] Custom Model Testing")
    print("Upload your own model for security testing")
    print()
    
    model_path = input("Enter path to your model file (.pkl, .pth, .h5): ").strip()
    
    if not os.path.exists(model_path):
        print(f"[ERROR] Model file not found: {model_path}")
        return
    
    print(f"[SUCCESS] Found model: {model_path}")
    print("Running security assessment on your model...")
    
    os.chdir("aisec_pentester")
    os.system(f"python3 -c \"from core.framework import AISec; framework = AISec(); framework.assess_model('{model_path}')\"")

if __name__ == "__main__":
    main()
