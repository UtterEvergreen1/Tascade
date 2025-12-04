function switchTheme(theme) {
    // Loads unlocked themes from localStorage
    const unlocked = JSON.parse(localStorage.getItem("unlockedThemes")) || ["light"];

    if (!unlocked.includes(theme)) {
        showLockedMessage();
        return;
    }

    // Get theme link elements and enable the selected theme
    const links = document.querySelectorAll('link[data-theme]');
    links.forEach(link => link.disabled = link.dataset.theme !== theme);

    // Remove old theme class and add the new one
    document.body.className = document.body.className.replace(/\btheme-\S+/g, '');
    document.body.classList.add(`theme-${theme}`);

    // Save the selected theme
    localStorage.setItem("theme", theme);
}

function loadTheme() {
    // Load the selected theme from localStorage or default to "light"
    const theme = localStorage.getItem("theme") || "light";
    switchTheme(theme);
}


function updateThemeDropdown() {
    const unlocked = JSON.parse(localStorage.getItem("unlockedThemes")) || ["light"];
    const themeLinks = document.querySelectorAll("#themes a");

    themeLinks.forEach(link => {
        // Extract and match theme name from onclick attribute
        const onclickAttr = link.getAttribute("onclick");
        const themeMatch = onclickAttr?.match(/'(\w+)'/);
        const theme = themeMatch?.[1];

        if (!theme) return;

        // Update the dropdown based on unlocked themes
        if (unlocked.includes(theme)) {
            link.classList.remove("locked");
            link.onclick = () => switchTheme(theme);
        } else {
            link.classList.add("locked");
            link.onclick = showLockedMessage;
        }
    });
}

// Initial load of theme and update of dropdown
document.addEventListener("DOMContentLoaded", () => {
    loadTheme();
    updateThemeDropdown();
});
