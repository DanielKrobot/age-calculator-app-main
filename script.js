const button = document.querySelector("button");
const day = document.querySelector(".day-container input");
const month = document.querySelector(".month-container input");
const year = document.querySelector(".year-container input");
const days = document.querySelector(".days");
const months = document.querySelector(".months");
const years = document.querySelector(".years");
const dayError = document.querySelector(".day-container .error");
const monthError = document.querySelector(".month-container .error");
const yearError = document.querySelector(".year-container .error");
const dayConatainer = document.querySelector(".day-container");
const monthConatainer = document.querySelector(".month-container");
const yearConatainer = document.querySelector(".year-container");
const containers = [dayConatainer, monthConatainer, yearConatainer];
const spans = document.querySelectorAll("span");
let animating = false;

function restartStyles() {
    containers.forEach(item => {
        item.querySelector("h1").style.color = "hsl(0, 1%, 44%)";
        item.querySelector("input").style.borderColor = "hsl(0, 0%, 86%)";
        item.querySelector("p").innerHTML = "";
    });
};

function showError(container, message) {
    container.querySelector("h1").style.color = "red";
    container.querySelector("input").style.borderColor = "red";
    container.querySelector("p").innerHTML = message;
};

function showResult(result) {
    animating = true;
    spans.forEach(item => {
        item.classList.add("fade");
    });
    setTimeout(() => {
        days.innerHTML = result.getDate();
        months.innerHTML = result.getMonth();
        years.innerHTML = result.getFullYear() - 1970;    
    }, 1000)
    .then(setTimeout(() => {spans.forEach(item => {
        item.classList.remove("fade");
        animating = false;
    });}, 2000));
};

button.addEventListener("click", () => {
    if (animating) return;
    const daysPerMonth = [31, year.value % 4 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    restartStyles();
    let isValidDate = true;
    const dateToday = new Date()
    const dateThen = new Date(year.value, month.value - 1, day.value)
    const result = new Date(dateToday - dateThen);
    if (dateToday - dateThen < 0) {
        isValidDate = false;
        showError(yearConatainer, "Must be in the past");
    };

    if (year.value < 100) {
        isValidDate = false;
        showError(yearConatainer, "Can't calculate below 100");
    };
    
    if (!(day.value <= daysPerMonth[month.value - 1] && day.value > 0)) {
        isValidDate = false;
        showError(dayConatainer, "Must be a valid day");
    };

    if (month.value < 1 || month.value > 12) {
        showError(monthConatainer, "Must be a valid month")
    };

    containers.forEach(item => {
        if (item.querySelector("input").value === "") {
            showError(item, "This field is required");
            isValidDate = false;
        };
    });

    if (isValidDate) {
        showResult(result);
    };
});





