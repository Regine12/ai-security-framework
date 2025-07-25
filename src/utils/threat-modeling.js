/**
 * MITRE ATLAS Threat Modeling Templates
 * Automated threat model generation for AI systems
 */

class AtlasThreatModeler {
    constructor() {
        this.threatModelTemplates = {
            'llm-api': this.getLLMAPITemplate(),
            'computer-vision': this.getComputerVisionTemplate(),
            'recommendation-system': this.getRecommendationSystemTemplate(),
            'autonomous-system': this.getAutonomousSystemTemplate()
        };
    }

    /**
     * Generate threat model for Large Language Model API
     */
    getLLMAPITemplate() {
        return {
            systemType: 'LLM API Service',
            description: 'Cloud-based Large Language Model with REST API interface',
            components: [
                {
                    name: 'API Gateway',
                    type: 'infrastructure',
                    threats: ['T1566', 'T1190'],
                    dataFlow: ['user-input', 'authentication']
                },
                {
                    name: 'LLM Model',
                    type: 'ai-model',
                    threats: ['T1600', 'T1602', 'T1601'],
                    dataFlow: ['prompt-processing', 'response-generation']
                },
                {
                    name: 'Training Data Store',
                    type: 'data-storage',
                    threats: ['T1591', 'T1601'],
                    dataFlow: ['model-training', 'data-retrieval']
                },
                {
                    name: 'Model Repository',
                    type: 'model-storage',
                    threats: ['T1590', 'T1602'],
                    dataFlow: ['model-deployment', 'version-control']
                }
            ],
            attackPaths: [
                {
                    name: 'Prompt Injection Attack',
                    techniques: ['T1566', 'T1600'],
                    severity: 'high',
                    description: 'Adversary crafts malicious prompts to manipulate model behavior'
                },
                {
                    name: 'Model Extraction via API',
                    techniques: ['T1602', 'T1590'],
                    severity: 'medium', 
                    description: 'Systematic API queries to reverse-engineer model architecture'
                },
                {
                    name: 'Training Data Poisoning',
                    techniques: ['T1601', 'T1591'],
                    severity: 'high',
                    description: 'Injection of malicious data during model training process'
                }
            ],
            mitigations: [
                'Input sanitization and validation',
                'Rate limiting and query monitoring',
                'Adversarial training techniques',
                'Data source verification',
                'Output filtering and safety checks'
            ]
        };
    }

    /**
     * Generate threat model for Computer Vision System
     */
    getComputerVisionTemplate() {
        return {
            systemType: 'Computer Vision System',
            description: 'Image/video processing system with ML-based classification',
            components: [
                {
                    name: 'Image Input Pipeline',
                    type: 'data-input',
                    threats: ['T1600', 'T1566'],
                    dataFlow: ['image-ingestion', 'preprocessing']
                },
                {
                    name: 'CNN Model',
                    type: 'ai-model',
                    threats: ['T1600', 'T1602'],
                    dataFlow: ['feature-extraction', 'classification']
                },
                {
                    name: 'Result Processing',
                    type: 'output-processing',
                    threats: ['T1602'],
                    dataFlow: ['prediction-output', 'confidence-scoring']
                }
            ],
            attackPaths: [
                {
                    name: 'Adversarial Image Attack',
                    techniques: ['T1600'],
                    severity: 'high',
                    description: 'Pixel-level perturbations to cause misclassification'
                },
                {
                    name: 'Model Inversion Attack',
                    techniques: ['T1602'],
                    severity: 'medium',
                    description: 'Reconstruct training images from model responses'
                }
            ],
            mitigations: [
                'Input preprocessing and filtering',
                'Adversarial training with robust examples',
                'Ensemble methods for improved robustness',
                'Confidence threshold validation'
            ]
        };
    }

    /**
     * Generate threat model for Recommendation System
     */
    getRecommendationSystemTemplate() {
        return {
            systemType: 'AI Recommendation System',
            description: 'ML-powered recommendation engine for personalized content',
            components: [
                {
                    name: 'User Profiling',
                    type: 'data-processing',
                    threats: ['T1591', 'T1601'],
                    dataFlow: ['user-behavior', 'preference-modeling']
                },
                {
                    name: 'Recommendation Engine',
                    type: 'ai-model',
                    threats: ['T1600', 'T1602'],
                    dataFlow: ['feature-processing', 'recommendation-generation']
                },
                {
                    name: 'Content Database',
                    type: 'data-storage',
                    threats: ['T1591', 'T1601'],
                    dataFlow: ['content-retrieval', 'metadata-processing']
                }
            ],
            attackPaths: [
                {
                    name: 'Preference Manipulation',
                    techniques: ['T1601', 'T1600'],
                    severity: 'medium',
                    description: 'Inject fake user interactions to bias recommendations'
                },
                {
                    name: 'User Privacy Inference',
                    techniques: ['T1602', 'T1591'],
                    severity: 'high',
                    description: 'Extract sensitive user information from recommendation patterns'
                }
            ],
            mitigations: [
                'User behavior anomaly detection',
                'Differential privacy for user data',
                'Recommendation diversity enforcement',
                'Interaction validation and filtering'
            ]
        };
    }

    /**
     * Generate threat model for Autonomous System
     */
    getAutonomousSystemTemplate() {
        return {
            systemType: 'Autonomous Decision System',
            description: 'AI-powered autonomous system with real-time decision making',
            components: [
                {
                    name: 'Sensor Data Processing',
                    type: 'data-input',
                    threats: ['T1600', 'T1566'],
                    dataFlow: ['sensor-data', 'environment-perception']
                },
                {
                    name: 'Decision Engine',
                    type: 'ai-model',
                    threats: ['T1600', 'T1602'],
                    dataFlow: ['decision-processing', 'action-planning']
                },
                {
                    name: 'Control System',
                    type: 'output-control',
                    threats: ['T1600'],
                    dataFlow: ['control-commands', 'system-actuation']
                }
            ],
            attackPaths: [
                {
                    name: 'Sensor Spoofing Attack',
                    techniques: ['T1600', 'T1566'],
                    severity: 'critical',
                    description: 'Manipulate sensor inputs to cause unsafe decisions'
                },
                {
                    name: 'Decision Logic Extraction',
                    techniques: ['T1602'],
                    severity: 'high',
                    description: 'Reverse-engineer decision-making algorithms'
                }
            ],
            mitigations: [
                'Multi-sensor validation and fusion',
                'Anomaly detection for sensor data',
                'Fail-safe mechanisms for critical decisions',
                'Continuous monitoring and override capabilities'
            ]
        };
    }

    /**
     * Generate customized threat model for specific AI system
     */
    generateThreatModel(systemProfile) {
        const baseTemplate = this.threatModelTemplates[systemProfile.type] || 
                           this.getGenericTemplate();
        
        // Customize based on system specifics
        const customizedModel = this.customizeTemplate(baseTemplate, systemProfile);
        
        // Generate ATLAS technique mappings
        const atlasMappings = this.generateAtlasMappings(customizedModel);
        
        // Calculate risk scores
        const riskAssessment = this.calculateThreatRisks(customizedModel, systemProfile);
        
        return {
            metadata: {
                systemId: systemProfile.id,
                systemName: systemProfile.name,
                systemType: customizedModel.systemType,
                generatedDate: new Date().toISOString(),
                atlasVersion: '1.0',
                framework: 'MITRE ATLAS'
            },
            systemDescription: customizedModel.description,
            components: customizedModel.components,
            attackPaths: customizedModel.attackPaths,
            atlasTechniques: atlasMappings,
            riskAssessment: riskAssessment,
            mitigations: customizedModel.mitigations,
            recommendations: this.generateMitigationPriorities(riskAssessment)
        };
    }

    /**
     * Get generic template for unknown system types
     */
    getGenericTemplate() {
        return {
            systemType: 'Generic AI System',
            description: 'AI-enabled system with machine learning components',
            components: [
                {
                    name: 'Data Input Layer',
                    type: 'data-input',
                    threats: ['T1600', 'T1591'],
                    dataFlow: ['data-ingestion']
                },
                {
                    name: 'ML Model',
                    type: 'ai-model', 
                    threats: ['T1600', 'T1602', 'T1601'],
                    dataFlow: ['inference-processing']
                },
                {
                    name: 'Output Layer',
                    type: 'output-processing',
                    threats: ['T1602'],
                    dataFlow: ['result-generation']
                }
            ],
            attackPaths: [
                {
                    name: 'Generic Adversarial Attack',
                    techniques: ['T1600'],
                    severity: 'medium',
                    description: 'Adversarial inputs to manipulate model behavior'
                }
            ],
            mitigations: [
                'Input validation and sanitization',
                'Model robustness testing',
                'Output monitoring and validation'
            ]
        };
    }

    /**
     * Customize template based on system profile
     */
    customizeTemplate(template, systemProfile) {
        const customized = JSON.parse(JSON.stringify(template));
        
        // Add environment-specific threats
        if (systemProfile.environment === 'cloud') {
            customized.components.forEach(component => {
                if (!component.threats.includes('T1566')) {
                    component.threats.push('T1566'); // Cloud-specific phishing risks
                }
            });
        }
        
        // Add criticality-based threat escalation
        if (systemProfile.criticality === 'high' || systemProfile.criticality === 'very-high') {
            customized.attackPaths.forEach(path => {
                if (path.severity === 'medium') path.severity = 'high';
                if (path.severity === 'high') path.severity = 'critical';
            });
        }
        
        return customized;
    }

    /**
     * Generate ATLAS technique mappings for threat model
     */
    generateAtlasMappings(threatModel) {
        const mappings = {};
        
        threatModel.components.forEach(component => {
            component.threats.forEach(threatId => {
                if (ATLAS_TECHNIQUES[threatId]) {
                    mappings[threatId] = {
                        ...ATLAS_TECHNIQUES[threatId],
                        applicableComponents: [component.name],
                        dataFlowImpact: component.dataFlow
                    };
                }
            });
        });
        
        return mappings;
    }

    /**
     * Calculate risk scores for identified threats
     */
    calculateThreatRisks(threatModel, systemProfile) {
        const calculator = new AtlasRiskCalculator();
        const risks = [];
        
        Object.keys(this.generateAtlasMappings(threatModel)).forEach(techniqueId => {
            const risk = calculator.calculateTechniqueRisk(
                techniqueId,
                { criticality: systemProfile.criticality },
                { 
                    exposure: systemProfile.environment,
                    securityControls: systemProfile.securityControls || []
                }
            );
            risks.push(risk);
        });
        
        return {
            overallRisk: this.calculateOverallRisk(risks),
            techniquesAssessed: risks.length,
            riskDistribution: calculator.getRiskDistribution(risks),
            topRisks: risks.sort((a, b) => b.riskScore - a.riskScore).slice(0, 5),
            detailedRisks: risks
        };
    }

    /**
     * Calculate overall risk score for the system
     */
    calculateOverallRisk(risks) {
        if (risks.length === 0) return 0;
        
        const weightedSum = risks.reduce((sum, risk) => {
            const weight = risk.riskLevel === 'critical' ? 3 : 
                          risk.riskLevel === 'high' ? 2 : 1;
            return sum + (risk.riskScore * weight);
        }, 0);
        
        const totalWeight = risks.reduce((sum, risk) => {
            return sum + (risk.riskLevel === 'critical' ? 3 : 
                         risk.riskLevel === 'high' ? 2 : 1);
        }, 0);
        
        return Math.round((weightedSum / totalWeight) * 100) / 100;
    }

    /**
     * Generate mitigation priorities based on risk assessment
     */
    generateMitigationPriorities(riskAssessment) {
        const priorities = [];
        
        riskAssessment.topRisks.forEach((risk, index) => {
            risk.countermeasures.forEach(countermeasure => {
                const existing = priorities.find(p => p.mitigation === countermeasure);
                if (existing) {
                    existing.priority += (5 - index);
                    existing.techniques.push(risk.techniqueId);
                } else {
                    priorities.push({
                        mitigation: countermeasure,
                        priority: 5 - index,
                        techniques: [risk.techniqueId],
                        urgency: risk.riskLevel
                    });
                }
            });
        });
        
        return priorities
            .sort((a, b) => b.priority - a.priority)
            .slice(0, 10)
            .map(p => ({
                ...p,
                priorityLevel: p.priority >= 8 ? 'critical' : 
                              p.priority >= 5 ? 'high' : 
                              p.priority >= 3 ? 'medium' : 'low'
            }));
    }
}

// Export for use in applications
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AtlasThreatModeler };
} else {
    window.AtlasThreatModeler = AtlasThreatModeler;
}
