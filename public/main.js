
        // Mobile Navigation Toggle
        function toggleMobileNav() {
            console.log('Mobile nav toggle clicked'); // Debug log
            const navLinks = document.getElementById('nav-links');
            const navToggle = document.querySelector('.nav-toggle');
            
            if (navLinks && navToggle) {
                console.log('Elements found, toggling classes'); // Debug log
                navLinks.classList.toggle('active');
                navToggle.classList.toggle('active');
                
                // Force style check
                console.log('Nav links has active class:', navLinks.classList.contains('active'));
            } else {
                console.error('Nav elements not found:', { navLinks, navToggle });
            }
        }

        // Close mobile nav when clicking on a link
        document.addEventListener('DOMContentLoaded', function() {
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    const navLinksContainer = document.getElementById('nav-links');
                    const navToggle = document.querySelector('.nav-toggle');
                    
                    navLinksContainer.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });

            // Close mobile nav when clicking outside
            document.addEventListener('click', function(e) {
                const nav = document.querySelector('.nav');
                const navLinks = document.getElementById('nav-links');
                const navToggle = document.querySelector('.nav-toggle');
                
                if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });

            // Handle window resize
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    const navLinks = document.getElementById('nav-links');
                    const navToggle = document.querySelector('.nav-toggle');
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        });

        // Modal functionality
        function openModal(contentId) {
            const modal = document.getElementById('modal');
            const modalBody = document.getElementById('modal-body');
            
            const content = getModalContent(contentId);
            modalBody.innerHTML = content;
            modal.style.display = 'block';
        }

        function closeModal() {
            document.getElementById('modal').style.display = 'none';
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('modal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        }

        // Modal content generator
        function getModalContent(contentId) {
            const contents = {
                'data-security': `
                    <h2>Data Security</h2>
                    <h3>Key Areas:</h3>
                    <ul>
                        <li><strong>Training Data Protection:</strong> Prevent data poisoning and ensure data integrity</li>
                        <li><strong>Input Validation:</strong> Sanitize and validate all inputs to prevent injection attacks</li>
                        <li><strong>Output Filtering:</strong> Prevent sensitive information leakage</li>
                        <li><strong>Data Governance:</strong> Establish data classification and handling procedures</li>
                    </ul>
                    <h3>Assessment Checklist:</h3>
                    <ul>
                        <li>✓ Data source authentication</li>
                        <li>✓ Input sanitization mechanisms</li>
                        <li>✓ Output content filtering</li>
                        <li>✓ Data encryption at rest and in transit</li>
                    </ul>
                `,
                'model-security': `
                    <h2>Model Security</h2>
                    <h3>Key Areas:</h3>
                    <ul>
                        <li><strong>Model Extraction Protection:</strong> Prevent unauthorized model replication</li>
                        <li><strong>Adversarial Robustness:</strong> Defend against adversarial examples</li>
                        <li><strong>Model Inversion Prevention:</strong> Protect against training data reconstruction</li>
                        <li><strong>Intellectual Property Protection:</strong> Secure model architecture and weights</li>
                    </ul>
                    <h3>Assessment Checklist:</h3>
                    <ul>
                        <li>✓ Model access controls</li>
                        <li>✓ Adversarial example detection</li>
                        <li>✓ Model watermarking</li>
                        <li>✓ Rate limiting and query monitoring</li>
                    </ul>
                `,
                'deployment-security': `
                    <h2>Deployment Security</h2>
                    <h3>Key Areas:</h3>
                    <ul>
                        <li><strong>API Security:</strong> Secure API endpoints and authentication</li>
                        <li><strong>Infrastructure Hardening:</strong> Secure deployment environment</li>
                        <li><strong>Runtime Protection:</strong> Monitor and protect during execution</li>
                        <li><strong>Scalability Security:</strong> Maintain security under load</li>
                    </ul>
                    <h3>Assessment Checklist:</h3>
                    <ul>
                        <li>✓ API authentication and authorization</li>
                        <li>✓ Container security configuration</li>
                        <li>✓ Network segmentation</li>
                        <li>✓ Runtime monitoring and alerting</li>
                    </ul>
                `,
                'step-1': `
                    <h2>Step 1: Scope Definition</h2>
                    <h3>Objective:</h3>
                    <p>Define the boundaries and objectives of the AI security assessment</p>
                    <h3>Key Activities:</h3>
                    <ul>
                        <li>Identify AI systems and components in scope</li>
                        <li>Define assessment objectives and success criteria</li>
                        <li>Establish testing boundaries and constraints</li>
                        <li>Document stakeholder requirements and expectations</li>
                    </ul>
                    <h3>Deliverables:</h3>
                    <ul>
                        <li>Scope definition document</li>
                        <li>Rules of engagement</li>
                        <li>Risk assessment matrix</li>
                    </ul>
                `,
                'step-2': `
                    <h2>Step 2: Asset Discovery</h2>
                    <h3>Objective:</h3>
                    <p>Identify and catalog all AI-related assets and components</p>
                    <h3>Key Activities:</h3>
                    <ul>
                        <li>Inventory AI models and algorithms</li>
                        <li>Map data flows and dependencies</li>
                        <li>Identify APIs and interfaces</li>
                        <li>Document infrastructure components</li>
                    </ul>
                    <h3>Tools & Techniques:</h3>
                    <ul>
                        <li>Network scanning</li>
                        <li>API discovery</li>
                        <li>Model fingerprinting</li>
                        <li>Dependency analysis</li>
                    </ul>
                `,
                'owasp-llm01': `
                    <h2>OWASP LLM01: Prompt Injection</h2>
                    <h3>Description:</h3>
                    <p>Vulnerabilities that allow attackers to manipulate LLM behavior through crafted prompts</p>
                    <h3>Attack Vectors:</h3>
                    <ul>
                        <li>Direct prompt injection</li>
                        <li>Indirect prompt injection via data sources</li>
                        <li>Jailbreaking techniques</li>
                        <li>Role-playing attacks</li>
                    </ul>
                    <h3>Mitigation Strategies:</h3>
                    <ul>
                        <li>Input validation and sanitization</li>
                        <li>Output filtering and content policies</li>
                        <li>Prompt engineering best practices</li>
                        <li>Behavioral monitoring and anomaly detection</li>
                    </ul>
                `,
                'mitre-atlas': `
                    <h2>MITRE ATLAS Integration</h2>
                    <h3>Framework Overview:</h3>
                    <p>MITRE ATLAS provides a comprehensive matrix of adversarial tactics and techniques against AI systems</p>
                    <h3>Key Tactics:</h3>
                    <ul>
                        <li><strong>Reconnaissance:</strong> Gathering information about AI systems</li>
                        <li><strong>Resource Development:</strong> Preparing attack infrastructure</li>
                        <li><strong>Initial Access:</strong> Gaining entry to AI systems</li>
                        <li><strong>Execution:</strong> Running malicious code or commands</li>
                        <li><strong>Persistence:</strong> Maintaining access to compromised systems</li>
                    </ul>
                    <h3>Assessment Integration:</h3>
                    <ul>
                        <li>Map vulnerabilities to ATLAS techniques</li>
                        <li>Prioritize testing based on threat landscape</li>
                        <li>Develop countermeasures for identified tactics</li>
                    </ul>
                `,
                'supply-chain': `
                    <h2>Supply Chain Security</h2>
                    <h3>Key Areas:</h3>
                    <ul>
                        <li><strong>Model Repository Security:</strong> Validate models from HuggingFace, GitHub, etc.</li>
                        <li><strong>Dependency Analysis:</strong> Audit third-party libraries and frameworks</li>
                        <li><strong>Pickle File Scanning:</strong> Detect malicious serialized objects</li>
                        <li><strong>Provenance Tracking:</strong> Maintain model and data lineage</li>
                    </ul>
                    <h3>Assessment Checklist:</h3>
                    <ul>
                        <li>✓ Model signature verification</li>
                        <li>✓ Dependency vulnerability scanning</li>
                        <li>✓ Pickle file static analysis</li>
                        <li>✓ Provenance documentation review</li>
                    </ul>
                `,
                'governance': `
                    <h2>AI Governance</h2>
                    <h3>Key Areas:</h3>
                    <ul>
                        <li><strong>Policy Framework:</strong> Establish AI security policies and procedures</li>
                        <li><strong>Compliance Mapping:</strong> Align with regulatory requirements</li>
                        <li><strong>Risk Management:</strong> Implement AI-specific risk assessment</li>
                        <li><strong>Ethics Integration:</strong> Ensure responsible AI development</li>
                    </ul>
                    <h3>Assessment Checklist:</h3>
                    <ul>
                        <li>✓ AI security policy documentation</li>
                        <li>✓ Compliance framework mapping</li>
                        <li>✓ Risk register and mitigation plans</li>
                        <li>✓ Ethics review process</li>
                    </ul>
                `,
                'incident-response': `
                    <h2>Incident Response</h2>
                    <h3>Key Areas:</h3>
                    <ul>
                        <li><strong>AI-Specific Incidents:</strong> Model poisoning, adversarial attacks</li>
                        <li><strong>Detection Capabilities:</strong> Anomaly detection and behavioral monitoring</li>
                        <li><strong>Response Procedures:</strong> Incident classification and escalation</li>
                        <li><strong>Recovery Planning:</strong> Model rollback and retraining procedures</li>
                    </ul>
                    <h3>Assessment Checklist:</h3>
                    <ul>
                        <li>✓ AI incident playbooks</li>
                        <li>✓ Detection and alerting systems</li>
                        <li>✓ Response team training</li>
                        <li>✓ Recovery and continuity plans</li>
                    </ul>
                `,
                'data-attacks': `
                    <h2>Data Layer Attacks</h2>
                    <h3>Attack Vectors:</h3>
                    <ul>
                        <li><strong>Data Poisoning:</strong> Corrupting training datasets</li>
                        <li><strong>Input Manipulation:</strong> Crafting malicious inputs</li>
                        <li><strong>Data Extraction:</strong> Stealing sensitive training data</li>
                        <li><strong>Privacy Attacks:</strong> Membership inference attacks</li>
                    </ul>
                    <h3>Common Techniques:</h3>
                    <ul>
                        <li>Label flipping in supervised learning</li>
                        <li>Backdoor insertion in datasets</li>
                        <li>Adversarial example generation</li>
                        <li>Model inversion attacks</li>
                    </ul>
                    <h3>Detection Methods:</h3>
                    <ul>
                        <li>Statistical anomaly detection</li>
                        <li>Data quality metrics</li>
                        <li>Behavioral pattern analysis</li>
                        <li>Differential privacy techniques</li>
                    </ul>
                `,
                'model-attacks': `
                    <h2>Model Layer Attacks</h2>
                    <h3>Attack Vectors:</h3>
                    <ul>
                        <li><strong>Model Extraction:</strong> Stealing model architecture and weights</li>
                        <li><strong>Adversarial Examples:</strong> Crafting inputs to fool models</li>
                        <li><strong>Model Inversion:</strong> Reconstructing training data</li>
                        <li><strong>Backdoor Attacks:</strong> Inserting hidden triggers</li>
                    </ul>
                    <h3>Common Techniques:</h3>
                    <ul>
                        <li>Query-based model extraction</li>
                        <li>FGSM and PGD adversarial attacks</li>
                        <li>GAN-based model inversion</li>
                        <li>Trojan neural networks</li>
                    </ul>
                    <h3>Defense Strategies:</h3>
                    <ul>
                        <li>Model watermarking and fingerprinting</li>
                        <li>Adversarial training and robustness</li>
                        <li>Differential privacy implementation</li>
                        <li>Anomaly detection in model behavior</li>
                    </ul>
                `,
                'deployment-attacks': `
                    <h2>Deployment Layer Attacks</h2>
                    <h3>Attack Vectors:</h3>
                    <ul>
                        <li><strong>API Vulnerabilities:</strong> Exploiting service endpoints</li>
                        <li><strong>Infrastructure Attacks:</strong> Compromising deployment environment</li>
                        <li><strong>Side-Channel Attacks:</strong> Exploiting implementation details</li>
                        <li><strong>Supply Chain Attacks:</strong> Compromising dependencies</li>
                    </ul>
                    <h3>Common Techniques:</h3>
                    <ul>
                        <li>API authentication bypass</li>
                        <li>Container escape attacks</li>
                        <li>Timing and power analysis</li>
                        <li>Malicious package injection</li>
                    </ul>
                    <h3>Protection Measures:</h3>
                    <ul>
                        <li>API security best practices</li>
                        <li>Container security hardening</li>
                        <li>Network segmentation</li>
                        <li>Runtime application self-protection</li>
                    </ul>
                `,
                'preventive-controls': `
                    <h2>Preventive Controls</h2>
                    <h3>Access Controls:</h3>
                    <ul>
                        <li>Multi-factor authentication for AI systems</li>
                        <li>Role-based access control (RBAC)</li>
                        <li>API key management and rotation</li>
                        <li>Network access restrictions</li>
                    </ul>
                    <h3>Input Validation:</h3>
                    <ul>
                        <li>Schema validation for data inputs</li>
                        <li>Content filtering and sanitization</li>
                        <li>Rate limiting and throttling</li>
                        <li>Input format verification</li>
                    </ul>
                    <h3>Secure Development:</h3>
                    <ul>
                        <li>Secure coding practices</li>
                        <li>Code review and static analysis</li>
                        <li>Dependency vulnerability scanning</li>
                        <li>Container security scanning</li>
                    </ul>
                `,
                'detective-controls': `
                    <h2>Detective Controls</h2>
                    <h3>Monitoring Systems:</h3>
                    <ul>
                        <li>Model performance monitoring</li>
                        <li>Data drift detection</li>
                        <li>Behavioral anomaly detection</li>
                        <li>API usage monitoring</li>
                    </ul>
                    <h3>Logging & Auditing:</h3>
                    <ul>
                        <li>Comprehensive audit trails</li>
                        <li>Model prediction logging</li>
                        <li>Access logging and analysis</li>
                        <li>Security event correlation</li>
                    </ul>
                    <h3>Threat Detection:</h3>
                    <ul>
                        <li>Adversarial input detection</li>
                        <li>Model extraction attempt detection</li>
                        <li>Unusual query pattern analysis</li>
                        <li>Performance degradation alerts</li>
                    </ul>
                `,
                'corrective-controls': `
                    <h2>Corrective Controls</h2>
                    <h3>Incident Response:</h3>
                    <ul>
                        <li>Automated incident detection and alerting</li>
                        <li>Incident classification and prioritization</li>
                        <li>Response team activation procedures</li>
                        <li>Communication and escalation protocols</li>
                    </ul>
                    <h3>Recovery Procedures:</h3>
                    <ul>
                        <li>Model rollback mechanisms</li>
                        <li>Data restoration procedures</li>
                        <li>System isolation and containment</li>
                        <li>Service continuity planning</li>
                    </ul>
                    <h3>Remediation Actions:</h3>
                    <ul>
                        <li>Vulnerability patching procedures</li>
                        <li>Model retraining processes</li>
                        <li>Security control updates</li>
                        <li>Lessons learned integration</li>
                    </ul>
                `,
                'owasp-llm06': `
                    <h2>OWASP LLM06: Sensitive Information Disclosure</h2>
                    <h3>Description:</h3>
                    <p>Vulnerabilities that allow LLMs to reveal sensitive information from training data or system internals</p>
                    <h3>Attack Vectors:</h3>
                    <ul>
                        <li>Training data extraction attacks</li>
                        <li>System prompt disclosure</li>
                        <li>Configuration information leakage</li>
                        <li>Personal data exposure</li>
                    </ul>
                    <h3>Mitigation Strategies:</h3>
                    <ul>
                        <li>Output filtering and data loss prevention</li>
                        <li>Differential privacy techniques</li>
                        <li>Training data sanitization</li>
                        <li>Content classification and redaction</li>
                    </ul>
                    <h3>Testing Approach:</h3>
                    <ul>
                        <li>Prompt engineering for data extraction</li>
                        <li>Membership inference attacks</li>
                        <li>Model inversion techniques</li>
                        <li>System information gathering</li>
                    </ul>
                `,
                'step-3': `
                    <h2>Step 3: Threat Modeling</h2>
                    <h3>Objective:</h3>
                    <p>Identify potential threats and attack vectors against AI systems</p>
                    <h3>Key Activities:</h3>
                    <ul>
                        <li>Map attack surfaces and entry points</li>
                        <li>Identify threat actors and motivations</li>
                        <li>Analyze attack vectors and techniques</li>
                        <li>Assess potential impact and likelihood</li>
                    </ul>
                    <h3>Frameworks Used:</h3>
                    <ul>
                        <li>STRIDE methodology for AI systems</li>
                        <li>MITRE ATLAS threat landscape</li>
                        <li>OWASP AI Security Top 10</li>
                        <li>Custom AI threat taxonomy</li>
                    </ul>
                    <h3>Deliverables:</h3>
                    <ul>
                        <li>Threat model documentation</li>
                        <li>Attack tree diagrams</li>
                        <li>Risk assessment matrix</li>
                        <li>Prioritized threat list</li>
                    </ul>
                `,
                'step-4': `
                    <h2>Step 4: Vulnerability Assessment</h2>
                    <h3>Objective:</h3>
                    <p>Identify and catalog security vulnerabilities in AI systems</p>
                    <h3>Assessment Categories:</h3>
                    <ul>
                        <li><strong>Data Vulnerabilities:</strong> Training data integrity, input validation</li>
                        <li><strong>Model Vulnerabilities:</strong> Architecture weaknesses, extraction risks</li>
                        <li><strong>Infrastructure Vulnerabilities:</strong> Deployment environment security</li>
                        <li><strong>API Vulnerabilities:</strong> Interface security and authentication</li>
                    </ul>
                    <h3>Testing Methods:</h3>
                    <ul>
                        <li>Automated vulnerability scanning</li>
                        <li>Static code analysis</li>
                        <li>Dynamic security testing</li>
                        <li>Configuration review</li>
                    </ul>
                    <h3>Tools & Techniques:</h3>
                    <ul>
                        <li>Custom AI security scanners</li>
                        <li>Container security tools</li>
                        <li>API security testing tools</li>
                        <li>Model analysis frameworks</li>
                    </ul>
                `,
                'step-5': `
                    <h2>Step 5: Penetration Testing</h2>
                    <h3>Objective:</h3>
                    <p>Actively exploit identified vulnerabilities to assess real-world risk</p>
                    <h3>Testing Phases:</h3>
                    <ul>
                        <li><strong>Reconnaissance:</strong> Information gathering and system profiling</li>
                        <li><strong>Enumeration:</strong> Service discovery and vulnerability mapping</li>
                        <li><strong>Exploitation:</strong> Active attack execution</li>
                        <li><strong>Post-Exploitation:</strong> Privilege escalation and persistence</li>
                    </ul>
                    <h3>AI-Specific Tests:</h3>
                    <ul>
                        <li>Prompt injection attacks</li>
                        <li>Model extraction attempts</li>
                        <li>Adversarial example generation</li>
                        <li>Data poisoning simulation</li>
                    </ul>
                    <h3>Methodology:</h3>
                    <ul>
                        <li>OWASP AI Security Testing Guide</li>
                        <li>MITRE ATLAS technique simulation</li>
                        <li>Custom AI attack scenarios</li>
                        <li>Red team exercises</li>
                    </ul>
                `,
                'step-6': `
                    <h2>Step 6: Reporting & Remediation</h2>
                    <h3>Objective:</h3>
                    <p>Document findings and provide actionable remediation guidance</p>
                    <h3>Report Structure:</h3>
                    <ul>
                        <li><strong>Executive Summary:</strong> High-level findings and risk assessment</li>
                        <li><strong>Technical Findings:</strong> Detailed vulnerability descriptions</li>
                        <li><strong>Risk Analysis:</strong> Impact and likelihood assessment</li>
                        <li><strong>Remediation Plan:</strong> Prioritized mitigation recommendations</li>
                    </ul>
                    <h3>Deliverables:</h3>
                    <ul>
                        <li>Comprehensive security assessment report</li>
                        <li>Risk register and mitigation roadmap</li>
                        <li>Technical remediation guides</li>
                        <li>Compliance gap analysis</li>
                    </ul>
                    <h3>Follow-up Activities:</h3>
                    <ul>
                        <li>Remediation verification testing</li>
                        <li>Security posture monitoring</li>
                        <li>Periodic reassessment scheduling</li>
                        <li>Continuous improvement recommendations</li>
                    </ul>
                `,
                'methodology-guide': document.getElementById('methodology-guide-content')?.innerHTML || `
                    <h2><i class="fa-solid fa-file-lines"></i> AI Security Methodology Guide</h2>
                    <div style="margin: 30px 0;">
                        <h3>📋 What's Included:</h3>
                        <ul style="text-align: left; margin: 20px 0;">
                            <li><strong>Complete Assessment Framework:</strong> Step-by-step methodology for AI security evaluation</li>
                            <li><strong>Threat Modeling Templates:</strong> Pre-built templates for AI-specific threat scenarios</li>
                            <li><strong>Security Checklists:</strong> Comprehensive checklists for each phase of assessment</li>
                            <li><strong>Risk Assessment Matrix:</strong> Standardized risk scoring and prioritization framework</li>
                            <li><strong>Testing Procedures:</strong> Detailed procedures for AI model security testing</li>
                            <li><strong>Reporting Templates:</strong> Professional templates for security assessment reports</li>
                        </ul>
                        
                        <h3>🎯 Perfect For:</h3>
                        <ul style="text-align: left; margin: 20px 0;">
                            <li>Security professionals conducting AI assessments</li>
                            <li>AI/ML engineers implementing security best practices</li>
                            <li>Compliance teams ensuring regulatory adherence</li>
                            <li>Organizations building secure AI systems</li>
                        </ul>
                        
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                            <p><strong>💡 Pro Tip:</strong> This comprehensive guide provides everything you need to establish a robust AI security assessment program in your organization.</p>
                        </div>
                        
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="AI Security Methodology Document.pdf" download="AI_Security_Methodology_Guide.pdf" class="cta-button" style="margin: 10px;">
                                <i class="fa-solid fa-download"></i> Download PDF Guide
                            </a>
                        </div>
                    </div>
                `,
                'testing-tools': document.getElementById('testing-tools-content')?.innerHTML || `
                    <h2>Testing Tools</h2>
                    <p>Full content coming soon.</p>
                `,
                'playbook-example': document.getElementById('playbook-example-content')?.innerHTML || `
                    <h2><i class="fa-solid fa-clipboard-list"></i> AI Security Assessment Playbook Example</h2>
                    <div style="margin: 30px 0;">
                        <h3>🔍 Sample Assessment Scenario: E-commerce Recommendation Engine</h3>
                        
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                            <h4>Target System:</h4>
                            <p>Machine learning-based product recommendation system processing customer behavior data</p>
                        </div>
                        
                        <h4>Phase 1: Threat Modeling</h4>
                        <ul style="text-align: left; margin: 15px 0;">
                            <li><strong>Data Poisoning:</strong> Malicious training data injection to bias recommendations</li>
                            <li><strong>Model Inversion:</strong> Extracting sensitive customer information from model responses</li>
                            <li><strong>Adversarial Examples:</strong> Crafted inputs to manipulate recommendation outputs</li>
                            <li><strong>Privacy Leakage:</strong> Membership inference attacks on training data</li>
                        </ul>
                        
                        <h4>Phase 2: Security Controls Assessment</h4>
                        <ul style="text-align: left; margin: 15px 0;">
                            <li>✓ Input validation and sanitization mechanisms</li>
                            <li>✓ Model access controls and API rate limiting</li>
                            <li>✓ Data anonymization and differential privacy</li>
                            <li>✓ Adversarial detection and response procedures</li>
                        </ul>
                        
                        <h4>Phase 3: Testing & Validation</h4>
                        <ul style="text-align: left; margin: 15px 0;">
                            <li>Robustness testing with adversarial examples</li>
                            <li>Privacy analysis using membership inference tests</li>
                            <li>Bias detection across demographic groups</li>
                            <li>Performance impact assessment of security controls</li>
                        </ul>
                        
                        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <strong>📊 Expected Outcome:</strong> Comprehensive security posture assessment with actionable remediation recommendations
                        </div>
                    </div>
                `
            };
            
            return contents[contentId] || '<h2>Content not found</h2>';
        }

        document.querySelectorAll('.resource-card').forEach(card => {
    card.addEventListener('click', function() {
        openModal(this.getAttribute('data-content'));
    });
});

// --- Checklist Logic ---
const checklistPhases = [
    {
        title: 'Planning & Preparation',
        items: [
            'Scope defined and documented',
            'Stakeholder approvals obtained',
            'Test environment provisioned',
            'Tools installed and configured'
        ]
    },
    {
        title: 'Threat Modeling',
        items: [
            'Assets & data flows mapped',
            'AI-specific threat scenarios identified',
            'Risk ranking completed',
            'Prioritized threat matrix documented'
        ]
    },
    {
        title: 'Baseline Security Checks',
        items: [
            'Network & OS scans passed',
            'API auth and access control verified',
            'Dependency vulnerabilities reviewed',
            'Secure configs enforced'
        ]
    },
    {
        title: 'AI Adversarial Testing',
        items: [
            'Data poisoning tests executed',
            'Evasion/adversarial examples tested',
            'Prompt injection scenarios executed',
            'DoS resilience evaluated'
        ]
    },
    {
        title: 'Output & Integration Checks',
        items: [
            'Output sanitization confirmed',
            'Content safety filters tested',
            'Plugin access controls validated',
            'Downstream usage reviewed'
        ]
    },
    {
        title: 'Privacy & Logging',
        items: [
            'Membership inference tests done',
            'Logs cover AI events',
            'Anomaly alerts configured',
            'Incident response plan exists'
        ]
    },
    {
        title: 'Analysis & Reporting',
        items: [
            'Findings documented with severity',
            'Recommendations assigned',
            'Executive summary drafted',
            'Checklist closure verified'
        ]
    }
];

function initializeChecklist() {
    const container = document.getElementById('checklist-phases');
    if (!container) return;
    container.innerHTML = '';

    checklistPhases.forEach((phase, phaseIndex) => {
        const phaseElement = document.createElement('div');
        phaseElement.className = 'checklist-phase';
        
        const completed = getCompletedItems(phaseIndex);
        const progress = Math.round((completed / phase.items.length) * 100);
        
        phaseElement.innerHTML = `
            <div class="phase-header" onclick="togglePhase(${phaseIndex})">
                <div class="phase-title">
                    <i class="fa-solid fa-chevron-right" id="chevron-${phaseIndex}"></i>
                    ${phase.title}
                </div>
                <div class="phase-progress">${completed}/${phase.items.length} (${progress}%)</div>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
            <div class="checklist-items" id="items-${phaseIndex}">
                ${phase.items.map((item, itemIndex) => {
                    const key = `${phaseIndex}-${itemIndex}`;
                    const isChecked = localStorage.getItem(`checklist-${key}`) === 'true';
                    return `
                        <div class="checklist-item ${isChecked ? 'completed' : ''}">
                            <input type="checkbox" id="item-${key}" ${isChecked ? 'checked' : ''} 
                                   onchange="toggleItem('${key}')">
                            <label for="item-${key}">${item}</label>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        
        container.appendChild(phaseElement);
    });
}

function getCompletedItems(phaseIndex) {
    let completed = 0;
    checklistPhases[phaseIndex].items.forEach((_, itemIndex) => {
        const key = `${phaseIndex}-${itemIndex}`;
        if (localStorage.getItem(`checklist-${key}`) === 'true') {
            completed++;
        }
    });
    return completed;
}

function togglePhase(phaseIndex) {
    const itemsElement = document.getElementById(`items-${phaseIndex}`);
    const chevron = document.getElementById(`chevron-${phaseIndex}`);
    
    if (itemsElement.classList.contains('expanded')) {
        itemsElement.classList.remove('expanded');
        chevron.style.transform = 'rotate(0deg)';
    } else {
        itemsElement.classList.add('expanded');
        chevron.style.transform = 'rotate(90deg)';
    }
}

function toggleItem(key) {
    const checkbox = document.getElementById(`item-${key}`);
    const item = checkbox.closest('.checklist-item');
    
    if (checkbox.checked) {
        localStorage.setItem(`checklist-${key}`, 'true');
        item.classList.add('completed');
    } else {
        localStorage.removeItem(`checklist-${key}`);
        item.classList.remove('completed');
    }
    initializeChecklist();
}

function resetChecklist() {
    if (confirm('Are you sure you want to reset all progress?')) {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('checklist-')) {
                localStorage.removeItem(key);
            }
        });
        initializeChecklist();
    }
}

function exportChecklist() {
    const progress = {};
    checklistPhases.forEach((phase, phaseIndex) => {
        progress[phase.title] = {
            completed: getCompletedItems(phaseIndex),
            total: phase.items.length,
            items: phase.items.map((item, itemIndex) => ({
                name: item,
                completed: localStorage.getItem(`checklist-${phaseIndex}-${itemIndex}`) === 'true'
            }))
        };
    });
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-security-checklist-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// --- Risk Matrix Logic ---
function setRiskView(view) {
    document.querySelectorAll('.risk-control-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('risk-matrix-view').style.display = view === 'matrix' ? 'block' : 'none';
    document.getElementById('risk-calculator-view').style.display = view === 'calculator' ? 'block' : 'none';
    document.getElementById('risk-scenarios-view').style.display = view === 'scenarios' ? 'block' : 'none';
}

function calculateRisk() {
    const threatType = document.getElementById('threat-type').value;
    const assetCriticality = parseInt(document.getElementById('asset-criticality').value);
    const likelihood = parseInt(document.getElementById('likelihood-score').value);
    const impact = parseInt(document.getElementById('impact-score').value);
    
    if (!threatType || !assetCriticality || !likelihood || !impact) {
        document.getElementById('risk-result').style.display = 'none';
        return;
    }
    
    const baseScore = likelihood * impact;
    const adjustedScore = Math.min(25, baseScore * (assetCriticality / 3));
    
    let riskLevel, riskColor;
    if (adjustedScore >= 20) {
        riskLevel = 'Critical';
        riskColor = '#f44336';
    } else if (adjustedScore >= 15) {
        riskLevel = 'High';
        riskColor = '#ff5722';
    } else if (adjustedScore >= 10) {
        riskLevel = 'Medium';
        riskColor = '#ffc107';
    } else if (adjustedScore >= 5) {
        riskLevel = 'Low';
        riskColor = '#8bc34a';
    } else {
        riskLevel = 'Very Low';
        riskColor = '#4caf50';
    }
    
    document.getElementById('calculated-score').textContent = Math.round(adjustedScore);
    document.getElementById('risk-level').textContent = `${riskLevel} Risk`;
    document.getElementById('risk-result').style.background = `linear-gradient(45deg, ${riskColor}, ${riskColor}aa)`;
    
    // Generate recommendations
    const recommendations = generateRecommendations(threatType, riskLevel, assetCriticality);
    const list = document.getElementById('recommendations-list');
    list.innerHTML = recommendations.map(rec => `<li>${rec}</li>`).join('');
    
    document.getElementById('risk-result').style.display = 'block';
}

function showScenarioDetails(scenarioType) {
    const scenarios = {
        'adversarial': {
            title: 'Adversarial Attacks',
            description: 'Adversarial attacks involve carefully crafted inputs designed to fool AI models into making incorrect predictions or classifications.',
            examples: [
                'Adding imperceptible noise to images to cause misclassification',
                'Modifying text inputs to bypass content filters',
                'Physical adversarial examples (modified street signs, etc.)',
                'Evasion attacks against malware detection systems'
            ],
            mitigations: [
                'Implement adversarial training techniques',
                'Use input validation and sanitization',
                'Deploy ensemble methods for robustness',
                'Monitor for unusual input patterns',
                'Implement confidence thresholds for predictions'
            ]
        },
        'poisoning': {
            title: 'Data Poisoning',
            description: 'Data poisoning attacks involve injecting malicious data into training datasets or inference pipelines to compromise model behavior.',
            examples: [
                'Backdoor attacks through training data manipulation',
                'Label flipping in supervised learning datasets',
                'Feature manipulation in federated learning',
                'Real-time poisoning through user feedback loops'
            ],
            mitigations: [
                'Implement robust data validation pipelines',
                'Use statistical anomaly detection on training data',
                'Deploy differential privacy techniques',
                'Maintain data provenance and audit trails',
                'Implement multi-source data verification'
            ]
        },
        'extraction': {
            title: 'Model Extraction',
            description: 'Model extraction attacks attempt to steal or reverse engineer AI models by analyzing their inputs and outputs.',
            examples: [
                'Query-based model stealing through API access',
                'Membership inference attacks on training data',
                'Model inversion to reconstruct private inputs',
                'Hyperparameter extraction through timing attacks'
            ],
            mitigations: [
                'Implement API rate limiting and monitoring',
                'Add differential privacy to model outputs',
                'Use query complexity analysis',
                'Deploy watermarking techniques for models',
                'Implement access controls and authentication'
            ]
        },
        'prompt': {
            title: 'Prompt Injection',
            description: 'Prompt injection attacks manipulate large language models by crafting inputs that override intended behavior or extract sensitive information.',
            examples: [
                'System prompt bypass through carefully crafted inputs',
                'Jailbreaking to bypass safety restrictions',
                'Data exfiltration through prompt manipulation',
                'Privilege escalation in AI-powered applications'
            ],
            mitigations: [
                'Implement robust input sanitization',
                'Use prompt templates with parameter validation',
                'Deploy content filtering and safety checks',
                'Implement context-aware response validation',
                'Use fine-tuned models with safety alignments'
            ]
        },
        'privacy': {
            title: 'Privacy Leakage',
            description: 'Privacy leakage occurs when AI models unintentionally expose sensitive information from their training data or operational environment.',
            examples: [
                'Training data memorization in large language models',
                'Sensitive attribute inference from model outputs',
                'Location data leakage in recommendation systems',
                'Personal information extraction through model queries'
            ],
            mitigations: [
                'Implement differential privacy mechanisms',
                'Use federated learning approaches',
                'Deploy data anonymization techniques',
                'Implement output sanitization filters',
                'Regular privacy impact assessments'
            ]
        },
        'bias': {
            title: 'Bias Exploitation',
            description: 'Bias exploitation attacks leverage inherent algorithmic biases in AI systems to cause discriminatory or unfair outcomes.',
            examples: [
                'Demographic bias amplification in hiring systems',
                'Racial bias exploitation in facial recognition',
                'Gender bias manipulation in language models',
                'Socioeconomic bias in credit scoring algorithms'
            ],
            mitigations: [
                'Implement fairness-aware machine learning',
                'Use diverse and representative training data',
                'Deploy bias detection and monitoring tools',
                'Implement algorithmic auditing processes',
                'Use debiasing techniques during model training'
            ]
        }
    };

    const scenario = scenarios[scenarioType];
    if (scenario) {
        openModalWithContent(`
            <h2><i class="fa-solid fa-exclamation-triangle"></i> ${scenario.title}</h2>
            <p>${scenario.description}</p>
            
            <h3>Common Attack Examples:</h3>
            <ul>
                ${scenario.examples.map(example => `<li>${example}</li>`).join('')}
            </ul>
            
            <h3>Recommended Mitigations:</h3>
            <ul>
                ${scenario.mitigations.map(mitigation => `<li>${mitigation}</li>`).join('')}
            </ul>
            
            <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #8936de;">
                <strong>💡 Pro Tip:</strong> Implement defense-in-depth strategies combining multiple mitigation techniques for maximum protection.
            </div>
        `);
    }
}

function generateRecommendations(threatType, riskLevel, criticality) {
    const recommendations = [];
    if (riskLevel === 'Critical' || riskLevel === 'High') {
        recommendations.push('Implement immediate mitigation controls');
        recommendations.push('Conduct emergency risk assessment');
        recommendations.push('Activate incident response procedures');
    }
    switch (threatType) {
        case 'adversarial':
            recommendations.push('Deploy adversarial detection systems');
            recommendations.push('Implement input validation and sanitization');
            recommendations.push('Use adversarial training techniques');
            break;
        case 'poisoning':
            recommendations.push('Implement data provenance tracking');
            recommendations.push('Deploy data quality monitoring');
            recommendations.push('Use secure data pipelines');
            break;
        case 'extraction':
            recommendations.push('Implement query rate limiting');
            recommendations.push('Deploy model watermarking');
            recommendations.push('Use differential privacy techniques');
            break;
        case 'prompt-injection':
            recommendations.push('Implement prompt filtering');
            recommendations.push('Use output sanitization');
            recommendations.push('Deploy content safety filters');
            break;
        case 'bias':
            recommendations.push('Conduct bias testing and monitoring');
            recommendations.push('Implement fairness constraints');
            recommendations.push('Use diverse training datasets');
            break;
    }
    if (criticality >= 4) {
        recommendations.push('Implement continuous monitoring');
        recommendations.push('Establish 24/7 security operations');
    }
    return recommendations;
}

function showRiskDetails(likelihood, impact, level) {
    const score = likelihood * impact;
    const content = `
        <h2>Risk Assessment Details</h2>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0;">
            <div class="metric-card">
                <div class="metric-value">${likelihood}</div>
                <div class="metric-label">Likelihood Score</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${impact}</div>
                <div class="metric-label">Impact Score</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${score}</div>
                <div class="metric-label">Risk Score</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${level.charAt(0).toUpperCase() + level.slice(1)}</div>
                <div class="metric-label">Risk Level</div>
            </div>
        </div>
        <h3>Risk Response Strategy:</h3>
        <ul>
            ${getRiskResponseStrategy(level).map(strategy => `<li>${strategy}</li>`).join('')}
        </ul>
    `;
    openModalWithContent(content);
}

function getRiskResponseStrategy(level) {
    const strategies = {
        'critical': [
            'Immediate executive escalation required',
            'Implement emergency controls within 24 hours',
            'Continuous monitoring and assessment',
            'Regular stakeholder communication'
        ],
        'high': [
            'Prioritize for immediate remediation',
            'Implement controls within 1 week',
            'Regular progress monitoring',
            'Management reporting required'
        ],
        'medium': [
            'Schedule remediation within 30 days',
            'Implement standard controls',
            'Periodic monitoring and review',
            'Document mitigation progress'
        ],
        'low': [
            'Address through normal planning cycle',
            'Implement basic controls',
            'Quarterly review sufficient',
            'Standard documentation'
        ],
        'very-low': [
            'Accept risk or apply minimal controls',
            'Annual review sufficient',
            'Basic documentation required',
            'Monitor for changes in risk profile'
        ]
    };
    return strategies[level] || strategies['medium'];
}

// --- Modal Enhancements ---
function openModalWithContent(content) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = content;
    modal.style.display = 'block';
}

// --- Interactive Features ---
function highlightRiskLevel(level) {
    document.querySelectorAll('.risk-cell').forEach(cell => {
        if (cell.classList.contains(level)) {
            cell.style.transform = 'scale(1.1)';
            cell.style.zIndex = '10';
        } else {
            cell.style.opacity = '0.5';
        }
    });
}

function resetRiskHighlight() {
    document.querySelectorAll('.risk-cell').forEach(cell => {
        cell.style.transform = '';
        cell.style.opacity = '';
        cell.style.zIndex = '';
    });
}

function openModal(contentId) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const content = getModalContent(contentId);
    modalBody.innerHTML = content;
    modal.style.display = 'block';
}

// --- DOMContentLoaded Initializers ---
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Mermaid.js
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({ 
            theme: 'dark',
            startOnLoad: true,
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true
            }
        });
    }

    initializeChecklist();
    initializeArchitectureDiagram();    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add floating animation to framework cards
    document.querySelectorAll('.framework-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Risk matrix tooltips
    document.querySelectorAll('.risk-cell').forEach(cell => {
        cell.addEventListener('mouseenter', function() {
            const score = this.getAttribute('data-score');
            this.setAttribute('title', `Risk Score: ${score}`);
        });
    });

    // Add risk legend
    const riskLegend = document.createElement('div');
    riskLegend.innerHTML = `
        <div style="display: flex; justify-content: center; gap: 20px; margin-top: 30px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; cursor: pointer;" 
                 onmouseover="highlightRiskLevel('critical')" 
                 onmouseout="resetRiskHighlight()">
                <div style="width: 20px; height: 20px; background: rgba(244, 67, 54, 0.4); border-radius: 3px; margin-right: 8px;"></div>
                <span>Critical (20-25)</span>
            </div>
            <div style="display: flex; align-items: center; cursor: pointer;" 
                 onmouseover="highlightRiskLevel('high')" 
                 onmouseout="resetRiskHighlight()">
                <div style="width: 20px; height: 20px; background: rgba(255, 87, 34, 0.4); border-radius: 3px; margin-right: 8px;"></div>
                <span>High (15-19)</span>
            </div>
            <div style="display: flex; align-items: center; cursor: pointer;" 
                 onmouseover="highlightRiskLevel('medium')" 
                 onmouseout="resetRiskHighlight()">
                <div style="width: 20px; height: 20px; background: rgba(255, 193, 7, 0.4); border-radius: 3px; margin-right: 8px;"></div>
                <span>Medium (10-14)</span>
            </div>
            <div style="display: flex; align-items: center; cursor: pointer;" 
                 onmouseover="highlightRiskLevel('low')" 
                 onmouseout="resetRiskHighlight()">
                <div style="width: 20px; height: 20px; background: rgba(139, 195, 74, 0.4); border-radius: 3px; margin-right: 8px;"></div>
                <span>Low (5-9)</span>
            </div>
            <div style="display: flex; align-items: center; cursor: pointer;" 
                 onmouseover="highlightRiskLevel('very-low')" 
                 onmouseout="resetRiskHighlight()">
                <div style="width: 20px; height: 20px; background: rgba(76, 175, 80, 0.4); border-radius: 3px; margin-right: 8px;"></div>
                <span>Very Low (1-4)</span>
            </div>
        </div>
        <p style="text-align: center; margin-top: 20px; opacity: 0.8; font-size: 0.9rem;">
            Hover over risk levels to highlight corresponding cells. Click any cell for detailed risk assessment information.
        </p>
    `;
    const riskMatrixContainer = document.querySelector('.risk-matrix-container');
    if (riskMatrixContainer) {
        riskMatrixContainer.appendChild(riskLegend);
    }
});

// --- Keyboard Accessibility for Modal ---
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// --- Demo/Download Functions for Framework Resources ---
function showToolsDemo() {
    openModalWithContent(`
        <h2><i class="fa-solid fa-play"></i> Tools Demo</h2>
        <p>Demo video or interactive walkthrough coming soon.</p>
    `);
}

function downloadTools() {
    window.open('https://github.com/Regine12/AISec-pentester.git', '_blank');
}

// --- Architecture Diagram Interactivity ---
function initializeArchitectureDiagram() {
    console.log('Initializing architecture diagram...'); // Debug log
    // Add click interactions to component boxes
    const componentBoxes = document.querySelectorAll('.component-box');
    console.log('Found component boxes:', componentBoxes.length); // Debug log
    
    componentBoxes.forEach(box => {
        box.addEventListener('click', function() {
            const component = this.getAttribute('data-component');
            console.log('Component clicked:', component); // Debug log
            showComponentDetails(component);
        });

        // Add hover effects for connections
        box.addEventListener('mouseenter', function() {
            highlightConnections(this);
        });

        box.addEventListener('mouseleave', function() {
            resetConnections();
        });
    });

    // Add legend hover effects
    document.querySelectorAll('.legend-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const layer = this.getAttribute('data-legend');
            highlightLayer(layer);
        });

        item.addEventListener('mouseleave', function() {
            resetLayerHighlight();
        });
    });
}

function showComponentDetails(component) {
    console.log('Clicked component:', component); // Debug log
    const componentInfo = {
        'web-app': {
            title: 'Web Application Security',
            content: `
                <h3>Security Considerations:</h3>
                <ul>
                    <li><strong>Authentication:</strong> Multi-factor authentication, session management</li>
                    <li><strong>Input Validation:</strong> XSS prevention, CSRF protection</li>
                    <li><strong>API Security:</strong> Rate limiting, input sanitization</li>
                    <li><strong>Data Protection:</strong> Encryption in transit and at rest</li>
                </ul>
                <h3>Common Vulnerabilities:</h3>
                <ul>
                    <li>Cross-Site Scripting (XSS)</li>
                    <li>SQL Injection via API calls</li>
                    <li>Insecure direct object references</li>
                    <li>Broken authentication and session management</li>
                </ul>
            `
        },
        'mobile-app': {
            title: 'Mobile Application Security',
            content: `
                <h3>Security Considerations:</h3>
                <ul>
                    <li><strong>Device Security:</strong> Biometric authentication, secure storage</li>
                    <li><strong>Network Security:</strong> Certificate pinning, encrypted communications</li>
                    <li><strong>Code Protection:</strong> Obfuscation, anti-tampering measures</li>
                    <li><strong>Data Leakage:</strong> Secure caching, keyboard logging prevention</li>
                </ul>
                <h3>Mobile-Specific Threats:</h3>
                <ul>
                    <li>Reverse engineering and code tampering</li>
                    <li>Insecure data storage on device</li>
                    <li>Man-in-the-middle attacks</li>
                    <li>Malicious app store distributions</li>
                </ul>
            `
        },
        'api-client': {
            title: 'API Client Security',
            content: `
                <h3>Security Considerations:</h3>
                <ul>
                    <li><strong>Authentication:</strong> OAuth 2.0, API key management</li>
                    <li><strong>Authorization:</strong> Role-based access control</li>
                    <li><strong>Data Validation:</strong> Input/output validation</li>
                    <li><strong>Rate Limiting:</strong> Prevent API abuse and DoS</li>
                </ul>
                <h3>API Security Risks:</h3>
                <ul>
                    <li>Broken authentication mechanisms</li>
                    <li>Excessive data exposure</li>
                    <li>Lack of resources and rate limiting</li>
                    <li>Broken function level authorization</li>
                </ul>
            `
        },
        'agent-mgmt': {
            title: 'Agent/Plugin Management Security',
            content: `
                <h3>Security Considerations:</h3>
                <ul>
                    <li><strong>Plugin Validation:</strong> Code signing, sandboxing</li>
                    <li><strong>Permission Management:</strong> Least privilege principle</li>
                    <li><strong>Runtime Monitoring:</strong> Behavioral analysis</li>
                    <li><strong>Update Security:</strong> Secure update mechanisms</li>
                </ul>
                <h3>Plugin Security Risks:</h3>
                <ul>
                    <li>Malicious plugin injection</li>
                    <li>Privilege escalation attacks</li>
                    <li>Cross-plugin data leakage</li>
                    <li>Supply chain compromises</li>
                </ul>
            `
        },
        'input-handling': {
            title: 'Input Handling Security',
            content: `
                <h3>Security Considerations:</h3>
                <ul>
                    <li><strong>Input Sanitization:</strong> Prompt injection prevention</li>
                    <li><strong>Context Validation:</strong> Safe context switching</li>
                    <li><strong>Rate Limiting:</strong> Prevent abuse and DoS attacks</li>
                    <li><strong>Content Filtering:</strong> Malicious content detection</li>
                </ul>
                <h3>Input Security Threats:</h3>
                <ul>
                    <li>Prompt injection attacks</li>
                    <li>Context pollution</li>
                    <li>Adversarial input crafting</li>
                    <li>Input overflow attacks</li>
                </ul>
            `
        },
        'output-handling': {
            title: 'Output Handling Security',
            content: `
                <h3>Security Considerations:</h3>
                <ul>
                    <li><strong>Output Filtering:</strong> Sensitive data redaction</li>
                    <li><strong>Content Moderation:</strong> Harmful content prevention</li>
                    <li><strong>Format Validation:</strong> Safe output formatting</li>
                    <li><strong>Audit Logging:</strong> Output tracking and monitoring</li>
                </ul>
                <h3>Output Security Risks:</h3>
                <ul>
                    <li>Sensitive information leakage</li>
                    <li>Harmful content generation</li>
                    <li>Format string vulnerabilities</li>
                    <li>Output manipulation attacks</li>
                </ul>
            `
        },
        'model-storage': {
            title: 'Model Storage Infrastructure Security',
            content: `
                <h3>Security Considerations:</h3>
                <ul>
                    <li><strong>Access Control:</strong> Model versioning, access logs</li>
                    <li><strong>Encryption:</strong> Model encryption at rest</li>
                    <li><strong>Integrity:</strong> Model checksums, digital signatures</li>
                    <li><strong>Backup Security:</strong> Secure model backups</li>
                </ul>
                <h3>Model Storage Threats:</h3>
                <ul>
                    <li>Model theft and intellectual property loss</li>
                    <li>Model tampering and backdoor insertion</li>
                    <li>Unauthorized model access</li>
                    <li>Model poisoning during storage</li>
                </ul>
            `
        },
        'model-serving': {
            title: 'Model Serving Security',
            content: `
                <h3>Security Considerations:</h3>
                <ul>
                    <li><strong>Runtime Protection:</strong> Sandboxing, resource limits</li>
                    <li><strong>API Security:</strong> Authentication, authorization</li>
                    <li><strong>Load Balancing:</strong> DDoS protection, availability</li>
                    <li><strong>Monitoring:</strong> Performance and security metrics</li>
                </ul>
                <h3>Serving Security Threats:</h3>
                <ul>
                    <li>Model extraction attacks</li>
                    <li>Inference-time adversarial attacks</li>
                    <li>Resource exhaustion attacks</li>
                    <li>Model inversion attacks</li>
                </ul>
            `
        },
        'training': {
            title: 'Training Infrastructure Security',
            content: `
                <h3>Security Considerations:</h3>
                <ul>
                    <li><strong>Data Integrity:</strong> Training data validation</li>
                    <li><strong>Environment Security:</strong> Secure training environments</li>
                    <li><strong>Code Security:</strong> Secure training scripts</li>
                    <li><strong>Resource Management:</strong> Compute resource protection</li>
                </ul>
                <h3>Training Security Threats:</h3>
                <ul>
                    <li>Data poisoning attacks</li>
                    <li>Training infrastructure compromise</li>
                    <li>Model extraction during training</li>
                    <li>Backdoor injection in models</li>
                </ul>
            `
        },
        'frameworks': {
            title: 'ML/AI Frameworks Security',
            content: `
                <h3>Security Considerations:</h3>
                <ul>
                    <li><strong>Dependency Management:</strong> Secure third-party libraries</li>
                    <li><strong>Framework Updates:</strong> Regular security patches</li>
                    <li><strong>Configuration Security:</strong> Secure default settings</li>
                    <li><strong>API Security:</strong> Framework API protection</li>
                </ul>
                <h3>Framework Security Risks:</h3>
                <ul>
                    <li>Supply chain vulnerabilities</li>
                    <li>Framework-specific exploits</li>
                    <li>Insecure default configurations</li>
                    <li>Third-party dependency risks</li>
                </ul>
            `
        },
        'evaluation': {
            title: 'Model Evaluation Security',
            content: `
                <h3>Security Considerations:</h3>
                <ul>
                    <li><strong>Test Data Security:</strong> Secure evaluation datasets</li>
                    <li><strong>Evaluation Metrics:</strong> Security-focused metrics</li>
                    <li><strong>Adversarial Testing:</strong> Red team evaluations</li>
                    <li><strong>Performance Monitoring:</strong> Continuous assessment</li>
                </ul>
                <h3>Evaluation Security Threats:</h3>
                <ul>
                    <li>Evaluation data poisoning</li>
                    <li>Metric manipulation</li>
                    <li>Evaluation bypass attacks</li>
                    <li>False positive/negative injection</li>
                </ul>
            `
        },
        'data-storage': {
            title: 'Data Storage Security',
            content: `
                <h3>Security Considerations:</h3>
                <ul>
                    <li><strong>Encryption:</strong> Data encryption at rest and in transit</li>
                    <li><strong>Access Control:</strong> Role-based data access</li>
                    <li><strong>Data Classification:</strong> Sensitive data identification</li>
                    <li><strong>Backup Security:</strong> Secure data backup and recovery</li>
                </ul>
                <h3>Data Storage Threats:</h3>
                <ul>
                    <li>Unauthorized data access</li>
                    <li>Data breaches and leaks</li>
                    <li>Data corruption attacks</li>
                    <li>Insider threats and misuse</li>
                </ul>
            `
        },
        'training-data': {
            title: 'Training Data Security',
            content: `
                <h3>Security Considerations:</h3>
                <ul>
                    <li><strong>Data Quality:</strong> Training data validation and cleaning</li>
                    <li><strong>Privacy Protection:</strong> PII and sensitive data handling</li>
                    <li><strong>Data Provenance:</strong> Source tracking and lineage</li>
                    <li><strong>Access Control:</strong> Restricted data access policies</li>
                </ul>
                <h3>Training Data Threats:</h3>
                <ul>
                    <li>Data poisoning and contamination</li>
                    <li>Privacy leakage and inference</li>
                    <li>Biased or manipulated datasets</li>
                    <li>Unauthorized data extraction</li>
                </ul>
            `
        },
        'data-processing': {
            title: 'Data Processing Security',
            content: `
                <h3>Security Considerations:</h3>
                <ul>
                    <li><strong>Pipeline Security:</strong> Secure data processing workflows</li>
                    <li><strong>Transformation Security:</strong> Safe data transformations</li>
                    <li><strong>Validation:</strong> Input/output data validation</li>
                    <li><strong>Monitoring:</strong> Processing pipeline monitoring</li>
                </ul>
                <h3>Processing Security Threats:</h3>
                <ul>
                    <li>Pipeline injection attacks</li>
                    <li>Data transformation vulnerabilities</li>
                    <li>Processing logic manipulation</li>
                    <li>Resource exhaustion attacks</li>
                </ul>
            `
        },
        'external-sources': {
            title: 'External Data Sources Security',
            content: `
                <h3>Security Considerations:</h3>
                <ul>
                    <li><strong>Source Validation:</strong> Trusted data source verification</li>
                    <li><strong>Data Integrity:</strong> External data validation</li>
                    <li><strong>Supply Chain:</strong> Third-party data provider security</li>
                    <li><strong>Compliance:</strong> Regulatory compliance for external data</li>
                </ul>
                <h3>External Source Threats:</h3>
                <ul>
                    <li>Malicious data injection</li>
                    <li>Compromised data sources</li>
                    <li>Supply chain attacks</li>
                    <li>Data integrity violations</li>
                </ul>
            `
        }
    };

    const info = componentInfo[component] || {
        title: 'Component Details',
        content: '<p>Security details for this component are being developed.</p>'
    };

    openModalWithContent(`
        <h2><i class="fa-solid fa-shield-alt"></i> ${info.title}</h2>
        ${info.content}
        <div style="margin-top: 30px; text-align: center;">
            <button class="cta-button" onclick="closeModal()">
                <i class="fa-solid fa-times"></i> Close
            </button>
        </div>
    `);
}

function highlightConnections(element) {
    // Add visual connection highlighting logic here
    element.style.boxShadow = '0 0 20px rgba(79, 172, 254, 0.5)';
}

function resetConnections() {
    document.querySelectorAll('.component-box').forEach(box => {
        box.style.boxShadow = '';
    });
}

function highlightLayer(layer) {
    // Dim other layers and highlight the selected one
    document.querySelectorAll('.architecture-layer').forEach(layerElement => {
        if (layerElement.getAttribute('data-layer') === layer) {
            layerElement.style.opacity = '1';
            layerElement.style.transform = 'scale(1.02)';
        } else {
            layerElement.style.opacity = '0.3';
        }
    });
}

function resetLayerHighlight() {
    document.querySelectorAll('.architecture-layer').forEach(layerElement => {
        layerElement.style.opacity = '1';
        layerElement.style.transform = '';
    });
}

// Helper function for opening modals with custom content
// --- Interactive Tour Functionality ---
let currentTourStep = 0;
let completedSteps = [];
let guidedTourActive = false;
let guidedTourTimeouts = [];

function startTourStep(stepNumber) {
    const step = document.querySelector(`[data-step="${stepNumber}"]`);
    const isLocked = step.classList.contains('locked');
    
    if (isLocked && stepNumber > 1 && !completedSteps.includes(stepNumber - 1)) {
        showLockedStepMessage(stepNumber);
        return;
    }
    
    // Remove active class from all steps
    document.querySelectorAll('.tour-step').forEach(s => s.classList.remove('active'));
    
    // Add active class to current step
    step.classList.add('active');
    currentTourStep = stepNumber;
    
    // Open detailed modal for the step
    openModal(`step-${stepNumber}`);
    
    // Simulate step completion after modal interaction
    setTimeout(() => {
        completeStep(stepNumber);
    }, 3000);
}

function completeStep(stepNumber) {
    if (!completedSteps.includes(stepNumber)) {
        completedSteps.push(stepNumber);
        
        const step = document.querySelector(`[data-step="${stepNumber}"]`);
        const status = document.getElementById(`step-${stepNumber}-status`);
        
        step.classList.add('completed');
        step.classList.remove('active');
        status.innerHTML = '<i class="fa-solid fa-check-circle"></i> Completed';
        
        // Unlock next step
        if (stepNumber < 6) {
            const nextStep = document.querySelector(`[data-step="${stepNumber + 1}"]`);
            nextStep.classList.remove('locked');
            const nextStatus = document.getElementById(`step-${stepNumber + 1}-status`);
            nextStatus.innerHTML = '<i class="fa-solid fa-play-circle"></i> Start';
        }
        
        updateProgressBar();
        
        if (completedSteps.length === 6) {
            showCongratulations();
        }
    }
}

function updateProgressBar() {
    const progressFill = document.getElementById('tour-progress');
    const progressPercentage = (completedSteps.length / 6) * 100;
    progressFill.style.width = `${progressPercentage}%`;
}

function resetTour() {
    currentTourStep = 0;
    completedSteps = [];
    guidedTourActive = false;
    
    // Clear any pending timeouts
    guidedTourTimeouts.forEach(timeout => clearTimeout(timeout));
    guidedTourTimeouts = [];
    
    // Reset all steps
    document.querySelectorAll('.tour-step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index > 0) {
            step.classList.add('locked');
        }
        
        const stepNumber = index + 1;
        const status = document.getElementById(`step-${stepNumber}-status`);
        if (stepNumber === 1) {
            status.innerHTML = '<i class="fa-solid fa-play-circle"></i> Start';
        } else {
            status.innerHTML = '<i class="fa-solid fa-lock"></i> Locked';
        }
    });
    
    updateProgressBar();
    updateGuidedTourButton();
}

function startGuidedTour() {
    resetTour();
    guidedTourActive = true;
    updateGuidedTourButton();
    
    startTourStep(1);
    
    // Auto-progress through steps with delays
    guidedTourTimeouts.push(setTimeout(() => {
        if (guidedTourActive) startTourStep(2);
    }, 5000));
    guidedTourTimeouts.push(setTimeout(() => {
        if (guidedTourActive) startTourStep(3);
    }, 10000));
    guidedTourTimeouts.push(setTimeout(() => {
        if (guidedTourActive) startTourStep(4);
    }, 15000));
    guidedTourTimeouts.push(setTimeout(() => {
        if (guidedTourActive) startTourStep(5);
    }, 20000));
    guidedTourTimeouts.push(setTimeout(() => {
        if (guidedTourActive) startTourStep(6);
        guidedTourActive = false;
        updateGuidedTourButton();
    }, 25000));
}

function pauseGuidedTour() {
    guidedTourActive = false;
    // Clear all pending timeouts
    guidedTourTimeouts.forEach(timeout => clearTimeout(timeout));
    guidedTourTimeouts = [];
    updateGuidedTourButton();
}

function resumeGuidedTour() {
    guidedTourActive = true;
    updateGuidedTourButton();
    // Resume from current step or next step
    const nextStep = currentTourStep > 0 ? currentTourStep + 1 : 1;
    if (nextStep <= 6) {
        startTourStep(nextStep);
    }
}

function updateGuidedTourButton() {
    const button = document.querySelector('[onclick*="startGuidedTour"], [onclick*="pauseGuidedTour"], [onclick*="resumeGuidedTour"]');
    if (button) {
        if (guidedTourActive) {
            button.innerHTML = '<i class="fa-solid fa-pause"></i> Pause Tour';
            button.setAttribute('onclick', 'pauseGuidedTour()');
        } else if (currentTourStep > 0 && completedSteps.length > 0) {
            // If tour was paused, show play button
            button.innerHTML = '<i class="fa-solid fa-play"></i> Resume Tour';
            button.setAttribute('onclick', 'resumeGuidedTour()');
        } else {
            // Fresh start or after reset
            button.innerHTML = '<i class="fa-solid fa-route"></i> Start Guided Tour';
            button.setAttribute('onclick', 'startGuidedTour()');
        }
    }
}

function skipToStep(stepNumber) {
    // Complete all steps up to the target
    for (let i = 1; i <= stepNumber; i++) {
        completeStep(i);
    }
    startTourStep(stepNumber);
}

function showLockedStepMessage(stepNumber) {
    openModalWithContent(`
        <h2><i class="fa-solid fa-lock"></i> Step Locked</h2>
        <p>You must complete Step ${stepNumber - 1} before accessing Step ${stepNumber}.</p>
        <p>This guided tour ensures you follow the proper AI security assessment methodology.</p>
        <div style="text-align: center; margin-top: 30px;">
            <button class="cta-button" onclick="closeModal(); startTourStep(${stepNumber - 1});">
                <i class="fa-solid fa-arrow-left"></i> Go to Step ${stepNumber - 1}
            </button>
            <button class="cta-button" onclick="closeModal();" style="margin-left: 15px;">
                <i class="fa-solid fa-times"></i> Close
            </button>
        </div>
    `);
}

function showCongratulations() {
    openModalWithContent(`
        <h2><i class="fa-solid fa-trophy"></i> Congratulations!</h2>
        <p>🎉 You have successfully completed the AI Security Assessment Tour!</p>
        <p>You now have a comprehensive understanding of the 6-phase methodology for securing AI systems.</p>
        <div style="text-align: center; margin: 30px 0;">
            <div style="font-size: 4rem; color: #8936de;">🏆</div>
        </div>
        <div style="background: rgba(137, 54, 222, 0.1); padding: 20px; border-radius: 15px; margin: 20px 0;">
            <h3>Next Steps:</h3>
            <ul style="text-align: left;">
                <li>Download the complete methodology guide</li>
                <li>Explore the interactive architecture diagram</li>
                <li>Use the risk assessment matrix for your projects</li>
                <li>Check out the security testing tools</li>
            </ul>
        </div>
        <div style="text-align: center; margin-top: 30px;">
            <button class="cta-button" onclick="closeModal(); resetTour();">
                <i class="fa-solid fa-refresh"></i> Restart Tour
            </button>
            <button class="cta-button" onclick="closeModal();" style="margin-left: 15px;">
                <i class="fa-solid fa-times"></i> Close
            </button>
        </div>
    `);
}

// Initialize tour when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Lock all steps except the first one
    document.querySelectorAll('.tour-step').forEach((step, index) => {
        if (index > 0) {
            step.classList.add('locked');
        }
    });
    
    // Initialize architecture diagram
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({ startOnLoad: true });
    }
    initializeArchitectureDiagram();
});