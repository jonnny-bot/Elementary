document.addEventListener('DOMContentLoaded', function() {
    // Get mood entries from localStorage
    const moodEntries = JSON.parse(localStorage.getItem('moodEntries')) || [];
    
    // Calculate mood statistics
    const moodCounts = calculateMoodCounts(moodEntries);
    displayMoodStats(moodCounts);
    createMoodChart(moodCounts);
    displayTimeStats(moodEntries);
});

function calculateMoodCounts(entries) {
    return entries.reduce((acc, entry) => {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1;
        return acc;
    }, {});
}

function displayMoodStats(moodCounts) {
    const moodStats = document.getElementById('moodStats');
    const moods = [
        { emoji: '😄', label: 'Very Happy' },
        { emoji: '😊', label: 'Happy' },
        { emoji: '😐', label: 'Neutral' },
        { emoji: '😕', label: 'Sad' },
        { emoji: '😞', label: 'Very Sad' }
    ];

    moods.forEach(mood => {
        const count = moodCounts[mood.emoji] || 0;
        const moodItem = document.createElement('div');
        moodItem.className = 'mood-item';
        moodItem.innerHTML = `
            <div class="mood-emoji">${mood.emoji}</div>
            <div class="mood-number">${count}</div>
            <div class="mood-label">${mood.label}</div>
        `;
        moodStats.appendChild(moodItem);
    });
}

function createMoodChart(moodCounts) {
    const ctx = document.getElementById('moodChart').getContext('2d');
    
    const labels = ['Very Happy', 'Happy', 'Neutral', 'Sad', 'Very Sad'];
    const emojis = ['😄', '😊', '😐', '😕', '😞'];
    const data = emojis.map(emoji => moodCounts[emoji] || 0);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Mood Distribution',
                data: data,
                backgroundColor: [
                    '#FF4D00',
                    '#FF6B33',
                    '#FF8966',
                    '#FFA799',
                    '#FFC5CC'
                ],
                borderColor: 'rgba(255, 255, 255, 0.8)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Count: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function displayTimeStats(entries) {
    const timeStats = document.getElementById('timeStats');
    
    // Calculate time-based statistics
    const total = entries.length;
    const lastWeekEntries = entries.filter(entry => {
        const entryDate = new Date(entry.date);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return entryDate >= weekAgo;
    });

    // Get most common mood
    const moodCounts = calculateMoodCounts(entries);
    const mostCommonMood = Object.entries(moodCounts).reduce((a, b) => 
        (a[1] > b[1] ? a : b))[0];

    // Create stat cards
    const stats = [
        {
            label: 'Total Entries',
            value: total
        },
        {
            label: 'Entries This Week',
            value: lastWeekEntries.length
        },
        {
            label: 'Most Common Mood',
            value: mostCommonMood
        }
    ];

    stats.forEach(stat => {
        const statCard = document.createElement('div');
        statCard.className = 'stat-card';
        statCard.innerHTML = `
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
        `;
        timeStats.appendChild(statCard);
    });
}