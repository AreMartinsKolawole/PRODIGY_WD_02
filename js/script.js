// Variables to store time values
let startTime, updatedTime, difference, tInterval;
let savedTime = 0;
let running = false;
let lapCounter = 0;

// References to the HTML elements
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsContainer = document.getElementById("laps");

// Start button event
startButton.addEventListener("click", function() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(getShowTime, 10); // Update every 10 milliseconds
        running = true;
        startButton.disabled = true; // Disable start button while running
    }
});

// Pause button event
pauseButton.addEventListener("click", function() {
    if (running) {
        clearInterval(tInterval);
        savedTime = new Date().getTime() - startTime;
        running = false;
        startButton.disabled = false; // Enable start button after pausing
    }
});

// Reset button event
resetButton.addEventListener("click", function() {
    clearInterval(tInterval);
    savedTime = 0;
    running = false;
    lapCounter = 0;
    timerDisplay.innerHTML = "00:00:00.00";
    lapsContainer.innerHTML = ""; // Clear laps
    startButton.disabled = false;
});

// Lap button event
lapButton.addEventListener("click", function() {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement("div");
        lapTime.innerHTML = `Lap ${lapCounter}: ${timerDisplay.innerHTML}`;
        lapsContainer.appendChild(lapTime); // Add the lap time to the laps container
    }
});

// Function to update the stopwatch display
function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor(difference / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    timerDisplay.innerHTML = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
