let fontStyles = [];

async function switchFont(font) {
    const fontUnlockables = await getFontUnlockables();

    if (!fontUnlockables.isUnlocked(font)) {
        alert("Font locked! Buy it in the shop.");
        return;
    }

    const fontItem = fontUnlockables.getItem(font);
    if (!fontItem) return;

    for (const unlockableStyle of fontStyles) {
        const keys = Object.keys(unlockableStyle);
        const target = unlockableStyle.target;
        for (const key of keys) {
            if (key === "target") continue;
            const $targetElement = $(target);
            if (!$targetElement) continue;

            let containsKey = false;
            for (const style of fontItem.styles) {
                if (style.hasOwnProperty(key) && style.target === target) {
                    $targetElement.css(key, style[key]);
                    containsKey = true;
                    break;
                }
            }
            if (!containsKey) {
                $targetElement.css(key, "");
            }
        }
    }

    localStorage.setItem("font", font);
}

async function getFontStyles() {
    const fontUnlockables = await getFontUnlockables();
    for (const unlockable of fontUnlockables._unlockables) {
        const style = unlockable.styles;
        for (const unlockableStyle of style) {
            const target = unlockableStyle.target;
            if (target !== "html" && target !== "body" && target !== "main") continue;
            if (!fontStyles.includes(unlockableStyle))
                fontStyles.push(unlockableStyle);
        }
    }
}

async function loadFont() {
    const saved = localStorage.getItem("font");
    await getFontStyles();
    if (saved) await switchFont(saved);
}

async function loadFontDropdown() {
    const fontsDropdown = document.getElementById("fontsDropdown");
    if (!fontsDropdown) return;
    const fontUnlockables = await getFontUnlockables();
    fontsDropdown.innerHTML = "";

    fontUnlockables._unlockables.forEach(font => {
        const a = document.createElement("a");
        a.textContent = font.name + (font.default ? " (Default)" : "");
        a.setAttribute("onclick", `switchFont('${font.id}')`);
        fontsDropdown.appendChild(a);
    });
    await updateFontDropdown();
}

async function updateFontDropdown() {
    const fontUnlockables = await getFontUnlockables();
    const fontLinks = document.querySelectorAll("#fontsDropdown a");

    fontLinks.forEach(link => {
        const onclickAttr = link.getAttribute("onclick");
        const match = onclickAttr?.match(/'(\w+)'/);
        const font = match?.[1];

        if (!font) return;

        if (fontUnlockables.isUnlocked(font)) {
            link.classList.remove("locked");
            link.onclick = async () => await switchFont(font);
        } else {
            link.classList.add("locked");
            link.onclick = () => alert("Font locked! Buy it in the shop.");
        }
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadFont();
    await loadFontDropdown();
});