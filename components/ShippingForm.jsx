"use client";

import { useState, useCallback, useEffect } from "react";
import { useCheckout } from "@/context/CheckoutContext";

const PIN_LOOKUP = {
    "110001": { city: "New Delhi", state: "Delhi" },
    "400001": { city: "Mumbai", state: "Maharashtra" },
    "560001": { city: "Bangalore", state: "Karnataka" },
    "600001": { city: "Chennai", state: "Tamil Nadu" },
    "700001": { city: "Kolkata", state: "West Bengal" },
    "500001": { city: "Hyderabad", state: "Telangana" },
    "380001": { city: "Ahmedabad", state: "Gujarat" },
    "411001": { city: "Pune", state: "Maharashtra" },
    "302001": { city: "Jaipur", state: "Rajasthan" },
    "226001": { city: "Lucknow", state: "Uttar Pradesh" },
};

const validators = {
    fullName: (v) => {
        if (!v.trim()) return "Full name is required";
        if (v.trim().length < 2) return "Name must be at least 2 characters";
        return "";
    },
    email: (v) => {
        if (!v.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Please enter a valid email";
        return "";
    },
    phone: (v) => {
        if (!v.trim()) return "Phone number is required";
        if (!/^\d{10}$/.test(v.replace(/\s/g, ""))) return "Please enter a valid 10-digit phone number";
        return "";
    },
    pinCode: (v) => {
        if (!v.trim()) return "PIN code is required";
        if (!/^\d{6}$/.test(v)) return "Please enter a valid 6-digit PIN code";
        return "";
    },
    city: (v) => (!v.trim() ? "City is required" : ""),
    state: (v) => (!v.trim() ? "State is required" : ""),
};

export default function ShippingForm() {
    const { shippingAddress, setAddress, nextStep, prevStep, subtotal, shippingFee, discount, grandTotal } =
        useCheckout();

    const [form, setForm] = useState({
        fullName: shippingAddress.fullName || "",
        email: shippingAddress.email || "",
        phone: shippingAddress.phone || "",
        pinCode: shippingAddress.pinCode || "",
        city: shippingAddress.city || "",
        state: shippingAddress.state || "",
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [autoFilled, setAutoFilled] = useState(false);

    // Sync local form state when context hydrates from localStorage
    useEffect(() => {
        const hasData = Object.values(shippingAddress).some((v) => v !== "");
        if (hasData) {
            setForm({
                fullName: shippingAddress.fullName || "",
                email: shippingAddress.email || "",
                phone: shippingAddress.phone || "",
                pinCode: shippingAddress.pinCode || "",
                city: shippingAddress.city || "",
                state: shippingAddress.state || "",
            });
        }
    }, [shippingAddress]);

    const handleChange = useCallback(
        (field, value) => {
            setForm((prev) => {
                const updated = { ...prev, [field]: value };

                // PIN code auto-fill
                if (field === "pinCode" && value.length === 6) {
                    const lookup = PIN_LOOKUP[value];
                    if (lookup) {
                        updated.city = lookup.city;
                        updated.state = lookup.state;
                        setAutoFilled(true);
                        // Clear city/state errors
                        setErrors((e) => ({ ...e, city: "", state: "" }));
                    }
                }
                if (field === "pinCode" && value.length < 6) {
                    setAutoFilled(false);
                }

                return updated;
            });

            // Clear error on change
            if (touched[field]) {
                const err = validators[field]?.(value) || "";
                setErrors((prev) => ({ ...prev, [field]: err }));
            }
        },
        [touched]
    );

    const handleBlur = (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        const err = validators[field]?.(form[field]) || "";
        setErrors((prev) => ({ ...prev, [field]: err }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields
        const newErrors = {};
        let hasError = false;
        Object.keys(validators).forEach((field) => {
            const err = validators[field](form[field]);
            if (err) hasError = true;
            newErrors[field] = err;
        });

        setErrors(newErrors);
        setTouched({
            fullName: true,
            email: true,
            phone: true,
            pinCode: true,
            city: true,
            state: true,
        });

        if (!hasError) {
            setAddress(form);
            nextStep();
        }
    };

    return (
        <div className="animate-slide-right" id="shipping-form-section">
            <h2 className="section-heading">
                <span className="section-heading-icon">📦</span>
                Shipping Address
            </h2>

            <div className="checkout-layout">
                <div className="checkout-main">
                    <form className="card" onSubmit={handleSubmit} noValidate id="shipping-form">
                        <div className="form-group">
                            <label className="form-label" htmlFor="fullName">
                                Full Name <span className="required">*</span>
                            </label>
                            <input
                                id="fullName"
                                type="text"
                                className={`form-input ${errors.fullName && touched.fullName ? "error" : ""}`}
                                placeholder="e.g. Priya Sharma"
                                value={form.fullName}
                                onChange={(e) => handleChange("fullName", e.target.value)}
                                onBlur={() => handleBlur("fullName")}
                                autoComplete="name"
                            />
                            {errors.fullName && touched.fullName && (
                                <div className="form-error">⚠️ {errors.fullName}</div>
                            )}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="email">
                                    Email <span className="required">*</span>
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className={`form-input ${errors.email && touched.email ? "error" : ""}`}
                                    placeholder="priya@example.com"
                                    value={form.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    onBlur={() => handleBlur("email")}
                                    autoComplete="email"
                                />
                                {errors.email && touched.email && (
                                    <div className="form-error">⚠️ {errors.email}</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="phone">
                                    Phone Number <span className="required">*</span>
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    className={`form-input ${errors.phone && touched.phone ? "error" : ""}`}
                                    placeholder="9876543210"
                                    value={form.phone}
                                    onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                                    onBlur={() => handleBlur("phone")}
                                    autoComplete="tel"
                                />
                                {errors.phone && touched.phone && (
                                    <div className="form-error">⚠️ {errors.phone}</div>
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="pinCode">
                                PIN Code <span className="required">*</span>
                                {autoFilled && (
                                    <span className="auto-fill-badge">✨ Auto-filled</span>
                                )}
                            </label>
                            <input
                                id="pinCode"
                                type="text"
                                className={`form-input ${errors.pinCode && touched.pinCode ? "error" : ""}`}
                                placeholder="e.g. 560001"
                                value={form.pinCode}
                                onChange={(e) => handleChange("pinCode", e.target.value.replace(/\D/g, "").slice(0, 6))}
                                onBlur={() => handleBlur("pinCode")}
                                autoComplete="postal-code"
                            />
                            {errors.pinCode && touched.pinCode && (
                                <div className="form-error">⚠️ {errors.pinCode}</div>
                            )}
                            <div className="form-hint">
                                Enter a 6-digit PIN code to auto-fill city & state
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="city">
                                    City <span className="required">*</span>
                                </label>
                                <input
                                    id="city"
                                    type="text"
                                    className={`form-input ${errors.city && touched.city ? "error" : ""}`}
                                    placeholder="Your city"
                                    value={form.city}
                                    onChange={(e) => handleChange("city", e.target.value)}
                                    onBlur={() => handleBlur("city")}
                                    autoComplete="address-level2"
                                />
                                {errors.city && touched.city && (
                                    <div className="form-error">⚠️ {errors.city}</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="state">
                                    State <span className="required">*</span>
                                </label>
                                <input
                                    id="state"
                                    type="text"
                                    className={`form-input ${errors.state && touched.state ? "error" : ""}`}
                                    placeholder="Your state"
                                    value={form.state}
                                    onChange={(e) => handleChange("state", e.target.value)}
                                    onBlur={() => handleBlur("state")}
                                    autoComplete="address-level1"
                                />
                                {errors.state && touched.state && (
                                    <div className="form-error">⚠️ {errors.state}</div>
                                )}
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={prevStep}
                                id="back-to-cart-btn"
                            >
                                ← Back
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary btn-large"
                                style={{ flex: 1 }}
                                id="continue-to-payment-btn"
                            >
                                Continue to Payment →
                            </button>
                        </div>
                    </form>
                </div>

                <div className="checkout-sidebar">
                    <div className="card">
                        <h3
                            className="section-heading"
                            style={{ fontSize: "1.15rem", marginBottom: "16px" }}
                        >
                            Order Summary
                        </h3>
                        <div className="order-summary" style={{ marginTop: 0 }}>
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
