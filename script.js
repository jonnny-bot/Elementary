function goBack() {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = "mood.html"; 
    }, 500);
}
