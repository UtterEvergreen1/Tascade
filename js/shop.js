const shopPointsDisplay = document.getElementById("shopPoints");
shopPointsDisplay.textContent = points.toString();

async function renderAllCategories() {
    const themes = await getThemeUnlockables();
    themes.renderList("themeList");
    const fonts = await getFontUnlockables();
    fonts.renderList("fontList");
    const avatars = await getAvatarUnlockables();
    avatars.renderList("avatarList");
    const badges = await getBadgeUnlockables();
    badges.renderList("badgeList");
}

async function handleBuy(itemId, type) {
    if (type.isUnlocked(itemId)) {
        alert("You already own this.");
        return;
    }

    let item = type.getItem(itemId);

    if (!item) return;

    if (points >= item.cost) {
        points -= item.cost;
        savePoints();
        shopPointsDisplay.textContent = points.toString();

        type.unlock(itemId);

        // Re-render all categories
        await renderAllCategories();

    } else {
        alert("Not enough points!");
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await renderAllCategories();
});
