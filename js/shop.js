// Points from existing gamification.js
const shopPointsDisplay = document.getElementById("shopPoints");
shopPointsDisplay.textContent = points.toString();

// Load unlocked items from localStorage
let unlocked = JSON.parse(localStorage.getItem("unlockedItems") || "[]");

// Define shop items (easy to expand)
const shopItems = {
    themes: [
        { id: "dark-mode", name: "Dark Mode", cost: 20 },
        { id: "blue-theme", name: "Blue Theme", cost: 30 },
        { id: "retro-theme", name: "Retro Theme", cost: 50 }
    ],
    avatars: [
        { id: "cool-avatar", name: "Cool Avatar", cost: 10 },
        { id: "ninja-avatar", name: "Ninja Avatar", cost: 20 }
    ],
    badges: [
        { id: "task-master-badge", name: "Task Master Badge", cost: 100 },
        { id: "productivity-pro-badge", name: "Productivity Pro Badge", cost: 150 }
    ]
};

// Renders a category (Bootstrap cards)
function renderCategory(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    items.forEach(item => {
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

        col.innerHTML = `
            <div class="card shadow-sm h-100">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text mb-3">${item.cost} points</p>
                    <button class="btn btn-primary mt-auto buy-btn" data-id="${item.id}">
                        ${unlocked.includes(item.id) ? "Unlocked ✔" : "Buy"}
                    </button>
                </div>
            </div>
        `;

        container.appendChild(col);
    });

    // Add buy button logic
    container.querySelectorAll(".buy-btn").forEach(btn => {
        btn.onclick = () => handleBuy(btn.dataset.id);
    });
}

function handleBuy(itemId) {
    const item = [...shopItems.themes, ...shopItems.avatars].find(i => i.id === itemId);
    if (!item) return;

    if (unlocked.includes(itemId)) {
        alert("You already own this.");
        return;
    }

    if (points >= item.cost) {
        points -= item.cost;
        savePoints();
        shopPointsDisplay.textContent = points.toString();

        unlocked.push(itemId);
        localStorage.setItem("unlockedItems", JSON.stringify(unlocked));

        // Refresh UI
        renderCategory("themeList", shopItems.themes);
        renderCategory("avatarList", shopItems.avatars);
    } else {
        alert("Not enough points!");
    }
}

// Initial rendering
renderCategory("themeList", shopItems.themes);
renderCategory("avatarList", shopItems.avatars);
renderCategory("badgeList", shopItems.badges);