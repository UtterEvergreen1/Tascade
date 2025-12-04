// Load all unlocked itmes from local storage
// Keeps track of what has already been purchased
let unlocked = JSON.parse(localStorage.getItem("unlockedItems") || "[]");
let unlockedThemes = JSON.parse(localStorage.getItem("unlockedThemes") || "[]");
let unlockedFonts = JSON.parse(localStorage.getItem("unlockedFonts") || "[]");

// Make 'light' theme avaliable as the default theme
if (!unlockedThemes.includes("light")) {
    unlockedThemes.push("light");
    localStorage.setItem("unlockedThemes", JSON.stringify(unlockedThemes));
}

// Make 'segoiUI' font avaliable as the default font
if (!unlockedFonts.includes("segoeUI")) {
    unlockedFonts.push("segoeUI");
    localStorage.setItem("unlockedFonts", JSON.stringify(unlockedFonts));
}
