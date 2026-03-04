export default function EcoImpact() {
    const stats = [
        { icon: "🌳", value: "2", label: "Trees Thanked" },
        { icon: "🛍️", value: "5", label: "Plastic Bags Saved" },
        { icon: "♻️", value: "0.8 kg", label: "CO₂ Offset" },
    ];

    return (
        <div className="eco-impact" id="eco-impact">
            <h3 className="eco-impact-title">🌍 Your Eco Impact</h3>
            <div className="eco-impact-grid">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className="eco-impact-stat"
                        style={{ animationDelay: `${i * 0.15}s` }}
                    >
                        <span className="eco-stat-icon" style={{ animationDelay: `${i * 0.5}s` }}>
                            {stat.icon}
                        </span>
                        <div className="eco-stat-value">{stat.value}</div>
                        <div className="eco-stat-label">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
