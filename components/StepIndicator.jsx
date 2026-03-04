"use client";

const steps = [
    { num: 1, label: "Cart" },
    { num: 2, label: "Shipping" },
    { num: 3, label: "Payment" },
];

export default function StepIndicator({ currentStep }) {
    return (
        <div className="step-indicator" id="step-indicator">
            {steps.map((step, i) => (
                <div key={step.num} style={{ display: "flex", alignItems: "center" }}>
                    <div className="step-item">
                        <div
                            className={`step-circle ${currentStep === step.num
                                    ? "active"
                                    : currentStep > step.num
                                        ? "completed"
                                        : ""
                                }`}
                            id={`step-circle-${step.num}`}
                        >
                            {currentStep > step.num ? "✓" : step.num}
                        </div>
                        <span
                            className={`step-label ${currentStep === step.num
                                    ? "active"
                                    : currentStep > step.num
                                        ? "completed"
                                        : ""
                                }`}
                        >
                            {step.label}
                        </span>
                    </div>
                    {i < steps.length - 1 && (
                        <div
                            className={`step-connector ${currentStep > step.num ? "completed" : ""
                                }`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
