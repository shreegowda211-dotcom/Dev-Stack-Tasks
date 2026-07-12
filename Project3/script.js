const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");
const bestLapDisplay = document.getElementById("bestLap");
const lapCountDisplay = document.getElementById("lapCount");

let totalSeconds = 0;
let timer = null;
let running = false;
let lastLapTime = 0;
let lapCount = 0;
let bestLapSeconds = null;

function getTimeParts(total) {
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;
    return { hours, minutes, seconds };
}

function formatTime(total) {
    const { hours, minutes, seconds } = getTimeParts(total);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateDisplay() {
    display.textContent = formatTime(totalSeconds);
}

function updatePremiumStats() {
    bestLapDisplay.textContent = bestLapSeconds === null ? "--:--:--" : formatTime(bestLapSeconds);
    lapCountDisplay.textContent = lapCount;
}

function startTimer() {
    totalSeconds += 1;
    updateDisplay();
}

startBtn.addEventListener("click", () => {
    if (!running) {
        timer = setInterval(startTimer, 1000);
        running = true;
    }
});

pauseBtn.addEventListener("click", () => {
    if (running) {
        clearInterval(timer);
        running = false;
    }
});

resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    running = false;
    totalSeconds = 0;
    lastLapTime = 0;
    lapCount = 0;
    bestLapSeconds = null;
    laps.innerHTML = "";
    updateDisplay();
    updatePremiumStats();
});

lapBtn.addEventListener("click", () => {
    if (!running) return;

    const lapSeconds = totalSeconds - lastLapTime;
    lastLapTime = totalSeconds;
    lapCount += 1;

    if (bestLapSeconds === null || lapSeconds < bestLapSeconds) {
        bestLapSeconds = lapSeconds;
    }

    const li = document.createElement("li");
    li.textContent = `Lap ${lapCount}: ${formatTime(lapSeconds)} — Total ${formatTime(totalSeconds)}`;
    laps.appendChild(li);
    updatePremiumStats();
});

updateDisplay();
updatePremiumStats();
