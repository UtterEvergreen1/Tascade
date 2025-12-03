function switchTheme(theme) {
    const unlocked = JSON.parse(localStorage.getItem("unlockedThemes")) || ["light"];

    if (!unlocked.includes(theme)) {
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

        if (unlocked.includes(theme)) {
            link.classList.remove("locked");
            link.onclick = () => switchTheme(theme);
        } else {
            link.classList.add("locked");
            link.onclick = showLockedMessage;
        }
    });
}

function switchFont(font) {
    const unlockedFonts = JSON.parse(localStorage.getItem("unlockedFonts")) || [];

    if (!unlockedFonts.includes(font)) {
        alert("Font locked! Buy it in the shop.");
        return;
    }
                                                 // Different font choices
    let fontFamily;
    switch (font) {
        case "segoeUI":
            fontFamily = "'Segoe UI', sans-serif";
            break;
        case "comic":
            fontFamily = "'Comic Sans MS', cursive, sans-serif";
            break;
        case "courier":
            fontFamily = "'Courier New', monospace";
            break;
        case "bangers":
            fontFamily = "'Bangers', cursive";
            break;
        case "robotoSlab":
            fontFamily = "'Roboto Slab', serif";
            break;
        case "pressStart":
            fontFamily = "'Press Start 2P', cursive";
            break;
        default:
            fontFamily = "inherit";
    }


    $("body").css("font-family", fontFamily);
    localStorage.setItem("font", font);
}

function loadFont() {
    const saved = localStorage.getItem("font");
    if (saved) switchFont(saved);
}

function updateFontDropdown() {
    const unlocked = JSON.parse(localStorage.getItem("unlockedFonts")) || [];
    const fontLinks = document.querySelectorAll("#fontsDropdown a");

    fontLinks.forEach(link => {
        const onclickAttr = link.getAttribute("onclick");
        const match = onclickAttr?.match(/'(\w+)'/);
        const font = match?.[1];

        if (!font) return;

        if (unlocked.includes(font)) {
            link.classList.remove("locked");
            link.onclick = () => switchFont(font);
        } else {
            link.classList.add("locked");
            link.onclick = () => alert("Font locked! Buy it in the shop.");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadTheme();
    loadFont();
    updateThemeDropdown();
    updateFontDropdown();
});

$(document).ready(function () {
    const savedFont = localStorage.getItem("font");
    if (savedFont) switchFont(savedFont);
});
