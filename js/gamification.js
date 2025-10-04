let points = 0;
let timeStart = null;
function startTimer(button) {
    if (!timeStart) {
        timeStart = Date.now();
        button.textContent = "Stop Timer";
        button.style.backgroundColor = "#ff4d4d";
        button.style.color = "#fff";
    } else {
        const timeEnd = Date.now();
        const timeSpent = Math.floor((timeEnd - timeStart) / 1000);
        points += Math.floor(timeSpent / 60) * 5; // 5 points for every minute
        document.getElementById("points").textContent = points.toString();
        timeStart = null;
        button.textContent = "Start Timer";
        button.style.backgroundColor = "";
        button.style.color = "";
    }
}