let shopItemsCache = null;

// read from unlockables.json file
async function loadShopItems() {
    const path = "data/unlockables.json";
    try {
        const res = await fetch(path);
        if (!res.ok) {
            console.warn(`Fetch failed for ${path}: ${res.status}`);
        }
        return await res.json();
    } catch (err) {
        console.error(`Error fetching ${path}:`, err);
        return { };
    }
}

async function getShopItems() {
    if (!shopItemsCache) {
        shopItemsCache = await loadShopItems();
    }
    return shopItemsCache;
}

getShopItems(); // Preload on script load
