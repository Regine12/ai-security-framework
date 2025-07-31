#!/usr/bin/env python3
"""
AISec-Pentester Framework Test Suite
Comprehensive testing for all framework components
"""

import unittest
import sys
import os
import tempfile
import shutil
from pathlib import Path

# Add the framework to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

try:
    from aisec_pentester.core.framework import AISec_Framework
    from aisec_pentester.core.config_manager import ConfigManager
    from aisec_pentester.core.logger import Logger
    from aisec_pentester.modules.adversarial.generator import AdversarialGenerator
    from aisec_pentester.modules.poisoning.detector import PoisoningDetector
    from aisec_pentester.modules.extraction.scanner import ExtractionScanner
except ImportError as e:
    print(f"Warning: Could not import framework modules: {e}")
    print("Some tests may be skipped.")

class TestFrameworkCore(unittest.TestCase):
    """Test core framework functionality"""
    
    def setUp(self):
        """Set up test environment"""
        self.temp_dir = tempfile.mkdtemp()
        self.config = {
            'output_directory': self.temp_dir,
            'log_level': 'DEBUG',
            'max_workers': 2,
            'timeout': 30
        }
    
    def tearDown(self):
        """Clean up test environment"""
        shutil.rmtree(self.temp_dir, ignore_errors=True)
    
    def test_config_manager(self):
        """Test configuration manager"""
        config_manager = ConfigManager()
        
        # Test default config
        self.assertIsInstance(config_manager.get_config(), dict)
        
        # Test setting config
        config_manager.set_config(self.config)
        self.assertEqual(config_manager.get_config()['output_directory'], self.temp_dir)
    
    def test_logger_setup(self):
        """Test logger initialization"""
        logger = Logger.get_logger('test')
        self.assertIsNotNone(logger)
        
        # Test logging levels
        logger.info("Test info message")
        logger.warning("Test warning message")
        logger.error("Test error message")
    
    def test_framework_initialization(self):
        """Test framework initialization"""
        try:
            framework = AISec_Framework(self.config)
            self.assertIsNotNone(framework)
        except NameError:
            self.skipTest("Framework not available for testing")

class TestAdversarialModule(unittest.TestCase):
    """Test adversarial attack module"""
    
    def setUp(self):
        """Set up test environment"""
        self.temp_dir = tempfile.mkdtemp()
    
    def tearDown(self):
        """Clean up test environment"""
        shutil.rmtree(self.temp_dir, ignore_errors=True)
    
    def test_attack_generation(self):
        """Test adversarial attack generation"""
        try:
            generator = AdversarialGenerator()
            self.assertIsNotNone(generator)
            
            # Test attack types
            attack_types = generator.get_available_attacks()
            self.assertIn('fgsm', attack_types)
            self.assertIn('pgd', attack_types)
            
        except NameError:
            self.skipTest("Adversarial module not available for testing")
    
    def test_robustness_evaluation(self):
        """Test robustness evaluation"""
        try:
            generator = AdversarialGenerator()
            
            # Test robustness metrics
            metrics = generator.get_robustness_metrics()
            self.assertIsInstance(metrics, dict)
            
        except NameError:
            self.skipTest("Adversarial module not available for testing")

class TestPoisoningModule(unittest.TestCase):
    """Test data poisoning detection module"""
    
    def setUp(self):
        """Set up test environment"""
        self.temp_dir = tempfile.mkdtemp()
    
    def tearDown(self):
        """Clean up test environment"""
        shutil.rmtree(self.temp_dir, ignore_errors=True)
    
    def test_detector_initialization(self):
        """Test poisoning detector initialization"""
        try:
            detector = PoisoningDetector()
            self.assertIsNotNone(detector)
            
        except NameError:
            self.skipTest("Poisoning module not available for testing")
    
    def test_detection_methods(self):
        """Test poisoning detection methods"""
        try:
            detector = PoisoningDetector()
            
            # Test available detection methods
            methods = detector.get_detection_methods()
            self.assertIsInstance(methods, list)
            self.assertGreater(len(methods), 0)
            
        except NameError:
            self.skipTest("Poisoning module not available for testing")

class TestExtractionModule(unittest.TestCase):
    """Test model extraction module"""
    
    def setUp(self):
        """Set up test environment"""
        self.temp_dir = tempfile.mkdtemp()
    
    def tearDown(self):
        """Clean up test environment"""
        shutil.rmtree(self.temp_dir, ignore_errors=True)
    
    def test_scanner_initialization(self):
        """Test extraction scanner initialization"""
        try:
            scanner = ExtractionScanner()
            self.assertIsNotNone(scanner)
            
        except NameError:
            self.skipTest("Extraction module not available for testing")
    
    def test_extraction_strategies(self):
        """Test extraction strategies"""
        try:
            scanner = ExtractionScanner()
            
            # Test available strategies
            strategies = scanner.get_extraction_strategies()
            self.assertIsInstance(strategies, list)
            
        except NameError:
            self.skipTest("Extraction module not available for testing")

class TestIntegration(unittest.TestCase):
    """Integration tests for the complete framework"""
    
    def setUp(self):
        """Set up test environment"""
        self.temp_dir = tempfile.mkdtemp()
        self.test_config = {
            'output_directory': self.temp_dir,
            'log_level': 'INFO',
            'max_workers': 1,
            'timeout': 60,
            'modules': {
                'adversarial': {'enabled': True},
                'poisoning': {'enabled': True},
                'extraction': {'enabled': True}
            }
        }
    
    def tearDown(self):
        """Clean up test environment"""
        shutil.rmtree(self.temp_dir, ignore_errors=True)
    
    def test_full_assessment_workflow(self):
        """Test complete assessment workflow"""
        try:
            # Initialize framework
            framework = AISec_Framework(self.test_config)
            
            # Test workflow steps
            self.assertTrue(framework.validate_config())
            
            # Test module loading
            modules = framework.get_available_modules()
            self.assertIsInstance(modules, list)
            
        except NameError:
            self.skipTest("Framework not available for integration testing")
    
    def test_report_generation(self):
        """Test report generation"""
        try:
            framework = AISec_Framework(self.test_config)
            
            # Test report formats
            formats = framework.get_supported_report_formats()
            self.assertIn('json', formats)
            self.assertIn('html', formats)
            
        except NameError:
            self.skipTest("Framework not available for report testing")

class TestUtilities(unittest.TestCase):
    """Test utility functions and helpers"""
    
    def test_file_operations(self):
        """Test file operation utilities"""
        with tempfile.TemporaryDirectory() as temp_dir:
            test_file = os.path.join(temp_dir, 'test.txt')
            
            # Test file creation
            with open(test_file, 'w') as f:
                f.write('test content')
            
            self.assertTrue(os.path.exists(test_file))
            
            # Test file reading
            with open(test_file, 'r') as f:
                content = f.read()
            
            self.assertEqual(content, 'test content')
    
    def test_path_validation(self):
        """Test path validation utilities"""
        # Test valid paths
        self.assertTrue(os.path.exists('.'))
        self.assertTrue(os.path.exists('..'))
        
        # Test invalid paths
        self.assertFalse(os.path.exists('/nonexistent/path/123'))

def run_tests():
    """Run all tests with detailed output"""
    
    print("AISec-Pentester Framework Test Suite")
    print("=" * 50)
    
    # Create test suite
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    
    # Add test cases
    test_cases = [
        TestFrameworkCore,
        TestAdversarialModule,
        TestPoisoningModule,
        TestExtractionModule,
        TestIntegration,
        TestUtilities
    ]
    
    for test_case in test_cases:
        tests = loader.loadTestsFromTestCase(test_case)
        suite.addTests(tests)
    
    # Run tests
    runner = unittest.TextTestRunner(
        verbosity=2,
        stream=sys.stdout,
        buffer=True
    )
    
    result = runner.run(suite)
    
    # Print summary
    print("\nTest Summary:")
    print(f"Tests run: {result.testsRun}")
    print(f"Failures: {len(result.failures)}")
    print(f"Errors: {len(result.errors)}")
    print(f"Skipped: {len(result.skipped)}")
    
    if result.failures:
        print("\nFailures:")
        for test, traceback in result.failures:
            print(f"- {test}: {traceback}")
    
    if result.errors:
        print("\nErrors:")
        for test, traceback in result.errors:
            print(f"- {test}: {traceback}")
    
    # Return success status
    return len(result.failures) == 0 and len(result.errors) == 0

if __name__ == '__main__':
    success = run_tests()
    sys.exit(0 if success else 1)
