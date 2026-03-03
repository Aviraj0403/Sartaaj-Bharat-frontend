import React from "react";
import LegalLayout from "./LegalLayout";

const CookiePolicy = () => {
    return (
        <LegalLayout title="Cookie Policy" lastUpdated="FEB 23, 2026">
            <h2>1. Tracking Nodes</h2>
            <p>
                We utilize "Cookies" and similar tracking technologies to refine your interaction with the Sartaaj Bharat matrix. These small data packets allow our systems to recognize your preferences and maintain your secure session.
            </p>

            <h2>2. Categories of Interaction</h2>
            <ul>
                <li><strong>Core Necessity:</strong> Required for the basic functionality of the layout (e.g., maintaining your cart manifest).</li>
                <li><strong>Intelligence & Analytics:</strong> Used to understand how the elite interact with our pages to optimize performance.</li>
                <li><strong>Preference Nodes:</strong> Remembers your language, currency, and curated selection settings.</li>
            </ul>

            <h2>3. Third-Party Integration</h2>
            <p>
                We may partner with premium analytics providers to gain insight into platform usage. These nodes operate under strict privacy protocols and do not access your unencrypted personal markers.
            </p>

            <h2>4. Profile Control</h2>
            <p>
                You can manage or disable tracking nodes through your browser's security console. Note that disabling core cookies may degrade your premium experience and prevent secure acquisitions.
            </p>
        </LegalLayout>
    );
};

export default CookiePolicy;
