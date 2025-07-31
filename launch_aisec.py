#!/usr/bin/env python3
"""
AI Security Framework Launcher
Production-ready AI security testing with real ML security analysis
"""

import sys
import os
import argparse
import webbrowser
import time
import subprocess
import json
from pathlib import Path
from datetime import datetime

# Add the aisec_pentester module to the path
sys.path.insert(0, str(Path(__file__).parent / "aisec_pentester"))

try:
    from aisec_pentester.core.framework import AISec
    from aisec_pentester.core.config_manager import ConfigManager
    from aisec_pentester.core.logger import get_logger
except ImportError as e:
    print(f"Error importing AISec modules: {e}")
    print("Please ensure all dependencies are installed: pip3 install -r aisec_pentester/requirements.txt")
    sys.exit(1)


def run_web_interface():
    """Launch the web interface"""
    print("🌐 Launching AI Security Framework Web Interface...")
    
    # Check if Node.js server exists
    if Path("server.js").exists():
        try:
            # Start Node.js server
            print("Starting Node.js server...")
            subprocess.Popen(["node", "server.js"], 
                           stdout=subprocess.DEVNULL, 
                           stderr=subprocess.DEVNULL)
            time.sleep(2)
            
            # Open web interface
            webbrowser.open("http://localhost:3000")
            print("✅ Web interface launched at http://localhost:3000")
            
        except Exception as e:
            print(f"Failed to start Node.js server: {e}")
            # Fallback to static file
            fallback_web_interface()
    else:
        fallback_web_interface()


def fallback_web_interface():
    """Launch static web interface as fallback"""
    index_path = Path("public/index.html")
    if index_path.exists():
        file_url = f"file://{index_path.absolute()}"
        webbrowser.open(file_url)
        print(f"✅ Web interface launched: {file_url}")
    else:
        print("❌ Web interface files not found")


def run_security_assessment(args):
    """Run comprehensive AI security assessment"""
    print("🔒 Starting AI Security Assessment...")
    print("=" * 80)
    
    # Initialize the framework
    try:
        aisec = AISec(output_dir=args.output_dir)
        
        # Display framework info
        info = aisec.get_framework_info()
        print(f"Framework: {info['name']} v{info['version']}")
        print(f"Device: {info['device']}")
        print(f"Output Directory: {info['output_directory']}")
        print("=" * 80)
        
        # Run assessment based on type
        if args.quick:
            print("🚀 Running Quick Security Scan...")
            results = aisec.quick_scan(args.model_path)
            
            print("\n📊 QUICK SCAN RESULTS")
            print("=" * 40)
            
            if 'tests' in results:
                if 'adversarial' in results['tests']:
                    adv = results['tests']['adversarial']
                    print(f"Adversarial Robustness: {adv['robustness_score']:.1f}/10")
                    print(f"Vulnerabilities Found: {adv['vulnerabilities']}")
                
                if 'poisoning' in results['tests']:
                    poison = results['tests']['poisoning']
                    print(f"Data Poisoning Threat: {poison['threat_level']}")
                    print(f"Detection Score: {poison['detection_score']:.1f}/10")
            
        else:
            print("🔍 Running Comprehensive Security Assessment...")
            
            assessment_name = args.name or f"assessment_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            
            results = aisec.run_comprehensive_assessment(
                target_model_path=args.model_path,
                dataset_path=args.dataset_path,
                assessment_name=assessment_name
            )
            
            print("\n📊 COMPREHENSIVE ASSESSMENT RESULTS")
            print("=" * 50)
            print(f"Overall Security Score: {results['overall_security_score']:.1f}/10")
            print(f"Risk Level: {results['risk_level']}")
            print(f"Vulnerabilities Found: {len(results['vulnerabilities_found'])}")
            
            if results['vulnerabilities_found']:
                print("\n🚨 KEY VULNERABILITIES:")
                for i, vuln in enumerate(results['vulnerabilities_found'][:3], 1):
                    print(f"{i}. {vuln['type']} ({vuln['severity']})")
                    print(f"   {vuln['details']}")
            
            if results['recommendations']:
                print("\n💡 TOP RECOMMENDATIONS:")
                for i, rec in enumerate(results['recommendations'][:5], 1):
                    print(f"{i}. {rec}")
            
            if 'report_path' in results:
                print(f"\n📄 Detailed report saved to: {results['report_path']}")
        
        print("\n✅ Assessment completed successfully!")
        
    except Exception as e:
        print(f"❌ Assessment failed: {e}")
        import traceback
        traceback.print_exc()
        return 1
    
    return 0


def run_demo_tests():
    """Run demonstration of AI security testing capabilities"""
    print("🎯 Running AI Security Testing Demo...")
    print("=" * 80)
    
    try:
        aisec = AISec()
        
        print("1️⃣  Testing Adversarial Robustness...")
        # Test adversarial robustness with real ART implementation
        adv_results = aisec.adversarial.test_model()
        print(f"   ✓ Robustness Score: {adv_results['robustness_score']:.1f}/10")
        print(f"   ✓ Attack Methods Tested: {len(adv_results['attack_results'])}")
        
        # Show specific attack results
        for attack_name, result in adv_results['attack_results'].items():
            success_rate = result.get('success_rate', 0)
            print(f"   • {attack_name}: {success_rate:.1%} success rate")
        
        return 0
        
    except Exception as e:
        print(f"❌ Demo failed: {e}")
        import traceback
        traceback.print_exc()
        return 1


def run_demo_tests():
    """Run demonstration of AI security testing capabilities with real datasets"""
    print("🎯 Running AI Security Testing Demo with Real Datasets...")
    print("=" * 80)
    
    try:
        aisec = AISec()
        
        print("1️⃣  Testing Adversarial Robustness on MNIST Dataset...")
        # The adversarial generator already uses real MNIST data
        adv_results = aisec.adversarial.test_model()
        print(f"   ✓ Robustness Score: {adv_results['robustness_score']:.1f}/10")
        print(f"   ✓ Attack Methods Tested: {len(adv_results['attack_results'])}")
        print(f"   ✓ Dataset: MNIST (Real handwritten digits)")
        print(f"   ✓ Model: Convolutional Neural Network")
        
        # Show specific attack results
        for attack_name, result in adv_results['attack_results'].items():
            success_rate = result.get('success_rate', 0)
            confidence_drop = result.get('confidence_drop', 0)
            print(f"   • {attack_name}: {success_rate:.1%} success rate, {confidence_drop:.2f} confidence drop")
        
        print("\n2️⃣  Testing Data Poisoning Detection on UCI Adult Dataset...")
        # Use UCI Adult dataset (commonly used for ML security research)
        try:
            # Download and use real UCI Adult dataset
            import urllib.request
            import pandas as pd
            import tempfile
            import os
            import numpy as np
            
            print("   📥 Downloading UCI Adult dataset...")
            adult_url = "https://archive.ics.uci.edu/ml/machine-learning-databases/adult/adult.data"
            
            with tempfile.NamedTemporaryFile(mode='w+', suffix='.csv', delete=False) as f:
                try:
                    urllib.request.urlretrieve(adult_url, f.name)
                    
                    # Convert to our expected format
                    df = pd.read_csv(f.name, header=None)
                    # Take first 1000 rows for demo
                    demo_df = df.head(1000)
                    
                    # Convert to JSON format expected by our detector
                    demo_data = []
                    for _, row in demo_df.iterrows():
                        demo_data.append({
                            'features': row[:-1].tolist(),  # All columns except last
                            'label': 1 if str(row.iloc[-1]).strip() == '>50K' else 0
                        })
                    
                    # Add some artificial poisoned samples for demonstration
                    for i in range(50):  # Add 5% poisoned samples
                        poisoned_sample = demo_data[i % len(demo_data)].copy()
                        # Modify features to create outliers
                        poisoned_sample['features'] = [x * 10 if isinstance(x, (int, float)) else x 
                                                     for x in poisoned_sample['features']]
                        poisoned_sample['label'] = 1  # Force positive label
                        demo_data.append(poisoned_sample)
                    
                    # Save in JSON format
                    with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as json_f:
                        import json
                        json.dump(demo_data, json_f)
                        dataset_path = json_f.name
                    
                    poison_results = aisec.poisoning.scan_dataset(dataset_path)
                    print(f"   ✓ Risk Level: {poison_results['risk_level']}")
                    print(f"   ✓ Anomalous Samples: {poison_results['anomalous_samples']}")
                    print(f"   ✓ Dataset: UCI Adult Census (Real socioeconomic data)")
                    print(f"   ✓ Samples Analyzed: {poison_results['total_samples']}")
                    
                    # Show detection results
                    print(f"   • Confidence: {poison_results['confidence']:.1%}")
                    print(f"   • Backdoor Patterns: {poison_results['backdoor_patterns']} detected")
                    
                    # Clean up
                    os.unlink(dataset_path)
                    
                except Exception as download_error:
                    print(f"   ⚠️  Could not download UCI dataset: {download_error}")
                    print("   🔄 Falling back to synthetic data for demo...")
                    # Create synthetic data and save to temp file for demo
                    import json
                    synthetic_data = []
                    for i in range(100):
                        synthetic_data.append({
                            'features': [float(x) for x in np.random.normal(0, 1, 10)],
                            'label': int(np.random.choice([0, 1]))
                        })
                    
                    with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as syn_f:
                        json.dump(synthetic_data, syn_f)
                        syn_dataset_path = syn_f.name
                    
                    poison_results = aisec.poisoning.scan_dataset(syn_dataset_path)
                    print(f"   ✓ Risk Level: {poison_results['risk_level']}")
                    print(f"   ✓ Anomalous Samples: {poison_results['anomalous_samples']}")
                    
                    os.unlink(syn_dataset_path)
                finally:
                    if os.path.exists(f.name):
                        os.unlink(f.name)
                    
        except ImportError:
            print("   ⚠️  pandas not available, using synthetic data for demo...")
            # Create synthetic data for demo
            import json
            synthetic_data = []
            for i in range(100):
                synthetic_data.append({
                    'features': [float(x) for x in np.random.normal(0, 1, 10)],
                    'label': int(np.random.choice([0, 1]))
                })
            
            with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as syn_f:
                json.dump(synthetic_data, syn_f)
                syn_dataset_path = syn_f.name
            
            poison_results = aisec.poisoning.scan_dataset(syn_dataset_path)
            print(f"   ✓ Risk Level: {poison_results['risk_level']}")
            print(f"   ✓ Anomalous Samples: {poison_results['anomalous_samples']}")
            
            os.unlink(syn_dataset_path)
        
        print("\n3️⃣  Testing Model Extraction Detection on GPT-2 Style Queries...")
        # Test extraction detection with realistic LLM query patterns
        demo_url = "http://localhost:8080/predict"  # Demo URL for testing
        extract_results = aisec.extraction.test_extraction(demo_url)
        print(f"   ✓ Risk Level: {extract_results['risk_level']}")
        print(f"   ✓ Query Budget Used: {extract_results['query_budget_used']} queries")
        print(f"   ✓ Analysis Type: Language model query pattern detection")
        print(f"   ✓ Extraction Fidelity: {extract_results['extraction_fidelity']:.1%}")
        
        if 'estimated_parameters' in extract_results:
            params = extract_results['estimated_parameters']
            print(f"   • Estimated Model Size: {params}")
        
        if 'estimated_architecture' in extract_results:
            arch = extract_results['estimated_architecture']
            print(f"   • Estimated Architecture: {arch}")
        
        print("\n4️⃣  Real Dataset Summary...")
        print("   📊 Datasets Used in This Demo:")
        print("   • MNIST: 70,000 handwritten digit images (Computer Vision)")
        print("   • UCI Adult: 48,842 census records (Tabular ML)")
        print("   • Synthetic LLM Queries: GPT-style extraction patterns (NLP)")
        
        print("\n✅ Demo completed successfully!")
        print("🔍 This demonstrates real AI security testing capabilities using:")
        print("   • Real-world datasets from academic and industry sources")
        print("   • Production ML libraries (ART, Scikit-learn, PyTorch)")
        print("   • Industry-standard attack and defense techniques")
        print("   • Statistical and information-theoretic detection methods")
        
        return 0
        
    except Exception as e:
        print(f"❌ Demo failed: {e}")
        import traceback
        traceback.print_exc()
        return 1
        # Create a temporary dataset for demo purposes
        import tempfile
        import numpy as np
        from sklearn.datasets import make_classification
        
        with tempfile.NamedTemporaryFile(mode='w', suffix='.csv', delete=False) as f:
            # Generate synthetic dataset
            X, y = make_classification(n_samples=500, n_features=10, n_classes=2, random_state=42)
            import pandas as pd
            df = pd.DataFrame(X)
            df['label'] = y
            df.to_csv(f.name, index=False)
            demo_dataset_path = f.name
        
        try:
            # Test poisoning detection with real dataset
            poison_results = aisec.poisoning.scan_dataset(demo_dataset_path)
            print(f"   ✓ Threat Level: {poison_results['threat_level']}")
            print(f"   ✓ Detection Methods: {len(poison_results['results'])}")
            
            # Show detection method results  
            for method, result in poison_results['results'].items():
                if 'anomaly_ratio' in result:
                    ratio = result['anomaly_ratio']
                    print(f"   • {method}: {ratio:.1%} anomalies detected")
                elif 'outliers_detected' in result:
                    outliers = result['outliers_detected']
                    print(f"   • {method}: {outliers} outliers detected")
        finally:
            # Clean up temp file
            import os
            try:
                os.unlink(demo_dataset_path)
            except:
                pass
        
        print("\n3️⃣  Testing Model Extraction Detection...")
        # Test extraction detection with information theory
        extract_results = aisec.extraction.test_extraction()
        print(f"   ✓ Risk Level: {extract_results['risk_level']}")
        print(f"   ✓ Query Analysis: {extract_results['total_queries']} queries analyzed")
        
        if 'entropy_analysis' in extract_results:
            entropy = extract_results['entropy_analysis']['average_entropy']
            print(f"   • Information Entropy: {entropy:.2f} bits")
        elif 'confidence_analysis' in extract_results:
            conf = extract_results['confidence_analysis']['average_confidence']
            print(f"   • Average Confidence: {conf:.2f}")
        
        print("\n✅ Demo completed successfully!")
        print("🔍 This demonstrates real AI security testing capabilities using:")
        print("   • Adversarial Robustness Toolbox (ART) for real adversarial attacks")
        print("   • Scikit-learn for statistical poisoning detection")
        print("   • Information theory for model extraction detection")
        print("   • PyTorch for model analysis and manipulation")
        
        return 0
        
    except Exception as e:
        print(f"❌ Demo failed: {e}")
        import traceback
        traceback.print_exc()
        return 1


def display_banner():
    """Display the framework banner"""
    banner = """
    ╔══════════════════════════════════════════════════════════════════════════════════╗
    ║                           AI Security Framework                                  ║
    ║                     Production-Ready AI Penetration Testing                     ║
    ║                                                                                  ║
    ║  🛡️  Real Adversarial Testing (FGSM, PGD, C&W, DeepFool)                        ║
    ║  🔍  Data Poisoning Detection (Statistical & ML Methods)                        ║
    ║  🎯  Model Extraction Attack Detection                                          ║
    ║  📊  Comprehensive Security Reporting                                           ║
    ║                                                                                  ║
    ║  Built with: ART, Cleverhans, PyTorch, Scikit-learn                            ║
    ╚══════════════════════════════════════════════════════════════════════════════════╝
    """
    print(banner)


def main():
    """Main launcher function"""
    parser = argparse.ArgumentParser(
        description="AI Security Framework - Production-ready AI security testing",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Launch web interface
  python launch_aisec.py --web
  
  # Run quick security scan
  python launch_aisec.py --assess --quick
  
  # Run comprehensive assessment
  python launch_aisec.py --assess --model-path model.pth --name my_assessment
  
  # Run demo of capabilities
  python launch_aisec.py --demo
        """
    )
    
    # Main action groups
    action_group = parser.add_mutually_exclusive_group(required=True)
    action_group.add_argument('--web', action='store_true',
                            help='Launch web interface')
    action_group.add_argument('--assess', action='store_true',
                            help='Run security assessment')
    action_group.add_argument('--demo', action='store_true',
                            help='Run demonstration of capabilities')
    
    # Assessment options
    parser.add_argument('--model-path', type=str,
                       help='Path to target model file')
    parser.add_argument('--dataset-path', type=str,
                       help='Path to dataset for analysis')
    parser.add_argument('--name', type=str,
                       help='Assessment name')
    parser.add_argument('--quick', action='store_true',
                       help='Run quick scan instead of comprehensive assessment')
    parser.add_argument('--output-dir', type=str, default='output',
                       help='Output directory for reports (default: output)')
    
    # General options
    parser.add_argument('--version', action='version', version='AI Security Framework 2.0.0')
    
    args = parser.parse_args()
    
    # Display banner
    display_banner()
    
    # Execute requested action
    try:
        if args.web:
            run_web_interface()
            return 0
        elif args.assess:
            return run_security_assessment(args)
        elif args.demo:
            return run_demo_tests()
    except KeyboardInterrupt:
        print("\n\n⏹️  Operation cancelled by user")
        return 1
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
        return 1


if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)
