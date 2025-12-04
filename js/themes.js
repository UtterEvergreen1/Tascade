async function switchTheme(theme) {
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

async function loadTheme() {
    // Load the selected theme from localStorage or default to "light"
    const theme = localStorage.getItem("theme") || "light";
    await switchTheme(theme);
}

async function loadThemeDropdown() {
    const themesDropdown = document.getElementById("themes");
    if (!themesDropdown) return;
    const themeUnlockables = await getThemeUnlockables();
    themesDropdown.innerHTML = "";

    themeUnlockables._unlockables.forEach(theme => {
        const a = document.createElement("a");
        a.textContent = theme.name;
        a.setAttribute("onclick", `switchTheme('${theme.id}')`);
        themesDropdown.appendChild(a);
    });
    await updateThemeDropdown();
}

async function updateThemeDropdown() {
    const themeUnlockables = await getThemeUnlockables();
    const themeLinks = document.querySelectorAll("#themes a");

    themeLinks.forEach(link => {
        // Extract and match theme name from onclick attribute
        const onclickAttr = link.getAttribute("onclick");
        const themeMatch = onclickAttr?.match(/'(\w+)'/);
        const theme = themeMatch?.[1];

        if (!theme) return;

        // Update the dropdown based on unlocked themes
        if (themeUnlockables.isUnlocked(theme)) {
            link.classList.remove("locked");
            link.onclick = async () => await switchTheme(theme);
        } else {
            link.classList.add("locked");
            link.onclick = showLockedMessage;
        }
    });
}

// Initial load of theme and update of dropdown
document.addEventListener("DOMContentLoaded", async () => {
    await loadTheme();
    await loadThemeDropdown();
});
