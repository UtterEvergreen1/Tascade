let unlocked = JSON.parse(localStorage.getItem("unlockedItems") || "[]");
let unlockedThemes = JSON.parse(localStorage.getItem("unlockedThemes") || "[]");
let unlockedFonts = JSON.parse(localStorage.getItem("unlockedFonts") || "[]");

if (!unlockedThemes.includes("light")) {
    unlockedThemes.push("light");
    localStorage.setItem("unlockedThemes", JSON.stringify(unlockedThemes));
}

if (!unlockedFonts.includes("segoeUI")) {
    unlockedFonts.push("segoeUI");
    localStorage.setItem("unlockedFonts", JSON.stringify(unlockedFonts));
}
