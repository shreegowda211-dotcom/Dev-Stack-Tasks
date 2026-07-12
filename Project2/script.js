const password = document.getElementById("password");
const length = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const statusText = document.getElementById("statusText");
const strengthBar = document.getElementById("strengthBar");
const strengthLabel = document.getElementById("strengthLabel");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbol");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXZ";
const lowerChars = "abcdefghijklmnopqrstuvwxz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*-_< >";

function updateStrength(value) {
    let score = 0;

    if (value.length >= 12) score += 35;
    if (value.length >= 16) score += 20;
    if (/[A-Z]/.test(value)) score += 15;
    if (/[a-z]/.test(value)) score += 15;
    if (/\d/.test(value)) score += 10;
    if (/[^A-Za-z0-9]/.test(value)) score += 15;

    if (score < 40) {
        strengthBar.style.width = "35%";
        strengthBar.style.background = "linear-gradient(90deg, #ff4d6d, #ff7b9c)";
        strengthLabel.textContent = "Strength: Weak";
    } else if (score < 70) {
        strengthBar.style.width = "70%";
        strengthBar.style.background = "linear-gradient(90deg, #ff7b9c, #ffb3c6)";
        strengthLabel.textContent = "Strength: Medium";
    } else {
        strengthBar.style.width = "100%";
        strengthBar.style.background = "linear-gradient(90deg, #ff2f92, #ff5fa3)";
        strengthLabel.textContent = "Strength: Strong";
    }
}

function setStatus(message, type = "info") {
    statusText.textContent = message;
    statusText.style.color = type === "error" ? "#ff8fa3" : type === "success" ? "#ffd6e7" : "#f7b2cf";
}

length.addEventListener("input", () => {
    lengthValue.textContent = length.value;
});

generateBtn.addEventListener("click", () => {
    let characters = "";

    if (uppercase.checked) characters += upperChars;
    if (lowercase.checked) characters += lowerChars;
    if (numbers.checked) characters += numberChars;
    if (symbols.checked) characters += symbolChars;

    if (characters === "") {
        setStatus("Please select at least one character type.", "error");
        return;
    }

    const passwordLength = Number(length.value);
    if (Number.isNaN(passwordLength) || passwordLength < 4) {
        setStatus("Please enter a valid password length of at least 4.", "error");
        return;
    }

    let generatedPassword = "";

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        generatedPassword += characters[randomIndex];
    }

    password.value = generatedPassword;
    updateStrength(generatedPassword);
    setStatus("Password generated successfully.", "success");
});

copyBtn.addEventListener("click", async () => {
    if (password.value === "") {
        setStatus("Generate a password first.", "error");
        return;
    }

    try {
        await navigator.clipboard.writeText(password.value);
        copyBtn.textContent = "Copied";
        setStatus("Password copied to clipboard.", "success");
        setTimeout(() => {
            copyBtn.textContent = "Copy";
        }, 1500);
    } catch (error) {
        password.select();
        document.execCommand("copy");
        copyBtn.textContent = "Copied";
        setStatus("Password copied to clipboard.", "success");
        setTimeout(() => {
            copyBtn.textContent = "Copy";
        }, 1500);
    }
});