"use client";

import { useEffect, useState } from "react";

const COLORS = [
    "#22c55e",
    "#16a34a",
    "#4ade80",
    "#fbbf24",
    "#f59e0b",
    "#ef4444",
    "#3b82f6",
    "#a855f7",
    "#ec4899",
    "#14b8a6",
];

export default function Confetti() {
    const [pieces, setPieces] = useState([]);

    useEffect(() => {
        const items = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            delay: Math.random() * 2,
            duration: 2 + Math.random() * 3,
            size: 6 + Math.random() * 8,
        }));
        setPieces(items);

        const timer = setTimeout(() => setPieces([]), 5000);
        return () => clearTimeout(timer);
    }, []);

    if (pieces.length === 0) return null;

    return (
        <div className="confetti-container" aria-hidden="true">
            {pieces.map((p) => (
                <div
                    key={p.id}
                    className="confetti-piece"
                    style={{
                        left: `${p.left}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        background: p.color,
                        "--delay": `${p.delay}s`,
                        "--duration": `${p.duration}s`,
                    }}
                />
            ))}
        </div>
    );
}
