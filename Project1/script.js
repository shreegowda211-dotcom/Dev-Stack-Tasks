const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const memoryValueEl = document.getElementById("memoryValue");

let expression = "";
let memory = 0;

const updateDisplay = () => {
    display.value = expression || "0";
};

const updateMemory = () => {
    memoryValueEl.textContent = memory.toString();
};

const evaluateExpression = (expr) => {
    const sanitized = expr.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");
    return Function(`"use strict"; return (${sanitized})`)();
};

const handleMemory = (type) => {
    if (!expression) return;

    try {
        const value = Number(evaluateExpression(expression));
        if (Number.isNaN(value)) throw new Error("Invalid");

        if (type === "M+") memory += value;
        if (type === "M-") memory -= value;
        updateMemory();
    } catch {
        display.value = "Invalid Input";
        expression = "";
    }
};

const handleAction = (value) => {
    if (value === "AC" || value === "C") {
        expression = "";
        updateDisplay();
        return;
    }

    if (value === "R") {
        expression = expression.slice(0, -1);
        updateDisplay();
        return;
    }

    if (["M+", "M-"].includes(value)) {
        handleMemory(value);
        return;
    }

    if (value === "MR") {
        expression += memory.toString();
        updateDisplay();
        return;
    }

    if (value === "MC") {
        memory = 0;
        updateMemory();
        return;
    }

    if (value === "=") {
        try {
            const result = evaluateExpression(expression);
            expression = result.toString();
            updateDisplay();
        } catch {
            display.value = "Invalid Input";
            expression = "";
        }
        return;
    }

    expression += value;
    updateDisplay();
};

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        handleAction(button.textContent.trim());
    });
});

window.addEventListener("keydown", (event) => {
    const allowedKeys = "0123456789.+-*/%";

    if (allowedKeys.includes(event.key)) {
        event.preventDefault();
        expression += event.key;
        updateDisplay();
        return;
    }

    if (event.key === "Backspace") {
        event.preventDefault();
        expression = expression.slice(0, -1);
        updateDisplay();
        return;
    }

    if (event.key === "Enter") {
        event.preventDefault();
        handleAction("=");
        return;
    }

    if (event.key.toLowerCase() === "c") {
        event.preventDefault();
        handleAction("AC");
        return;
    }
});

updateDisplay();
updateMemory();
