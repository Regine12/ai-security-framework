#!/usr/bin/env python3
"""
AISec-Pentester Tool Launcher
Simple interface to launch the AI Security Testing Framework
"""

import os
import sys
import subprocess

def main():
    print("=" * 60)
    print("AI Security Framework - AISec-Pentester")
    print("Professional AI Penetration Testing & Security Assessment")
    print("=" * 60)
    print()
    
    print("Available Options:")
    print("1. Quick Demo (Individual modules)")
    print("2. Full Assessment Demo")
    print("3. Interactive Mode")
    print("4. Help & Documentation")
    print("5. Exit")
    print()
    
    while True:
        try:
            choice = input("Select option (1-5): ").strip()
            
            if choice == "1":
                print("\nLaunching Quick Demo...")
                subprocess.run([sys.executable, "demo.py", "--quick"], check=True)
                
            elif choice == "2":
                print("\nLaunching Full Assessment Demo...")
                subprocess.run([sys.executable, "demo.py", "--full"], check=True)
                
            elif choice == "3":
                print("\nLaunching Interactive Mode...")
                subprocess.run([sys.executable, "demo.py"], check=True)
                
            elif choice == "4":
                print("\nDisplaying Help...")
                subprocess.run([sys.executable, "demo.py", "--help"], check=True)
                
            elif choice == "5":
                print("Exiting AISec-Pentester. Goodbye!")
                break
                
            else:
                print("Invalid choice. Please select 1-5.")
                
            print("\n" + "-" * 40)
            
        except KeyboardInterrupt:
            print("\n\nExiting AISec-Pentester. Goodbye!")
            break
        except Exception as e:
            print(f"Error: {e}")
            print("Please try again.")

if __name__ == "__main__":
    main()
