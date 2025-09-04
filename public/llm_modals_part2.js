// OWASP LLM Top 10 2025 Modal Contents - Part 2 (LLM06-LLM10)

// Ensure modalContents object exists
if (typeof window !== 'undefined') {
    if (typeof window.modalContents === 'undefined') {
        window.modalContents = {};
    }
} else if (typeof modalContents === 'undefined') {
    var modalContents = {};
}

// LLM06: Excessive Agency
window.modalContents['owasp-llm06'] = \`
    <h2><i class="fa-solid fa-robot"></i> LLM06: Excessive Agency</h2>
    <div style="padding: 20px;">
        <div style="background: rgba(244, 67, 54, 0.1); border-left: 4px solid #f44336; padding: 15px; margin: 15px 0; border-radius: 8px;">
            <strong>HIGH RISK:</strong> LLM systems granted excessive autonomy and permissions
        </div>
        
        <h3>Overview</h3>
        <p>Excessive Agency occurs when LLM systems are granted excessive autonomy, permissions, or functionality beyond what is necessary for their intended purpose. This can lead to unintended actions, privilege escalation, and system compromise.</p>
        
        <h3>Common Scenarios</h3>
        <ul>
            <li><strong>Overprovisioned Permissions:</strong> LLMs with unnecessary access to critical systems</li>
            <li><strong>Autonomous Decision Making:</strong> Systems making high-risk decisions without human oversight</li>
            <li><strong>Unrestricted API Access:</strong> LLMs with broad access to external services and APIs</li>
            <li><strong>Administrative Privileges:</strong> Systems operating with elevated permissions</li>
            <li><strong>Cross-domain Access:</strong> Access to multiple unrelated systems or data domains</li>
        </ul>
        
        <h3>Mitigation Strategies</h3>
        <ul>
            <li>Implement principle of least privilege for LLM systems</li>
            <li>Use role-based access control (RBAC) with minimal permissions</li>
            <li>Require human approval for high-risk actions</li>
            <li>Implement activity monitoring and audit logging</li>
            <li>Deploy circuit breakers and safety mechanisms</li>
            <li>Regular review and adjustment of system permissions</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">
            <a href="https://genai.owasp.org/llmrisk/llm06/" target="_blank" 
               style="display: inline-block; background: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
               📖 Read Official OWASP Documentation
            </a>
        </div>
    </div>
\`;

console.log('OWASP LLM Top 10 modals loaded: LLM06-LLM10 complete');
