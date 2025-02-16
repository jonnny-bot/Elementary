
document.addEventListener('DOMContentLoaded', function () {
  const weekRange = document.getElementById('week-range');
  const weekDates = document.getElementById('weekDates');
  const prevWeekButton = document.getElementById('prev-week');
  const nextWeekButton = document.getElementById('next-week');

  let currentDate = new Date();
  let selectedDate = null; // Track the selected date

  function renderWeek() {
      weekDates.innerHTML = '';

      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      const startDate = startOfWeek.toLocaleDateString('default', { month: 'short', day: 'numeric' });
      const endDate = endOfWeek.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' });
      weekRange.textContent = `${startDate} - ${endDate}`;

      for (let i = 0; i < 7; i++) {
          const day = new Date(startOfWeek);
          day.setDate(startOfWeek.getDate() + i);

          const cell = document.createElement('td');
          cell.textContent = day.getDate();
          cell.classList.add('date'); // Add a 'date' class for easy selection

          // If this is the currently selected date, highlight it
          if (selectedDate && day.toDateString() === selectedDate.toDateString()) {
              cell.classList.add('highlighted');
          }

          weekDates.appendChild(cell);

          // Add event listener to each date cell
          cell.addEventListener('click', function () {
              if (selectedDate && selectedDate.toDateString() === day.toDateString()) {
                  // Deselect date
                  cell.classList.remove('highlighted');
                  selectedDate = null;
                  showAllEntries(); // Show all entries when no date is selected
              } else {
                  // Select new date
                  if (selectedDate) {
                      // Remove highlight from the previously selected date
                      document.querySelector('.highlighted')?.classList.remove('highlighted');
                  }
                  cell.classList.add('highlighted');
                  selectedDate = day;
                  filterEntriesByDate(day); // Filter entries based on selected date
              }
          });
      }
  }

  prevWeekButton.addEventListener('click', function () {
      currentDate.setDate(currentDate.getDate() - 7);
      renderWeek();
  });

  nextWeekButton.addEventListener('click', function () {
      currentDate.setDate(currentDate.getDate() + 7);
      renderWeek();
  });

  renderWeek();
  loadEntries();
});

function showAllEntries() {
  // Implement logic to show all entries when no date is selected
  loadEntries(); // Re-load entries as is (show all)
}

function filterEntriesByDate(selectedDate) {
  const moodEntries = JSON.parse(localStorage.getItem("moodEntries")) || [];
  const journalEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];

  const filteredMoodEntries = moodEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.toDateString() === selectedDate.toDateString();
  });

  const filteredJournalEntries = journalEntries.filter((_, index) => {
      const entryDate = new Date(moodEntries[index].date);
      return entryDate.toDateString() === selectedDate.toDateString();
  });

  // Clear the current entries and show the filtered ones
  const entryContainer = document.getElementById("entryContainer");
  entryContainer.innerHTML = '';

  if (filteredMoodEntries.length === 0 && filteredJournalEntries.length === 0) {
      entryContainer.innerHTML = "<p>No entries for the selected date.</p>";
      return;
  }

  filteredMoodEntries.forEach((entry, index) => {
      const journalEntry = filteredJournalEntries[index] || { title: "No journal entry", details: "No details available" };

      const entryDiv = document.createElement("div");
      entryDiv.classList.add("entry");

      entryDiv.innerHTML = `
          <p><strong>Mood:</strong> ${entry.mood}</p>
          <p><strong>Journal:</strong> ${journalEntry.title}</p>
          <p><strong>Date:</strong> ${entry.date}</p>
          <button class="viewMoreBtn">View More</button>
          <button class="deleteEntryBtn">Delete</button>
          <div class="journalDetails hidden">${journalEntry.details}</div> <!-- Display details -->
          <hr>
      `;

      entryContainer.appendChild(entryDiv);

      entryDiv.querySelector('.viewMoreBtn').addEventListener('click', function () {
          const details = entryDiv.querySelector('.journalDetails');
          details.classList.toggle('hidden'); 
      });

      entryDiv.querySelector('.deleteEntryBtn').addEventListener('click', function () {
          deleteEntry(index);
      });
  });
}
function submit() {
  document.body.classList.add('fade-out');
  setTimeout(() => {
      window.location.href = "mood.html";
  }, 500);
};
