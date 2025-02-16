document.addEventListener('DOMContentLoaded', function() {
    const timerDisplay = document.querySelector('.timer-display');
    const startButton = document.querySelector('.start-button');
    const resetButton = document.querySelector('.reset-button');
    const dailyFocus = document.querySelector('.daily-focus');
    const totalSessions = document.querySelector('.total-sessions');

    let timeLeft = 25 * 60;
    let timerId = null;
    let isRunning = false;
    let sessionStartTime = null;

    updateSessionStats();

    startButton.addEventListener('click', function() {
        if (!isRunning) {
            // Starting timer
            isRunning = true;
            sessionStartTime = Date.now();
            startButton.textContent = 'Pause';
            startButton.classList.add('pause');
            
            timerId = setInterval(() => {
                timeLeft--;
                updateDisplay();
                
                if (timeLeft <= 0) {
                    completeSession();
                }
            }, 1000);
        } else {
            clearInterval(timerId);
            isRunning = false;
            startButton.textContent = 'Start';
            startButton.classList.remove('pause');
        }
    });

    resetButton.addEventListener('click', function() {
        clearInterval(timerId);
        isRunning = false;
        timeLeft = 25 * 60;
        startButton.textContent = 'Start';
        startButton.classList.remove('pause');
        updateDisplay();
    });

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function completeSession() {
        clearInterval(timerId);
        isRunning = false;
        
        const sessions = JSON.parse(localStorage.getItem('focusSessions')) || [];
        sessions.push({
            date: new Date().toISOString(),
            duration: 25 * 60, 
            completed: true
        });
        localStorage.setItem('focusSessions', JSON.stringify(sessions));
        
        timeLeft = 25 * 60;
        startButton.textContent = 'Start';
        startButton.classList.remove('pause');
        updateDisplay();
        updateSessionStats();
    }

    function updateSessionStats() {
        const sessions = JSON.parse(localStorage.getItem('focusSessions')) || [];
        
        const today = new Date().toDateString();
        const todaysSessions = sessions.filter(session => 
            new Date(session.date).toDateString() === today
        );
        const todaysMinutes = todaysSessions.reduce((acc, session) => 
            acc + (session.duration / 60), 0
        );
        
        dailyFocus.textContent = Math.round(todaysMinutes);
        totalSessions.textContent = sessions.length;
    }
});
