document.addEventListener("DOMContentLoaded", function () {
    const moodSlider = document.getElementById("moodSlider");
    const moodDisplay = document.getElementById("moodDisplay");
    const moodDescription = document.querySelector(".mood-description strong");

    function updateMood() {
        const value = moodSlider.value;

        // Change emoji and description
        let moodText = "Feeling neutral.";
        let emoji = "😐";
        let color = "#ff416c";

        if (value == 1) {
            moodText = "Feeling very sad.";
            emoji = "😞";
            color = "#2b5876";
        } else if (value == 2) {
            moodText = "Feeling a bit down.";
            emoji = "😕";
            color = "#4b79a1";
        } else if (value == 3) {
            moodText = "Feeling neutral.";
            emoji = "😐";
            color = "#ff416c";
        } else if (value == 4) {
            moodText = "Feeling good!";
            emoji = "😊";
            color = "#ff7e5f";
        } else if (value == 5) {
            moodText = "Feeling amazing!";
            emoji = "😄";
            color = "#ff4b2b";
        }

        moodDisplay.textContent = emoji;
        moodDescription.textContent = moodText;

        // Apply gradient change dynamically
        moodSlider.style.background = `linear-gradient(to right, ${color}, #ff4b2b)`;
    }

    // Initialize mood on page load
    updateMood();

    // Add event listener for input change
    moodSlider.addEventListener("input", updateMood);
});
function goBack() {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = "mainPage.html"; // Change this to the correct URL
    }, 500);
}
function goNext() {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = "entry.html"; // Change this to the correct URL
    }, 500);
}
