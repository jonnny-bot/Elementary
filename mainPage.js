document.addEventListener('DOMContentLoaded', function() {
    const weekRange = document.getElementById('week-range');
    const weekDates = document.getElementById('weekDates');
    const prevWeekButton = document.getElementById('prev-week');
    const nextWeekButton = document.getElementById('next-week');
  
    let currentDate = new Date(); // Start with today's date
  
    // Function to render the current week
    function renderWeek() {
      // Clear the existing dates
      weekDates.innerHTML = '';
  
      // Calculate the start of the week (Sunday)
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  
      // Calculate the end of the week (Saturday)
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
  
      // Display the week range (e.g., "Oct 15 - Oct 21, 2023")
      const startDate = startOfWeek.toLocaleDateString('default', { month: 'short', day: 'numeric' });
      const endDate = endOfWeek.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' });
      weekRange.textContent = `${startDate} - ${endDate}`;
  
      // Render the dates for the week
      for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
  
        const cell = document.createElement('td');
        cell.textContent = day.getDate();
        weekDates.appendChild(cell);
      }
    }
  
    // Navigation: Previous Week
    prevWeekButton.addEventListener('click', function() {
      currentDate.setDate(currentDate.getDate() - 7); // Move back by 7 days
      renderWeek();
    });
  
    // Navigation: Next Week
    nextWeekButton.addEventListener('click', function() {
      currentDate.setDate(currentDate.getDate() + 7); // Move forward by 7 days
      renderWeek();
    });
  
    // Initial render
    renderWeek();
  });
