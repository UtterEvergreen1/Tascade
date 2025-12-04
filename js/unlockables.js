let themeUnlockables = null;
let fontUnlockables = null;
let avatarUnlockables = null;
let badgeUnlockables = null;
let loadingPromise = null;

async function ensureLoaded() {
    if (!loadingPromise) {
        loadingPromise = loadUnlockables();
    }
    await loadingPromise;
}

async function getThemeUnlockables() {
    await ensureLoaded();
    return themeUnlockables;
}

async function getFontUnlockables() {
    await ensureLoaded();
    return fontUnlockables;
}

async function getAvatarUnlockables() {
    await ensureLoaded();
    return avatarUnlockables;
}

async function getBadgeUnlockables() {
    await ensureLoaded();
    return badgeUnlockables;
}

async function loadUnlockables() {
    const shopItems = await getShopItems();
    themeUnlockables = new ThemeUnlockables(shopItems);
    fontUnlockables = new FontUnlockables(shopItems);
    avatarUnlockables = new AvatarUnlockables(shopItems);
    badgeUnlockables = new BadgeUnlockables(shopItems);
}

async function getUnlockableCategory(category) {
    switch (category) {
        case "theme":
            return await getThemeUnlockables();
        case "font":
            return await getFontUnlockables();
        case "avatar":
            return await getAvatarUnlockables();
        case "badge":
            return await getBadgeUnlockables();
        default:
            return null;
    }
}

class UnlockablesCategory {
    constructor(type, unlockables, storageStr, updateFunc) {
        this._type = type;
        this._unlockables = unlockables;
        this._unlocked = [];
        this._storageStr = storageStr;
        this._defaultName = unlockables.length > 0 ? unlockables[0].id : null;
        this._updateFunc = updateFunc;
        const stored = localStorage.getItem(storageStr);
        if (stored) {
            this._unlocked = JSON.parse(stored);
        } else if (this._defaultName !== null) {
            this._unlocked = [this._defaultName];
            localStorage.setItem(storageStr, JSON.stringify(this._unlocked));
        }
    }

    isUnlocked(itemId) {
        return this._unlocked.includes(itemId);
    }

    save() {
        localStorage.setItem(this._storageStr, JSON.stringify(this._unlocked));
    }

    unlock(itemId) {
        if (!this.isUnlocked(itemId)) {
            this._unlocked.push(itemId);
            this.save();
            if (this._updateFunc) this._updateFunc();
        }
    }

    getItem(itemId) {
        return this._unlockables.find(item => item.id === itemId);
    }

    renderList(containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = "";

        this._unlockables.forEach(unlockable => {
            // check if default
            if (unlockable.default !== true)
            {
                let isUnlocked = this.isUnlocked(unlockable.id);

                const col = document.createElement("div");
                col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

                col.innerHTML = `
                <div class="card shadow-sm h-100">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${unlockable.name}</h5>
                        <p class="card-text mb-3">${unlockable.cost} points</p>
                        <button class="btn ${isUnlocked ? 'btn-success' : 'btn-primary'} mt-auto buy-btn" data-id="${unlockable.id}" data-type="${this._type}">
                            ${isUnlocked ? "Unlocked ✔" : "Buy"}
                        </button>
                    </div>
                </div>
                `;
                let btn = col.querySelector(".buy-btn");
                btn.onclick = async () => await handleBuy(btn.dataset.id, await getUnlockableCategory(btn.dataset.type));

                container.appendChild(col);
            }
        });
    }
}

class ThemeUnlockables extends UnlockablesCategory {
    constructor(shopItems) {
        super("theme", shopItems.themes, "unlockedThemes", updateThemeDropdown);
    }
}

class FontUnlockables extends UnlockablesCategory {
    constructor(shopItems) {
        super("font", shopItems.fonts, "unlockedFonts", updateFontDropdown);
    }
}

class AvatarUnlockables extends UnlockablesCategory {
    constructor(shopItems) {
        super("avatar", shopItems.avatars, "unlockedAvatars", null);
    }
}

class BadgeUnlockables extends UnlockablesCategory {
    constructor(shopItems) {
        super("badge", shopItems.badges, "unlockedBadges", null);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadUnlockables();
});