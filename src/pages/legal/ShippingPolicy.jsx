import React from "react";
import LegalLayout from "./LegalLayout";

const ShippingPolicy = () => {
    return (
        <LegalLayout title="Shipping Protocol" lastUpdated="FEB 23, 2026">
            <h2>1. Priority Logistics</h2>
            <p>
                Sartaaj Bharat utilizes a global network of logistics partners to ensure your artifacts arrive with speed and precision. We offer tracked global transit for every acquisition.
            </p>

            <h2>2. Transit Estimates</h2>
            <ul>
                <li><strong>Interstate Delivery:</strong> 2-4 business cycles.</li>
                <li><strong>National Transit:</strong> 5-7 business cycles.</li>
                <li><strong>Global priority:</strong> 7-12 business cycles.</li>
            </ul>

            <h2>3. Secure Packaging</h2>
            <p>
                Every artifact is encased in high-grade protective materials and sealed with tamper-evident markers to ensure it reaches you in pristine condition.
            </p>

            <h2>4. Real-time Tracking</h2>
            <p>
                Once your acquisition leaves our vault, you will receive a <strong>Transit Manifest</strong> with a tracking ID via your secure email.
            </p>

            <h2>5. Restricted Zones</h2>
            <p>
                While we strive for global reach, certain high-risk zones may have limited delivery capabilities. Our concierge will contact you if your zone requires special routing protocols.
            </p>
        </LegalLayout>
    );
};

export default ShippingPolicy;
