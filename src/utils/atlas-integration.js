/**
 * MITRE ATLAS Integration Module
 * Comprehensive implementation of MITRE ATLAS techniques for AI security assessment
 * 
 * @author AI Security Framework Team
 * @version 1.0.0
 * @license MIT
 */

// MITRE ATLAS Technique Database
const ATLAS_TECHNIQUES = {
    // Reconnaissance Phase
    "T1590": {
        id: "T1590",
        name: "Gather Victim AI Model Information",
        phase: "Reconnaissance",
        description: "Adversaries may gather information about the victim's machine learning models that can be used during targeting.",
        aiSpecific: true,
        severity: 3,
        platforms: ["Cloud", "Edge", "Mobile"],
        tactics: ["Reconnaissance"],
        dataSource: ["Model Repository", "API Documentation", "Public Research"],
        countermeasures: [
            "Model Architecture Obfuscation",
            "Access Control Enforcement",
            "Information Sanitization"
        ],
        owasp_mapping: ["LLM01", "LLM06"],
        risk_factors: {
            accessibility: 0.8,
            impact: 0.6,
            complexity: 0.4
        }
    },
    
    "T1591": {
        id: "T1591",
        name: "Gather Victim Data Information",
        phase: "Reconnaissance", 
        description: "Adversaries may gather information about the victim's training or inference data.",
        aiSpecific: true,
        severity: 4,
        platforms: ["Cloud", "Edge"],
        tactics: ["Reconnaissance"],
        dataSource: ["Training Data", "Inference Logs", "Data Pipeline"],
        countermeasures: [
            "Data Anonymization",
            "Differential Privacy",
            "Access Logging"
        ],
        owasp_mapping: ["LLM06", "LLM03"],
        risk_factors: {
            accessibility: 0.6,
            impact: 0.9,
            complexity: 0.5
        }
    },

    // Resource Development Phase
    "T1588": {
        id: "T1588",
        name: "Obtain Capabilities",
        phase: "Resource Development",
        description: "Adversaries may obtain capabilities to support their operations against ML systems.",
        aiSpecific: false,
        severity: 3,
        platforms: ["Any"],
        tactics: ["Resource Development"],
        dataSource: ["Threat Intelligence", "Tool Repositories"],
        countermeasures: [
            "Supply Chain Security",
            "Capability Monitoring",
            "Threat Intelligence"
        ],
        owasp_mapping: ["LLM05"],
        risk_factors: {
            accessibility: 0.7,
            impact: 0.5,
            complexity: 0.6
        }
    },

    // Initial Access Phase
    "T1566": {
        id: "T1566",
        name: "Phishing",
        phase: "Initial Access",
        description: "Adversaries may send phishing messages to gain access to victim ML infrastructure.",
        aiSpecific: false,
        severity: 4,
        platforms: ["Cloud", "Hybrid"],
        tactics: ["Initial Access"],
        dataSource: ["Email Security", "User Behavior"],
        countermeasures: [
            "User Training",
            "Email Filtering",
            "Multi-Factor Authentication"
        ],
        owasp_mapping: ["LLM08"],
        risk_factors: {
            accessibility: 0.8,
            impact: 0.8,
            complexity: 0.3
        }
    },

    // ML Attack Phase
    "T1600": {
        id: "T1600",
        name: "Adversarial Example",
        phase: "ML Attack",
        description: "Adversaries may use adversarial examples to evade ML models or cause misclassification.",
        aiSpecific: true,
        severity: 5,
        platforms: ["Cloud", "Edge", "Mobile"],
        tactics: ["ML Attack", "Defense Evasion"],
        dataSource: ["Model Inputs", "Prediction Outputs"],
        countermeasures: [
            "Adversarial Training",
            "Input Validation",
            "Ensemble Methods",
            "Anomaly Detection"
        ],
        owasp_mapping: ["LLM01"],
        risk_factors: {
            accessibility: 0.6,
            impact: 0.9,
            complexity: 0.7
        }
    },

    "T1601": {
        id: "T1601",
        name: "Data Poisoning",
        phase: "ML Attack",
        description: "Adversaries may insert malicious data into training datasets to manipulate model behavior.",
        aiSpecific: true,
        severity: 5,
        platforms: ["Cloud", "Edge"],
        tactics: ["ML Attack", "Persistence"],
        dataSource: ["Training Data", "Data Pipeline"],
        countermeasures: [
            "Data Validation",
            "Anomaly Detection",
            "Secure Data Sources",
            "Data Lineage Tracking"
        ],
        owasp_mapping: ["LLM03"],
        risk_factors: {
            accessibility: 0.4,
            impact: 1.0,
            complexity: 0.8
        }
    },

    "T1602": {
        id: "T1602", 
        name: "Model Extraction",
        phase: "ML Attack",
        description: "Adversaries may query ML models to extract sensitive information about model architecture or training data.",
        aiSpecific: true,
        severity: 4,
        platforms: ["Cloud", "API"],
        tactics: ["ML Attack", "Collection"],
        dataSource: ["API Calls", "Model Responses"],
        countermeasures: [
            "Rate Limiting",
            "Query Monitoring",
            "Output Sanitization",
            "Differential Privacy"
        ],
        owasp_mapping: ["LLM06", "LLM04"],
        risk_factors: {
            accessibility: 0.7,
            impact: 0.8,
            complexity: 0.6
        }
    }
};

// ATLAS Risk Scoring Algorithm
class AtlasRiskCalculator {
    constructor() {
        this.weightings = {
            severity: 0.3,
            accessibility: 0.25,
            impact: 0.3,
            complexity: 0.15
        };
    }

    /**
     * Calculate risk score for a specific ATLAS technique
     * @param {string} techniqueId - ATLAS technique ID
     * @param {Object} assetContext - Asset-specific context
     * @param {Object} environmentContext - Environment-specific context
     * @returns {Object} Risk assessment result
     */
    calculateTechniqueRisk(techniqueId, assetContext = {}, environmentContext = {}) {
        const technique = ATLAS_TECHNIQUES[techniqueId];
        if (!technique) {
            throw new Error(`Unknown ATLAS technique: ${techniqueId}`);
        }

        // Base risk factors from technique
        const baseFactors = {
            severity: technique.severity / 5.0, // Normalize to 0-1
            accessibility: technique.risk_factors.accessibility,
            impact: technique.risk_factors.impact,
            complexity: 1 - technique.risk_factors.complexity // Invert complexity
        };

        // Apply context modifiers
        const contextFactors = this.applyContextModifiers(baseFactors, assetContext, environmentContext);
        
        // Calculate weighted risk score
        const riskScore = Object.keys(this.weightings).reduce((score, factor) => {
            return score + (contextFactors[factor] * this.weightings[factor]);
        }, 0);

        return {
            techniqueId,
            techniqueName: technique.name,
            riskScore: Math.round(riskScore * 100) / 100,
            riskLevel: this.getRiskLevel(riskScore),
            factors: contextFactors,
            countermeasures: technique.countermeasures,
            owaspMapping: technique.owasp_mapping
        };
    }

    /**
     * Apply context-specific modifiers to risk factors
     */
    applyContextModifiers(baseFactors, assetContext, environmentContext) {
        const modified = { ...baseFactors };
        
        // Asset criticality modifier
        if (assetContext.criticality) {
            const criticalityMultiplier = {
                'very-low': 0.5,
                'low': 0.7,
                'medium': 1.0,
                'high': 1.3,
                'very-high': 1.5
            }[assetContext.criticality] || 1.0;
            
            modified.impact *= criticalityMultiplier;
        }

        // Environment exposure modifier
        if (environmentContext.exposure) {
            const exposureMultiplier = {
                'internal': 0.6,
                'partner': 0.8,
                'public': 1.2,
                'internet': 1.5
            }[environmentContext.exposure] || 1.0;
            
            modified.accessibility *= exposureMultiplier;
        }

        // Security controls modifier
        if (environmentContext.securityControls) {
            const controlStrength = environmentContext.securityControls.reduce((strength, control) => {
                return strength + this.getControlEffectiveness(control);
            }, 0) / environmentContext.securityControls.length;
            
            modified.accessibility *= (1 - controlStrength * 0.4);
        }

        return modified;
    }

    /**
     * Get effectiveness rating for security controls
     */
    getControlEffectiveness(control) {
        const effectivenessMap = {
            'input-validation': 0.8,
            'access-controls': 0.7,
            'monitoring': 0.6,
            'encryption': 0.5,
            'anomaly-detection': 0.7,
            'rate-limiting': 0.6,
            'adversarial-training': 0.8,
            'differential-privacy': 0.9
        };
        
        return effectivenessMap[control] || 0.3;
    }

    /**
     * Convert numeric risk score to risk level
     */
    getRiskLevel(score) {
        if (score >= 0.8) return 'critical';
        if (score >= 0.6) return 'high';
        if (score >= 0.4) return 'medium';
        if (score >= 0.2) return 'low';
        return 'very-low';
    }

    /**
     * Generate comprehensive risk assessment for AI system
     */
    assessAISystem(systemProfile) {
        const assessmentResults = [];
        
        Object.keys(ATLAS_TECHNIQUES).forEach(techniqueId => {
            const technique = ATLAS_TECHNIQUES[techniqueId];
            
            // Check if technique is applicable to system
            if (this.isTechniqueApplicable(technique, systemProfile)) {
                const riskAssessment = this.calculateTechniqueRisk(
                    techniqueId,
                    systemProfile.asset,
                    systemProfile.environment
                );
                assessmentResults.push(riskAssessment);
            }
        });

        return {
            systemId: systemProfile.id,
            assessmentDate: new Date().toISOString(),
            totalTechniques: assessmentResults.length,
            riskDistribution: this.getRiskDistribution(assessmentResults),
            highestRisks: assessmentResults
                .sort((a, b) => b.riskScore - a.riskScore)
                .slice(0, 10),
            recommendations: this.generateRecommendations(assessmentResults),
            techniques: assessmentResults
        };
    }

    /**
     * Check if ATLAS technique applies to the system profile
     */
    isTechniqueApplicable(technique, systemProfile) {
        // Check platform compatibility
        if (systemProfile.platform && technique.platforms.length > 0) {
            if (!technique.platforms.includes(systemProfile.platform) && 
                !technique.platforms.includes('Any')) {
                return false;
            }
        }

        // Check AI-specific requirements
        if (technique.aiSpecific && !systemProfile.hasAI) {
            return false;
        }

        return true;
    }

    /**
     * Calculate risk distribution across levels
     */
    getRiskDistribution(assessmentResults) {
        const distribution = {
            'critical': 0,
            'high': 0,
            'medium': 0,
            'low': 0,
            'very-low': 0
        };

        assessmentResults.forEach(result => {
            distribution[result.riskLevel]++;
        });

        return distribution;
    }

    /**
     * Generate security recommendations based on assessment
     */
    generateRecommendations(assessmentResults) {
        const recommendations = [];
        const countermeasureFreq = {};

        // Count countermeasure frequency in high-risk techniques
        assessmentResults
            .filter(result => ['critical', 'high'].includes(result.riskLevel))
            .forEach(result => {
                result.countermeasures.forEach(countermeasure => {
                    countermeasureFreq[countermeasure] = (countermeasureFreq[countermeasure] || 0) + 1;
                });
            });

        // Generate top recommendations
        Object.entries(countermeasureFreq)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 8)
            .forEach(([countermeasure, frequency]) => {
                recommendations.push({
                    control: countermeasure,
                    priority: frequency >= 3 ? 'high' : frequency >= 2 ? 'medium' : 'low',
                    applicableTechniques: frequency,
                    description: this.getCountermeasureDescription(countermeasure)
                });
            });

        return recommendations;
    }

    /**
     * Get description for security countermeasures
     */
    getCountermeasureDescription(countermeasure) {
        const descriptions = {
            'Input Validation': 'Implement robust input validation and sanitization for all AI model inputs',
            'Access Control Enforcement': 'Strengthen access controls and authentication mechanisms',
            'Adversarial Training': 'Train models with adversarial examples to improve robustness',
            'Data Anonymization': 'Apply data anonymization and privacy-preserving techniques',
            'Rate Limiting': 'Implement API rate limiting and abuse detection',
            'Anomaly Detection': 'Deploy anomaly detection systems for unusual model behavior',
            'Monitoring': 'Enhance logging and monitoring capabilities',
            'Differential Privacy': 'Apply differential privacy techniques to model outputs'
        };
        
        return descriptions[countermeasure] || `Implement ${countermeasure.toLowerCase()} security measures`;
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ATLAS_TECHNIQUES, AtlasRiskCalculator };
} else {
    window.ATLAS_TECHNIQUES = ATLAS_TECHNIQUES;
    window.AtlasRiskCalculator = AtlasRiskCalculator;
}
