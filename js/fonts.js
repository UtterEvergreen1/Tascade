function switchFont(font) {
    // Load unlocked fonts from local storage
    const unlockedFonts = JSON.parse(localStorage.getItem("unlockedFonts")) || [];

    if (!unlockedFonts.includes(font)) {
        alert("Font locked! Buy it in the shop.");
        return;
    }
    
    // Map font ID to its actual CSS font-family value
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

    // Apply the font to the entire page
    $("body").css("font-family", fontFamily);

    // Save selected font
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
        // Extract and match font name from onclick attribute
        const onclickAttr = link.getAttribute("onclick");
        const match = onclickAttr?.match(/'(\w+)'/);
        const font = match?.[1];

        if (!font) return;

        // Update the dropdown based on unlocked fonts
        if (unlocked.includes(font)) {
            link.classList.remove("locked");
            link.onclick = () => switchFont(font);
        } else {
            link.classList.add("locked");
            link.onclick = () => showLockedMessage();
        }
    });
}

// Initial load of font and update of dropdown
document.addEventListener("DOMContentLoaded", () => {
    loadFont();
    updateFontDropdown();
});