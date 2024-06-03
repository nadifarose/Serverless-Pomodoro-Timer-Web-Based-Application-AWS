document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    const startButton = document.getElementById('start');
    const resetButton = document.getElementById('reset');
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');

    console.log('Elements:', startButton, resetButton, minutesDisplay, secondsDisplay);

    let timerInterval;
    let timeRemaining = 25 * 60; // 25 minutes in seconds
    let isRunning = false; // Track if the timer is running
    let isBreak = false; // Track if it's a break period
    const pomodoroDuration = 25 * 60; // 25 minutes in seconds
    const breakDuration = 5 * 60; // 5 minutes in seconds

    function startTimer() {
        if (isRunning) return; // Prevent multiple intervals

        isRunning = true;

        timerInterval = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
                updateDisplay();
            } else {
                clearInterval(timerInterval);
                isRunning = false;

                if (!isBreak) {
                    alert('Pomodoro session completed! Take a break.');
                    isBreak = true; // Toggle to break
                    timeRemaining = breakDuration;
                } else {
                    alert('Break session completed! Time to start another Pomodoro session.');
                    isBreak = false; // Toggle to work session
                    timeRemaining = pomodoroDuration;
                }

                // Automatically start the next session
                startTimer();
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        isBreak = false;
        timeRemaining = pomodoroDuration;
        updateDisplay();
    }

    function updateDisplay() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }

    startButton.addEventListener('click', () => {
        console.log('Start button clicked');
        startTimer();
    });

    resetButton.addEventListener('click', () => {
        console.log('Reset button clicked');
        resetTimer();
    });

    updateDisplay();
});
