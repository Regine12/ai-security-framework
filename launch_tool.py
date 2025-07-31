#!/usr/bin/env python3
"""
Legacy AISec Pentester Tool Launcher
Redirects to the new comprehensive launcher
"""

import os
import sys
import subprocess
from pathlib import Path

def main():
    """Main launcher function - redirects to new launcher"""
    print("🚀 Launching AI Security Framework...")
    print("⚠️  This is the legacy launcher. Redirecting to comprehensive launcher...")
    
    # Check if new launcher exists
    new_launcher = Path("launch_aisec.py")
    if new_launcher.exists():
        print("✅ Starting comprehensive AI Security Framework...")
        
        # Forward command line arguments
        args = sys.argv[1:] if len(sys.argv) > 1 else ["--web"]
        
        try:
            # Execute the new launcher
            result = subprocess.run([sys.executable, str(new_launcher)] + args)
            return result.returncode
        except Exception as e:
            print(f"❌ Failed to launch new framework: {e}")
    else:
        print("❌ New launcher not found! Please use launch_aisec.py directly")
        
        # Fallback to simple web interface
        import webbrowser
        index_path = Path("public/index.html")
        if index_path.exists():
            file_url = f"file://{index_path.absolute()}"
            webbrowser.open(file_url)
            print(f"Web interface launched: {file_url}")
        else:
            print("Web interface files not found!")
            return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
