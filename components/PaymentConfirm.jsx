"use client";

import { useState } from "react";
import { useCheckout } from "@/context/CheckoutContext";
import TrustBadges from "./TrustBadges";

const PAYMENT_METHODS = [
    {
        id: "upi",
        icon: "📱",
        name: "UPI",
        desc: "Google Pay, PhonePe, Paytm",
    },
    {
        id: "card",
        icon: "💳",
        name: "Credit / Debit Card",
        desc: "Visa, Mastercard, RuPay",
    },
    {
        id: "cod",
        icon: "💵",
        name: "Cash on Delivery",
        desc: "Pay when you receive",
    },
];

export default function PaymentConfirm() {
    const {
        cartItems,
        shippingAddress,
        subtotal,
        shippingFee,
        discount,
        grandTotal,
        paymentMethod,
        setPaymentMethod,
        placeOrder,
        prevStep,
    } = useCheckout();

    const [processing, setProcessing] = useState(false);

    const handlePay = () => {
        setProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            placeOrder();
        }, 2000);
    };

    return (
        <div className="animate-slide-right" id="payment-section">
            {processing && (
                <div className="processing-overlay" id="processing-overlay">
                    <div className="processing-card">
                        <div className="spinner spinner-dark" style={{ width: 40, height: 40, margin: "0 auto" }} />
                        <h3>Processing Payment...</h3>
                        <p>Please wait while we confirm your order</p>
                    </div>
                </div>
            )}

            <h2 className="section-heading">
                <span className="section-heading-icon">💳</span>
                Payment & Confirmation
            </h2>

            <div className="checkout-layout">
                <div className="checkout-main">
                    {/* Shipping Address Review */}
                    <div className="card" style={{ marginBottom: "20px" }}>
                        <div className="address-preview" id="address-review">
                            <h4>📍 Shipping To</h4>
                            <p>
                                <strong>{shippingAddress.fullName}</strong>
                                <br />
                                {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pinCode}
                                <br />
                                📧 {shippingAddress.email} &nbsp;•&nbsp; 📞 {shippingAddress.phone}
                            </p>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="card">
                        <h3
                            className="section-heading"
                            style={{ fontSize: "1.15rem", marginBottom: "4px" }}
                        >
                            Choose Payment Method
                        </h3>
                        <div className="payment-methods" id="payment-methods">
                            {PAYMENT_METHODS.map((method) => (
                                <div
                                    key={method.id}
                                    className={`payment-option ${paymentMethod === method.id ? "selected" : ""}`}
                                    onClick={() => setPaymentMethod(method.id)}
                                    id={`payment-${method.id}`}
                                >
                                    <div className="payment-radio">
                                        <div className="payment-radio-dot" />
                                    </div>
                                    <span className="payment-icon">{method.icon}</span>
                                    <div className="payment-info">
                                        <h4>{method.name}</h4>
                                        <p>{method.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={prevStep}
                                id="back-to-shipping-btn"
                            >
                                ← Back
                            </button>
                            <button
                                className="btn btn-primary btn-large"
                                style={{ flex: 1 }}
                                onClick={handlePay}
                                disabled={processing}
                                id="pay-btn"
                            >
                                {processing ? (
                                    <div className="spinner" />
                                ) : (
                                    <>
                                        🔒 Pay Securely ₹{grandTotal.toLocaleString("en-IN")}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <TrustBadges />
                </div>

                <div className="checkout-sidebar">
                    <div className="card">
                        <h3
                            className="section-heading"
                            style={{ fontSize: "1.15rem", marginBottom: "16px" }}
                        >
                            Order Summary
                        </h3>

                        {/* Mini cart items */}
                        {cartItems.map((item) => (
                            <div
                                key={item.product_id}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "8px 0",
                                    fontSize: "0.9rem",
                                    color: "var(--text-secondary)",
                                }}
                            >
                                <span>
                                    {item.product_name} × {item.quantity}
                                </span>
                                <span style={{ fontWeight: 600 }}>
                                    ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                                </span>
                            </div>
                        ))}

                        <div className="order-summary" style={{ marginTop: "12px" }}>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>₹{shippingFee}</span>
                            </div>
                            {discount > 0 && (
                                <div className="summary-row discount">
                                    <span>Discount</span>
                                    <span>-₹{discount}</span>
                                </div>
                            )}
                            <div className="summary-row total">
                                <span>Total</span>
                                <span className="price">₹{grandTotal.toLocaleString("en-IN")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
