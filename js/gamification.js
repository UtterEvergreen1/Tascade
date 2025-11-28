let points = parseInt(localStorage.getItem("points")) || 0;

function updatePointsDisplay() {
    const p = document.getElementById("points");
    if (p) p.textContent = points.toString();
}

function updateShopPoints() {
    const p = document.getElementById("shopPoints");
    if (p) p.textContent = points.toString();
}


function savePoints() {
    localStorage.setItem("points", points);
}

// Initialize display on page load
updatePointsDisplay();
updateShopPoints();