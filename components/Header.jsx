"use client";

import { useState, useEffect } from "react";
import { useCheckout } from "@/context/CheckoutContext";

export default function Header() {
    const [theme, setTheme] = useState("light");
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const { totalCartCount, resetCheckout } = useCheckout();

    useEffect(() => {
        const saved = localStorage.getItem("ecoyaan-theme") || "light";
        setTheme(saved);
        document.documentElement.setAttribute("data-theme", saved);
    }, []);

    const toggleTheme = () => {
        const next = theme === "light" ? "dark" : "light";
        setTheme(next);
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("ecoyaan-theme", next);
    };

    const handleReset = () => {
        resetCheckout();
        setShowResetConfirm(false);
        window.location.href = "/";
    };

    return (
        <>
            <header className="header" id="main-header">
                <div className="header-inner">
                    <a href="/" className="logo" id="logo-link">
                        <span className="logo-icon">🌿</span>
                        Ecoyaan
                    </a>
                    <div className="header-actions">
                        <button
                            className="reset-btn"
                            onClick={() => setShowResetConfirm(true)}
                            title="Reset checkout"
                            id="reset-btn"
                        >
                            ↻
                        </button>
                        <label className="theme-toggle-label" id="theme-toggle-label">
                            {theme === "light" ? "☀️" : "🌙"}
                            <button
                                className="theme-toggle"
                                onClick={toggleTheme}
                                aria-label="Toggle dark mode"
                                id="theme-toggle-btn"
                            />
                        </label>
                        <div className="cart-badge" id="cart-badge">
                            🛒
                            {totalCartCount > 0 && (
                                <span className="cart-badge-count">{totalCartCount}</span>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Reset Confirmation Modal */}
            {showResetConfirm && (
                <div className="modal-overlay" id="reset-modal" onClick={() => setShowResetConfirm(false)}>
                    <div className="modal-card animate-scale-in" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-icon">↻</div>
                        <h3>Reset Checkout?</h3>
                        <p>This will clear your cart, saved items, shipping address, and return you to the start.</p>
                        <div className="modal-actions">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowResetConfirm(false)}
                                id="reset-cancel-btn"
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleReset}
                                style={{ background: "var(--error)" }}
                                id="reset-confirm-btn"
                            >
                                Reset Everything
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
