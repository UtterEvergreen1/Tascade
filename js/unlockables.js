let unlocked = JSON.parse(localStorage.getItem("unlockedItems") || "[]");
let unlockedThemes = JSON.parse(localStorage.getItem("unlockedThemes") || '["light"]');
let unlockedFonts = JSON.parse(localStorage.getItem("unlockedFonts") || "[]");

if (!unlockedFonts.includes("segoeUI")) {
    unlockedFonts.push("segoeUI");
    localStorage.setItem("unlockedFonts", JSON.stringify(unlockedFonts));
}