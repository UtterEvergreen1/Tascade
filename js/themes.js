function switchTheme(theme) {
    const links = document.querySelectorAll('link[data-theme]');
    links.forEach(link => link.disabled = link.dataset.theme !== theme);

    // Remove old theme class and add the new one
    document.body.className = document.body.className.replace(/\btheme-\S+/g, '');
    document.body.classList.add(`theme-${theme}`);

    localStorage.setItem("theme", theme);
}

function loadTheme() {
    const theme = localStorage.getItem("theme") || "light";
    switchTheme(theme);
}

document.addEventListener("DOMContentLoaded", loadTheme);
