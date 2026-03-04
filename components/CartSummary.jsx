"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useCheckout } from "@/context/CheckoutContext";
import TrustBadges from "./TrustBadges";

export default function CartSummary({ initialCartData }) {
    const {
        cartItems,
        savedItems,
        wishlist,
        shippingFee,
        discount,
        setCart,
        goToStep,
        incrementQty,
        decrementQty,
        removeItem,
        saveForLater,
        moveToCart,
        removeSaved,
        toggleWishlist,
    } = useCheckout();

    // Initialize cart from SSR data after first render
    useEffect(() => {
        if (cartItems.length === 0 && initialCartData) {
            setCart(initialCartData);
        }
    }, [initialCartData, setCart]); // eslint-disable-line react-hooks/exhaustive-deps

    const items =
        cartItems.length > 0 ? cartItems : initialCartData?.cartItems || [];
    const fee =
        cartItems.length > 0 ? shippingFee : initialCartData?.shipping_fee || 0;
    const disc =
        cartItems.length > 0 ? discount : initialCartData?.discount_applied || 0;
    const sub = items.reduce(
        (sum, item) => sum + item.product_price * item.quantity,
        0
    );
    const total = sub + fee - disc;

    const handleProceed = () => {
        if (cartItems.length === 0 && initialCartData) {
            setCart(initialCartData);
        }
        goToStep(2);
    };

    const isWishlisted = (id) => wishlist.includes(id);

    return (
        <div className="animate-fade-in-up" id="cart-summary-section">
            <h2 className="section-heading">
                <span className="section-heading-icon">🛒</span>
                Your Cart
                {items.length > 0 && (
                    <span className="cart-count-badge">{items.length} items</span>
                )}
            </h2>

            <div className="checkout-layout">
                <div className="checkout-main">
                    {/* Cart Items */}
                    <div className="card">
                        {items.length === 0 ? (
                            <div className="empty-cart" id="empty-cart">
                                <span style={{ fontSize: "3rem" }}>🛒</span>
                                <h3>Your cart is empty</h3>
                                <p>Looks like you haven&apos;t added anything yet.</p>
                            </div>
                        ) : (
                            <div className="stagger-children">
                                {items.map((item) => (
                                    <div
                                        className="cart-item"
                                        key={item.product_id}
                                        id={`cart-item-${item.product_id}`}
                                    >
                                        <div className="cart-item-image">
                                            <Image
                                                src={item.image}
                                                alt={item.product_name}
                                                width={100}
                                                height={100}
                                                priority
                                            />
                                        </div>
                                        <div className="cart-item-details">
                                            <div className="cart-item-top-row">
                                                <h3 className="cart-item-name">{item.product_name}</h3>
                                                <button
                                                    className={`wishlist-btn ${isWishlisted(item.product_id) ? "active" : ""}`}
                                                    onClick={() => toggleWishlist(item.product_id)}
                                                    aria-label={
                                                        isWishlisted(item.product_id)
                                                            ? "Remove from wishlist"
                                                            : "Add to wishlist"
                                                    }
                                                    id={`wishlist-btn-${item.product_id}`}
                                                    title={
                                                        isWishlisted(item.product_id)
                                                            ? "Remove from wishlist"
                                                            : "Add to wishlist"
                                                    }
                                                >
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        width="20"
                                                        height="20"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        fill={
                                                            isWishlisted(item.product_id)
                                                                ? "currentColor"
                                                                : "none"
                                                        }
                                                    >
                                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <span className="cart-item-price">
                                                ₹{item.product_price.toLocaleString("en-IN")}
                                            </span>

                                            {/* Quantity Controls */}
                                            <div className="qty-controls" id={`qty-controls-${item.product_id}`}>
                                                <button
                                                    className="qty-btn"
                                                    onClick={() => decrementQty(item.product_id)}
                                                    aria-label="Decrease quantity"
                                                    id={`qty-minus-${item.product_id}`}
                                                >
                                                    −
                                                </button>
                                                <span className="qty-value">{item.quantity}</span>
                                                <button
                                                    className="qty-btn"
                                                    onClick={() => incrementQty(item.product_id)}
                                                    aria-label="Increase quantity"
                                                    id={`qty-plus-${item.product_id}`}
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Item Actions */}
                                            <div className="cart-item-actions">
                                                <button
                                                    className="item-action-btn save-later-btn"
                                                    onClick={() => saveForLater(item.product_id)}
                                                    id={`save-later-${item.product_id}`}
                                                >
                                                    🔖 Save for Later
                                                </button>
                                                <button
                                                    className="item-action-btn remove-btn"
                                                    onClick={() => removeItem(item.product_id)}
                                                    id={`remove-${item.product_id}`}
                                                >
                                                    🗑️ Remove
                                                </button>
                                            </div>
                                        </div>
                                        <div className="cart-item-total">
                                            ₹
                                            {(item.product_price * item.quantity).toLocaleString(
                                                "en-IN"
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Saved for Later Section */}
                    {savedItems.length > 0 && (
                        <div className="card saved-section animate-fade-in-up" id="saved-for-later-section">
                            <h3 className="section-heading" style={{ fontSize: "1.15rem", marginBottom: "16px" }}>
                                <span className="section-heading-icon">🔖</span>
                                Saved for Later
                                <span className="cart-count-badge">{savedItems.length}</span>
                            </h3>
                            {savedItems.map((item) => (
                                <div
                                    className="saved-item"
                                    key={item.product_id}
                                    id={`saved-item-${item.product_id}`}
                                >
                                    <div className="saved-item-image">
                                        <Image
                                            src={item.image}
                                            alt={item.product_name}
                                            width={64}
                                            height={64}
                                        />
                                    </div>
                                    <div className="saved-item-details">
                                        <h4 className="saved-item-name">{item.product_name}</h4>
                                        <span className="saved-item-price">
                                            ₹{item.product_price.toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                    <div className="saved-item-actions">
                                        <button
                                            className="btn btn-primary"
                                            style={{ padding: "8px 16px", fontSize: "0.85rem" }}
                                            onClick={() => moveToCart(item.product_id)}
                                            id={`move-to-cart-${item.product_id}`}
                                        >
                                            Move to Cart
                                        </button>
                                        <button
                                            className="item-action-btn remove-btn"
                                            onClick={() => removeSaved(item.product_id)}
                                            id={`remove-saved-${item.product_id}`}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
                                <span>
                                    Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)
                                </span>
                                <span>₹{sub.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="summary-row shipping">
                                <span className="label">
                                    Shipping
                                    {fee === 0 && <span className="free-badge">Free</span>}
                                </span>
                                <span>{fee === 0 ? "FREE" : `₹${fee}`}</span>
                            </div>
                            {disc > 0 && (
                                <div className="summary-row discount">
                                    <span>Discount</span>
                                    <span>-₹{disc}</span>
                                </div>
                            )}
                            <div className="summary-row total">
                                <span>Total</span>
                                <span className="price">
                                    ₹{total.toLocaleString("en-IN")}
                                </span>
                            </div>
                        </div>
                        <button
                            className="btn btn-primary btn-full btn-large"
                            onClick={handleProceed}
                            style={{ marginTop: "20px" }}
                            id="proceed-to-checkout-btn"
                            disabled={items.length === 0}
                        >
                            Proceed to Checkout
                            <span style={{ fontSize: "1.2rem" }}>→</span>
                        </button>
                    </div>
                    <TrustBadges />
                </div>
            </div>
        </div>
    );
}
