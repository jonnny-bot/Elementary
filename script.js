function goBack() {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = "mood.html"; // Change this to the correct URL
    }, 500);
}
