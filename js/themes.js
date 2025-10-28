const darkModeLink = document.querySelector('link[href="css/dark.css"]');

function switchTheme(theme) {
    darkModeLink.disabled = theme !== "dark";
    localStorage.setItem("theme", theme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    darkModeLink.disabled = savedTheme !== "dark";
}

loadTheme();