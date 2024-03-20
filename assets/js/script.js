// ELEMENTS

const buttons = document.querySelectorAll("button[data-sec]");
const customInput = document.querySelector("#customTime");
const currentTime = document.querySelector("#currentTime");
const audio = document.querySelector("audio");
const progressBar = document.querySelector("#progress-bar circle:nth-child(2)");
const timerBox = document.querySelector(".timer");
const clearBtn = document.querySelector("#clear");

let countdown;

// FUNCTIONS

function setTimer(seconds) {
    clearTimer();

    const now = Date.now();
    const end = now + seconds * 1000;

    setTimeout(() => timerBox.classList.add("active"), 10);
    updateView(seconds, seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((end - Date.now()) / 1000);

        if (secondsLeft < 1) {
            audio.play();
            return clearTimer();
        }

        updateView(secondsLeft, seconds);
    }, 1000);
}

function updateView(secondsLeft, secondsEnd) {
    let hours = Math.floor((secondsLeft / 60) / 60);
    let mins = Math.floor((secondsLeft / 60) % 60);
    let secs = secondsLeft % 60;

    currentTime.textContent = `${("0" + hours).slice(-2)}:${("0" + mins).slice(-2)}:${("0" + secs).slice(-2)}`;
    progressBar.style.strokeDashoffset = `calc(848 - (848 * ${(secondsLeft * 100) / secondsEnd})/100)`;
}

function clearTimer() {
    clearInterval(countdown);
    timerBox.classList.remove("active");
    currentTime.textContent = "00:00:00";
    progressBar.style.strokeDashoffset = "848";
}


// EVENTS

buttons.forEach(button => button.addEventListener('click', (e) => {
    setTimer(Number(e.target.getAttribute("data-sec")));
}))

customInput.addEventListener('keyup', (e) => {
    if (!e.target.value || e.target.value < 1) return;

    let value = e.target.value;

    if (e.target.value > 6000) {
        e.target.value = 6000;
        value = 6000;
    }

    setTimer(value * 60);
});

clearBtn.addEventListener('click', clearTimer);