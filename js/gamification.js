// Load points from localStorage or initialize to 0
let points = parseInt(localStorage.getItem("points")) || 0;

function updatePointsDisplay() {
    const pointsElements = document.getElementsByClassName("points-display");
    for (let i = 0; i < pointsElements.length; i++) {
        pointsElements[i].textContent = points.toString();
    }
}

function updateShopPoints() {
    const p = document.getElementById("shopPoints");
    if (p) p.textContent = points.toString();
}


function savePoints() {
    localStorage.setItem("points", String(points));
}

// Initialize points to display on page load
updatePointsDisplay();
updateShopPoints();