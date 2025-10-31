let points = parseInt(localStorage.getItem("points")) || 0;

function updatePointsDisplay() {
    document.getElementById("points").textContent = points.toString();
}

function savePoints() {
    localStorage.setItem("points", points);
}

// Initialize display on page load
updatePointsDisplay();
