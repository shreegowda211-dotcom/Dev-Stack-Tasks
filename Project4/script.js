const dob = document.getElementById("dob");
const calculateBtn = document.getElementById("calculateBtn");
const result = document.getElementById("result");

const ageCategory = (years) => {
    if (years < 18) return "Emerging talent with a lifetime ahead.";
    if (years < 30) return "Youthful momentum powering future goals.";
    if (years < 50) return "Established strength with smart experience.";
    return "Seasoned wisdom and steady confidence.";
};

const formatDate = (date) => {
    return date.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

calculateBtn.addEventListener("click", () => {
    if (!dob.value) {
        result.textContent = "Please select your date of birth.";
        return;
    }

    const birthDate = new Date(dob.value);
    const today = new Date();
    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const previousMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        days += previousMonthDays;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const daysLived = Math.floor((today - birthDate) / millisecondsPerDay);

    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today || nextBirthday.toDateString() === today.toDateString()) {
        nextBirthday = new Date(today.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
    }

    const daysUntilBirthday = Math.ceil((nextBirthday - today) / millisecondsPerDay);
    const nextBirthdayLabel = daysUntilBirthday === 0 ? "Today is your birthday!" : `${daysUntilBirthday} day${daysUntilBirthday === 1 ? "" : "s"} until next birthday`;

    result.innerHTML = `
        <p><strong>Your Age:</strong></p>
        <p>${years} Years, ${months} Months, ${days} Days</p>
        <p class="result-line"><strong>Days Lived:</strong> ${daysLived} days of life experience</p>
        <p class="result-line"><strong>Next Birthday:</strong> ${formatDate(nextBirthday)} — ${nextBirthdayLabel}</p>
        <div class="result-note">${ageCategory(years)}</div>
    `;
});
