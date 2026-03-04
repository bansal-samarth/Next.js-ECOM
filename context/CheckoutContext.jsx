"use client";

import { createContext, useContext, useReducer, useCallback, useEffect, useRef } from "react";

const CheckoutContext = createContext(null);

const STORAGE_KEY = "ecoyaan-checkout-state";

const initialState = {
    cartItems: [],
    savedItems: [],
    wishlist: [],
    shippingFee: 50,
    discount: 0,
    shippingAddress: {
        fullName: "",
        email: "",
        phone: "",
        pinCode: "",
        city: "",
        state: "",
    },
    currentStep: 1,
    orderPlaced: false,
    paymentMethod: "upi",
};

function loadPersistedState() {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        // Merge with initialState to ensure new fields are present
        return { ...initialState, ...parsed };
    } catch {
        return null;
    }
}

function persistState(state) {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        // Storage full or unavailable — silently ignore
    }
}

function checkoutReducer(state, action) {
    switch (action.type) {
        case "HYDRATE":
            return { ...state, ...action.payload };

        case "SET_CART":
            return {
                ...state,
                cartItems: action.payload.cartItems,
                shippingFee: action.payload.shipping_fee,
                discount: action.payload.discount_applied,
            };

        case "INCREMENT_QTY":
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item.product_id === action.payload
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };

        case "DECREMENT_QTY":
            return {
                ...state,
                cartItems: state.cartItems
                    .map((item) =>
                        item.product_id === action.payload
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    )
                    .filter((item) => item.quantity > 0),
            };

        case "REMOVE_ITEM":
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (item) => item.product_id !== action.payload
                ),
            };

        case "SAVE_FOR_LATER": {
            const item = state.cartItems.find(
                (i) => i.product_id === action.payload
            );
            if (!item) return state;
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (i) => i.product_id !== action.payload
                ),
                savedItems: [...state.savedItems, { ...item }],
            };
        }

        case "MOVE_TO_CART": {
            const item = state.savedItems.find(
                (i) => i.product_id === action.payload
            );
            if (!item) return state;
            const existing = state.cartItems.find(
                (i) => i.product_id === action.payload
            );
            return {
                ...state,
                savedItems: state.savedItems.filter(
                    (i) => i.product_id !== action.payload
                ),
                cartItems: existing
                    ? state.cartItems.map((i) =>
                        i.product_id === action.payload
                            ? { ...i, quantity: i.quantity + item.quantity }
                            : i
                    )
                    : [...state.cartItems, item],
            };
        }

        case "REMOVE_SAVED":
            return {
                ...state,
                savedItems: state.savedItems.filter(
                    (i) => i.product_id !== action.payload
                ),
            };

        case "TOGGLE_WISHLIST": {
            const id = action.payload;
            const exists = state.wishlist.includes(id);
            return {
                ...state,
                wishlist: exists
                    ? state.wishlist.filter((wid) => wid !== id)
                    : [...state.wishlist, id],
            };
        }

        case "SET_ADDRESS":
            return {
                ...state,
                shippingAddress: { ...state.shippingAddress, ...action.payload },
            };
        case "SET_PAYMENT_METHOD":
            return { ...state, paymentMethod: action.payload };
        case "NEXT_STEP":
            return { ...state, currentStep: Math.min(state.currentStep + 1, 3) };
        case "PREV_STEP":
            return { ...state, currentStep: Math.max(state.currentStep - 1, 1) };
        case "GO_TO_STEP":
            return { ...state, currentStep: action.payload };
        case "PLACE_ORDER":
            return { ...state, orderPlaced: true };
        case "RESET":
            return { ...initialState };
        default:
            return state;
    }
}

export function CheckoutProvider({ children }) {
    const [state, dispatch] = useReducer(checkoutReducer, initialState);
    const hydrated = useRef(false);

    // Hydrate from localStorage on mount
    useEffect(() => {
        const persisted = loadPersistedState();
        if (persisted) {
            dispatch({ type: "HYDRATE", payload: persisted });
        }
        hydrated.current = true;
    }, []);

    // Persist to localStorage on every state change (after hydration)
    useEffect(() => {
        if (hydrated.current) {
            persistState(state);
        }
    }, [state]);

    const setCart = useCallback(
        (data) => dispatch({ type: "SET_CART", payload: data }),
        []
    );
    const incrementQty = useCallback(
        (id) => dispatch({ type: "INCREMENT_QTY", payload: id }),
        []
    );
    const decrementQty = useCallback(
        (id) => dispatch({ type: "DECREMENT_QTY", payload: id }),
        []
    );
    const removeItem = useCallback(
        (id) => dispatch({ type: "REMOVE_ITEM", payload: id }),
        []
    );
    const saveForLater = useCallback(
        (id) => dispatch({ type: "SAVE_FOR_LATER", payload: id }),
        []
    );
    const moveToCart = useCallback(
        (id) => dispatch({ type: "MOVE_TO_CART", payload: id }),
        []
    );
    const removeSaved = useCallback(
        (id) => dispatch({ type: "REMOVE_SAVED", payload: id }),
        []
    );
    const toggleWishlist = useCallback(
        (id) => dispatch({ type: "TOGGLE_WISHLIST", payload: id }),
        []
    );
    const setAddress = useCallback(
        (data) => dispatch({ type: "SET_ADDRESS", payload: data }),
        []
    );
    const setPaymentMethod = useCallback(
        (method) => dispatch({ type: "SET_PAYMENT_METHOD", payload: method }),
        []
    );
    const nextStep = useCallback(() => dispatch({ type: "NEXT_STEP" }), []);
    const prevStep = useCallback(() => dispatch({ type: "PREV_STEP" }), []);
    const goToStep = useCallback(
        (step) => dispatch({ type: "GO_TO_STEP", payload: step }),
        []
    );
    const placeOrder = useCallback(() => dispatch({ type: "PLACE_ORDER" }), []);
    const resetCheckout = useCallback(() => {
        dispatch({ type: "RESET" });
        if (typeof window !== "undefined") {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    const subtotal = state.cartItems.reduce(
        (sum, item) => sum + item.product_price * item.quantity,
        0
    );
    const grandTotal = subtotal + state.shippingFee - state.discount;
    const totalCartCount = state.cartItems.reduce((s, i) => s + i.quantity, 0);

    return (
        <CheckoutContext.Provider
            value={{
                ...state,
                subtotal,
                grandTotal,
                totalCartCount,
                setCart,
                incrementQty,
                decrementQty,
                removeItem,
                saveForLater,
                moveToCart,
                removeSaved,
                toggleWishlist,
                setAddress,
                setPaymentMethod,
                nextStep,
                prevStep,
                goToStep,
                placeOrder,
                resetCheckout,
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
}

export function useCheckout() {
    const context = useContext(CheckoutContext);
    if (!context) {
        throw new Error("useCheckout must be used within a CheckoutProvider");
    }
    return context;
}
