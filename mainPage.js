document.addEventListener('DOMContentLoaded', function () {
  const weekRange = document.getElementById('week-range');
  const weekDates = document.getElementById('weekDates');
  const prevWeekButton = document.getElementById('prev-week');
  const nextWeekButton = document.getElementById('next-week');

  let currentDate = new Date();

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
          weekDates.appendChild(cell);
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

function submit() {
  document.body.classList.add('fade-out');
  setTimeout(() => {
      window.location.href = "mood.html";
  }, 500);
}
document.addEventListener('DOMContentLoaded', function () {
  loadEntries(); 
});



function loadEntries() {
  const moodEntries = JSON.parse(localStorage.getItem("moodEntries")) || [];
  const journalEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];

  const entryContainer = document.createElement("div");
  entryContainer.id = "entryContainer";


  const oldContainer = document.getElementById("entryContainer");
  if (oldContainer) oldContainer.remove();

  document.getElementById("calendarBody").appendChild(entryContainer);


  if (moodEntries.length === 0 && journalEntries.length === 0) {
      entryContainer.innerHTML = "<p>No mood or journal entries yet.</p>";
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

document.getElementById("analyticsButton").addEventListener("click", function() {
  window.location.href = "analyticsPage.html"; 
});





function deleteEntry(index) {
  let moodEntries = JSON.parse(localStorage.getItem("moodEntries")) || [];
  let journalEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];

  moodEntries.splice(index, 1);
  journalEntries.splice(index, 1);

  localStorage.setItem("moodEntries", JSON.stringify(moodEntries));
  localStorage.setItem("journalEntries", JSON.stringify(journalEntries));

  loadEntries(); 
}
