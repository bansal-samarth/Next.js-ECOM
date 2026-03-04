"use client";

import { useMemo } from "react";
import { useCheckout } from "@/context/CheckoutContext";
import EcoImpact from "./EcoImpact";
import Confetti from "./Confetti";

export default function OrderSuccess() {
    const { grandTotal, shippingAddress, resetCheckout } = useCheckout();

    const orderId = useMemo(
        () => "ECO-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        []
    );

    return (
        <>
            <Confetti />
            <div className="success-container" id="order-success-section">
                <div className="success-icon-wrapper">
                    <svg viewBox="0 0 52 52">
                        <path d="M14 27l7.8 7.8L38 17" />
                    </svg>
                </div>

                <h1 className="success-title">Order Successful! 🎉</h1>
                <p className="success-subtitle">
                    Thank you, <strong>{shippingAddress.fullName}</strong>! Your order has
                    been placed.
                </p>

                <div className="success-order-id" id="order-id">
                    Order ID: <strong>{orderId}</strong>
                </div>

                <div
                    className="card"
                    style={{
                        maxWidth: 500,
                        margin: "0 auto 24px",
                        textAlign: "left",
                    }}
                >
                    <div className="address-preview">
                        <h4>📍 Delivering To</h4>
                        <p>
                            <strong>{shippingAddress.fullName}</strong>
                            <br />
                            {shippingAddress.city}, {shippingAddress.state} -{" "}
                            {shippingAddress.pinCode}
                            <br />
                            📧 {shippingAddress.email}
                        </p>
                    </div>
                    <div
                        className="summary-row total"
                        style={{ marginTop: "12px", padding: "16px 0 0" }}
                    >
                        <span>Amount Paid</span>
                        <span className="price">
                            ₹{grandTotal.toLocaleString("en-IN")}
                        </span>
                    </div>
                </div>

                <EcoImpact />

                <button
                    className="btn btn-primary btn-large"
                    onClick={() => {
                        resetCheckout();
                        window.location.href = "/";
                    }}
                    style={{ marginTop: "16px" }}
                    id="continue-shopping-btn"
                >
                    🛒 Continue Shopping
                </button>
            </div>
        </>
    );
}
