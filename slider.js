document.addEventListener("DOMContentLoaded", () => {
    const moodSlider = document.getElementById("moodSlider");
    const moodDisplay = document.getElementById("moodDisplay");
    const moodText = document.getElementById("moodText");
    const statusFill = document.getElementById("statusFill");
    const quoteTextElem = document.getElementById("quoteText");
    const quoteAuthorElem = document.getElementById("quoteAuthor");
  
    // Moods for slider values 1 to 5
    const moods = [
      { emoji: "😢", text: "Feeling very sad.", color: "#ff416c" },
      { emoji: "😞", text: "Feeling a bit down.", color: "#ff774c" },
      { emoji: "😐", text: "Feeling neutral.",  color: "#ffad33" },
      { emoji: "😊", text: "Feeling good!",     color: "#70d86e" },
      { emoji: "😃", text: "Feeling great!",    color: "#00c851" }
    ];
  
    // 6 Quotes per mood (total 30 quotes)
    const quotes = {
      "1": [
        { text: "The pain you feel today will be the strength you feel tomorrow.", author: "Unknown" },
        { text: "Tears come from the heart and not from the brain.", author: "Leonardo da Vinci" },
        { text: "Even a soul submerged in sleep is hard at work.", author: "Emily Dickinson" },
        { text: "Every man has his secret sorrows which the world knows not.", author: "Henry Wadsworth Longfellow" },
        { text: "Sadness flies away on the wings of time.", author: "Jean de La Fontaine" },
        { text: "Sometimes, the only soul that can mend a broken heart is the soul that broke it.", author: "Unknown" }
      ],
      "2": [
        { text: "The word 'happy' would lose its meaning if it were not balanced by sadness.", author: "Carl Jung" },
        { text: "There is no greater sorrow than to recall a time when you were happy.", author: "Unknown" },
        { text: "Heavy hearts, like heavy clouds in the sky, are best relieved by the letting of a little water.", author: "Christopher Morley" },
        { text: "Even the darkest night will end and the sun will rise.", author: "Victor Hugo" },
        { text: "Tears shed for another person are not a sign of weakness.", author: "Dalai Lama" },
        { text: "We must accept finite disappointment, but never lose infinite hope.", author: "Martin Luther King Jr." }
      ],
      "3": [
        { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
        { text: "Life is 10% what happens to us and 90% how we react to it.", author: "Charles R. Swindoll" },
        { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" },
        { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" }
      ],
      "4": [
        { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
        { text: "Happiness depends upon ourselves.", author: "Aristotle" },
        { text: "For every minute you are angry you lose sixty seconds of happiness.", author: "Ralph Waldo Emerson" },
        { text: "Happiness is not by chance, but by choice.", author: "Jim Rohn" },
        { text: "The most wasted of all days is one without laughter.", author: "Nicolas Chamfort" },
        { text: "Happiness is only real when shared.", author: "Christopher McCandless" }
      ],
      "5": [
        { text: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" },
        { text: "Be happy for this moment. This moment is your life.", author: "Omar Khayyam" },
        { text: "Happiness is a warm puppy.", author: "Charles M. Schulz" },
        { text: "Happiness is when what you think, what you say, and what you do are in harmony.", author: "Mahatma Gandhi" },
        { text: "Happiness is the art of never holding in your mind the memory of any unpleasant thing that has passed.", author: "Unknown" },
        { text: "The secret of happiness is to admire without desiring.", author: "Carl Sandburg" }
      ]
    };
  
    function updateMood() {
      const value = parseInt(moodSlider.value, 10) - 1;
      const currentMood = moods[value];
  
      // Update emoji & mood text
      moodDisplay.textContent = currentMood.emoji;
      moodText.textContent = currentMood.text;
  
      // Update status bar
      const fillPercent = ((value + 1) / moods.length) * 100;
      statusFill.style.width = fillPercent + "%";
      statusFill.style.background = currentMood.color;
  
      // Update slider background
      moodSlider.style.background = `linear-gradient(to right, ${currentMood.color}, #fff)`;
  
      // Update the daily quote for the current mood
      updateQuote(moodSlider.value);
    }
  
    function updateQuote(moodValue) {
      const moodQuotes = quotes[moodValue];
      const randomIndex = Math.floor(Math.random() * moodQuotes.length);
      const chosenQuote = moodQuotes[randomIndex];
  
      // Remove and re-add fade-in animation classes to restart
      quoteTextElem.classList.remove("fade-in");
      quoteAuthorElem.classList.remove("fade-in");
  
      quoteTextElem.textContent = `"${chosenQuote.text}"`;
      quoteAuthorElem.textContent = `- ${chosenQuote.author}`;
  
      // Force reflow
      void quoteTextElem.offsetWidth;
      void quoteAuthorElem.offsetWidth;
  
      // Add fade-in classes
      quoteTextElem.classList.add("fade-in");
      quoteAuthorElem.classList.add("fade-in");
    }
  
    moodSlider.addEventListener("input", updateMood);
    updateMood();
  });
  
  // Basic navigation stubs
  function goBack() {
    window.history.back();
  }
  
  function goNext() {
    alert("Next page functionality here!");
  }
  