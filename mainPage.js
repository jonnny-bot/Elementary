document.addEventListener('DOMContentLoaded', function () {
  const weekRange = document.getElementById('week-range');
  const weekDates = document.getElementById('weekDates');
  const prevWeekButton = document.getElementById('prev-week');
  const nextWeekButton = document.getElementById('next-week');

  let currentDate = new Date();
  let selectedDate = null; 

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
          cell.classList.add('date'); 

    
          if (selectedDate && day.toDateString() === selectedDate.toDateString()) {
              cell.classList.add('highlighted');
          }

          weekDates.appendChild(cell);


          cell.addEventListener('click', function () {
              if (selectedDate && selectedDate.toDateString() === day.toDateString()) {
      
                  cell.classList.remove('highlighted');
                  selectedDate = null;
                  showAllEntries(); 
              } else {

                  if (selectedDate) {
                      document.querySelector('.highlighted')?.classList.remove('highlighted');
                  }
                  cell.classList.add('highlighted');
                  selectedDate = day;
                  filterEntriesByDate(day); 
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
  const moodEntries = JSON.parse(localStorage.getItem("moodEntries")) || [];
  const journalEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];

  const entryContainer = document.getElementById("entryContainer");
  entryContainer.innerHTML = '';

  if (moodEntries.length === 0 && journalEntries.length === 0) {
      entryContainer.innerHTML = "<p>No entries found.</p>";
      return;
  }

  moodEntries.forEach((entry, index) => {
      const journalEntry = journalEntries[index] || { title: "No journal entry", details: "No details available" };

      const entryDiv = document.createElement("div");
      entryDiv.classList.add("entry");

      entryDiv.innerHTML = `
          <p><strong>Mood:</strong> ${entry.mood}</p>
          <p><strong>Journal:</strong> ${journalEntry.title}</p>
          <p><strong>Date:</strong> ${entry.date}</p>
          <button class="viewMoreBtn">View More</button>
          <button class="deleteEntryBtn">Delete</button>
          <button class="favoriteBtn">Favorite</button>
          <div class="journalDetails hidden">${journalEntry.details}</div>
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

      entryDiv.querySelector('.favoriteBtn').addEventListener('click', function () {
          addToFavorites(entry, journalEntry);
      });
  });
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

  const entryContainer = document.getElementById("entryContainer");
  entryContainer.innerHTML = '';

  if (filteredMoodEntries.length === 0 && filteredJournalEntries.length === 0) {
      entryContainer.innerHTML = "<p>No entries for the selected date.</p>";
      return;
  }

  filteredMoodEntries.forEach((entry, filteredIndex) => {
      const journalEntry = filteredJournalEntries[filteredIndex] || { title: "No journal entry", details: "No details available" };

      const entryDiv = document.createElement("div");
      entryDiv.classList.add("entry");

      entryDiv.innerHTML = `
          <p><strong>Mood:</strong> ${entry.mood}</p>
          <p><strong>Journal:</strong> ${journalEntry.title}</p>
          <p><strong>Date:</strong> ${entry.date}</p>
          <button class="viewMoreBtn">View More</button>
          <button class="deleteEntryBtn">Delete</button>
          <button class="favoriteBtn">Favorite</button>
          <div class="journalDetails hidden">${journalEntry.details}</div>
          <hr>
      `;

      entryContainer.appendChild(entryDiv);

      entryDiv.querySelector('.viewMoreBtn').addEventListener('click', function () {
          const details = entryDiv.querySelector('.journalDetails');
          details.classList.toggle('hidden');
      });

      entryDiv.querySelector('.deleteEntryBtn').addEventListener('click', function () {
          deleteEntry(filteredIndex);
      });

      entryDiv.querySelector('.favoriteBtn').addEventListener('click', function () {
          addToFavorites(entry, journalEntry);
      });
  });
}

function deleteEntry(filteredIndex) {
  let moodEntries = JSON.parse(localStorage.getItem("moodEntries")) || [];
  let journalEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];


  const filteredMoodEntries = moodEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.toDateString() === selectedDate.toDateString();
  });

  const entryToDelete = filteredMoodEntries[filteredIndex];
  const fullIndex = moodEntries.findIndex(entry => entry.date === entryToDelete.date);

  if (fullIndex !== -1) {
  
      moodEntries.splice(fullIndex, 1);
      journalEntries.splice(fullIndex, 1);

  
      localStorage.setItem("moodEntries", JSON.stringify(moodEntries));
      localStorage.setItem("journalEntries", JSON.stringify(journalEntries));

  
      if (selectedDate) {
          filterEntriesByDate(selectedDate);
      } else {
          showAllEntries(); 
      }
  }
}

function addToFavorites(moodEntry, journalEntry) {
  const favoriteEntries = JSON.parse(localStorage.getItem("favoriteEntries")) || [];


  const isAlreadyFavorited = favoriteEntries.some(entry => entry.moodEntry.date === moodEntry.date);

  if (!isAlreadyFavorited) {

      favoriteEntries.push({ moodEntry, journalEntry });
      localStorage.setItem("favoriteEntries", JSON.stringify(favoriteEntries));
      alert("Entry added to favorites!");
  } else {
      alert("This entry is already in your favorites!");
  }
}

function loadEntries() {
  if (selectedDate) {
      filterEntriesByDate(selectedDate);
  } else {
      showAllEntries();
  }
}

function submit() {
  document.body.classList.add('fade-out');
  setTimeout(() => {
      window.location.href = "mood.html";
  }, 500);
}