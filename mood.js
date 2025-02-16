document.addEventListener("DOMContentLoaded", function () {
    const moodSlider = document.getElementById("moodSlider");
    const moodDisplay = document.getElementById("moodDisplay");
    const moodDescription = document.querySelector(".mood-description strong");

    function updateMood() {
        const value = moodSlider.value;

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


        moodSlider.style.background = `linear-gradient(to right, ${color}, #ff4b2b)`;
    }

    function saveMood() {
        const value = moodSlider.value;
        const emoji = moodDisplay.textContent;
        const date = new Date().toLocaleString();

        let moodData = JSON.parse(localStorage.getItem("moodEntries")) || [];
        moodData.push({ mood: emoji, date });

        localStorage.setItem("moodEntries", JSON.stringify(moodData));

        window.location.href = "entry.html";
    }

    moodSlider.addEventListener("input", updateMood);
    document.querySelector(".next-button").addEventListener("click", saveMood);

    updateMood();
});
function goBack(){
    window.location.href = "mainPage.html";
}