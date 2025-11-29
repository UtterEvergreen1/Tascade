function switchTheme(theme) {
    const unlocked = JSON.parse(localStorage.getItem("unlockedThemes")) || ["light"];

    if(!unlocked.includes(theme)) {
        showLockedMessage();
        return;
    }

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

function updateThemeDropdown() {
    const unlocked = JSON.parse(localStorage.getItem("unlockedThemes")) || ["light"];
    const themeLinks = document.querySelectorAll("#themes a");

    themeLinks.forEach(link => {
        const onclickAttr = link.getAttribute("onclick");
        const themeMatch = onclickAttr?.match(/'(\w+)'/);
        const theme = themeMatch?.[1];

        if (!theme) return;

        if(unlocked.includes(theme)) {
            link.classList.remove("locked");
            link.onclick = () => switchTheme(theme);
        } else {
            link.classList.add("locked");
            link.onclick = showLockedMessage;
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadTheme();
    updateThemeDropdown();
});