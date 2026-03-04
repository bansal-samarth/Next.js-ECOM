export default function TrustBadges() {
    const badges = [
        { icon: "🔒", label: "256-bit SSL\nEncryption" },
        { icon: "🛡️", label: "Secure\nPayments" },
        { icon: "🔄", label: "Easy 30-day\nReturns" },
        { icon: "🌱", label: "Eco-Friendly\nPackaging" },
    ];

    return (
        <div className="trust-badges" id="trust-badges">
            {badges.map((badge, i) => (
                <div key={i} className="trust-badge">
                    <div className="trust-badge-icon">{badge.icon}</div>
                    <span style={{ whiteSpace: "pre-line" }}>{badge.label}</span>
                </div>
            ))}
        </div>
    );
}
