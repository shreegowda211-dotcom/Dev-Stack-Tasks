const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let expression = "";

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.textContent.trim();

        if (value === "C") {
            expression = "";
            display.value = "";
        } else if (value === "R") {
            expression = expression.slice(0, -1);
            display.value = expression;
        } else if (value === "=") {
            try {
                expression = eval(expression).toString();
                display.value = expression;
            } catch {
                display.value = "Invalid Input";
                expression = "";
            }
        } else {
            expression += value;
            display.value = expression;
        }
    });
});