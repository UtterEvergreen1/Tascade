const shopPointsDisplay = document.getElementById("shopPoints");
shopPointsDisplay.textContent = points.toString();

// Everything available for purchase in the shop
const shopItems = {
    themes: [
        { id: "dark", name: "Dark 🌘", cost: 20 },
        { id: "winter", name: "Winter ❄️", cost: 30 },
        { id: "spring", name: "Spring 🌱", cost: 30 },
        { id: "summer", name: "Summer ☀️", cost: 30 },
        { id: "fall", name: "Fall 🍂", cost: 30 }
    ],
    fonts: [
        { id: "comic", name: "Comic Sans", cost: 10 },
        { id: "courier", name: "Courier New", cost: 10 },
        { id: "bangers", name: "Bangers", cost: 10 },
        { id: "robotoSlab", name: "Roboto Slab", cost: 10 },
        { id: "pressStart", name: "Press Start 2P", cost: 20 }
    ],
    avatars: [
        { id: "ex-avatar", name: "ex-avatar", cost: 10 },
        { id: "ex2-avatar", name: "ex2-avatar", cost: 20 }
    ],
    badges: [
        { id: "task-master-badge", name: "Task Master Badge", cost: 100 },
        { id: "productivity-pro-badge", name: "Productivity Pro Badge", cost: 150 }
    ]
};

function renderCategory(containerId, items, type) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    items.forEach(item => {
        let isUnlocked;
        if (type === "theme") isUnlocked = unlockedThemes.includes(item.id);
        else if (type === "font") isUnlocked = unlockedFonts.includes(item.id);
        else isUnlocked = unlocked.includes(item.id);

        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

        // Create the card HTML for the items and buy/unlocked button
        col.innerHTML = `
            <div class="card shadow-sm h-100">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text mb-3">${item.cost} points</p>
                    <button class="btn ${isUnlocked ? 'btn-success' : 'btn-primary'} mt-auto buy-btn" data-id="${item.id}" data-type="${type}">
                        ${isUnlocked ? "Unlocked ✔" : "Buy"}
                    </button>
                </div>
            </div>
        `;

        container.appendChild(col);
    });

    // Attach event listeners to buy buttons
    container.querySelectorAll(".buy-btn").forEach(btn => {
        btn.onclick = () => handleBuy(btn.dataset.id, btn.dataset.type);
    });
}

function handleBuy(itemId, type) {
    let item;

    // Find the item based on type and id
    if (type === "theme") item = shopItems.themes.find(i => i.id === itemId);
    else if (type === "avatar") item = shopItems.avatars.find(i => i.id === itemId);
    else if (type === "badge") item = shopItems.badges.find(i => i.id === itemId);
    else if (type === "font") item = shopItems.fonts.find(i => i.id === itemId);

    if (!item) return;

    // Check if already unlocked
    const isUnlocked =
        type === "theme" ? unlockedThemes.includes(item.id) :
            type === "font" ? unlockedFonts.includes(item.id) :
                unlocked.includes(item.id);

    if (isUnlocked) {
        alert("You already own this.");
        return;
    }

    // Check if enough points
    if (points >= item.cost) {
        points -= item.cost;
        savePoints();
        shopPointsDisplay.textContent = points.toString();

        // Add to unlocked items
        if (type === "theme") {
            unlockedThemes.push(itemId);
            localStorage.setItem("unlockedThemes", JSON.stringify(unlockedThemes));
            if (typeof updateThemeDropdown === "function") updateThemeDropdown();
        }
        else if (type === "font") {
            unlockedFonts.push(itemId);
            localStorage.setItem("unlockedFonts", JSON.stringify(unlockedFonts));
            if (typeof updateFontDropdown === "function") updateFontDropdown();
        }
        else {
            unlocked.push(itemId);
            localStorage.setItem("unlockedItems", JSON.stringify(unlocked));
        }

        // Re-render all categories
        renderCategory("themeList", shopItems.themes, "theme");
        renderCategory("fontList", shopItems.fonts, "font");
        renderCategory("avatarList", shopItems.avatars, "avatar");
        renderCategory("badgeList", shopItems.badges, "badge");

    } else {
        alert("Not enough points!");
    }
}
// Initial render of shop categories
document.addEventListener("DOMContentLoaded", () => {
    renderCategory("themeList", shopItems.themes, "theme");
    renderCategory("fontList", shopItems.fonts, "font");
    renderCategory("avatarList", shopItems.avatars, "avatar");
    renderCategory("badgeList", shopItems.badges, "badge");
});
