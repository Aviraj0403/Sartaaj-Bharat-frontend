import React from "react";
import LegalLayout from "./LegalLayout";

const PrivacyPolicy = () => {
    return (
        <LegalLayout title="Privacy Policy" lastUpdated="FEB 23, 2026">
            <h2>1. Information Matrix</h2>
            <p>
                At Sartaaj Bharat, we prioritize the integrity of your personal data. When you interact with our elite platform, we collect specific identification metrics including:
            </p>
            <ul>
                <li><strong>Identity Markers:</strong> Name, username, and biometric patterns (where applicable).</li>
                <li><strong>Communication Nodes:</strong> Encrypted email addresses and verified mobile numbers.</li>
                <li><strong>Transaction Logs:</strong> Secure acquisition history and privilege code usage.</li>
            </ul>

            <h2>2. Data Encryption & Usage</h2>
            <p>
                Your information is utilized strictly to provide a seamless premium experience. We do not sell your data to external entities. Core usage protocols include:
            </p>
            <p>
                - Facilitating secure product acquisitions.<br />
                - Synchronizing your profile across our global matrix.<br />
                - Providing priority concierge support via encrypted channels.
            </p>

            <h2>3. The Vault (Security)</h2>
            <p>
                We employ AES-256 level encryption for all stored artifacts. Your security is maintained through continuous monitoring and adaptive defense systems. Unauthorized access is mitigated via multi-factor authentication and secure token swaps.
            </p>

            <h2>4. User Autonomy</h2>
            <p>
                Every member of the Sartaaj Bharat ecosystem maintains full control over their digital footprint. You have the right to request a full erasure of your profile or export your data manifest at any time.
            </p>

            <h2>5. Contact Protocol</h2>
            <p>
                For inquiries regarding data privacy, initiate communication via the <strong>Concierge Node</strong> at concierge@sartaaj.com.
            </p>
        </LegalLayout>
    );
};

export default PrivacyPolicy;
