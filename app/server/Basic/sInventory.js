const invAPI = require("../3rd/inventory.js");

invAPI.on("itemDefined", (key, name, description) => {
    console.log(`Item defined, key: ${key} | name: ${name} | description: ${description}`);
});

invAPI.on("itemAdded", (player, key, amount, data) => {
    console.log(`${player.name} received ${amount}x ${key}.`);
});

invAPI.on("itemUsed", (player, invIdx, key, data) => {
    console.log(`${player.name} used ${key}.`);
});

invAPI.on("itemRemoved", (player, invIdx, key, amount, data) => {
    console.log(`${player.name} lost ${amount}x ${key}.`);
});

invAPI.on("itemRemovedCompletely", (player, key, data) => {
    console.log(`${player.name} no longer has ${key} (${data ? "with data" : "without data"}) in their inventory.`);
});

invAPI.on("inventoryReplaced", (player, oldInventory, newInventory) => {
    console.log(`${player.name} had their inventory replaced. (Old item count: ${oldInventory.length}, new: ${newInventory.length})`);
});

invAPI.addItem("item_dirty_money", "Argent à blanchir", "A hoodie for freemode male model.", (player, inventoryIndex, itemKey, data) => {
    // if (player.model !== mp.joaat("mp_m_freemode_01")) {
    //     player.outputChatBox("Can't use this item with your current model.");
    //     return;
    // }

    let value = 0;
    if (data && data.hasOwnProperty("value")) texture = data.value;

    // player.setClothes(11, 7, texture, 2);
    // player.outputChatBox(`Now wearing: Hoodie with texture variation ${texture}.`);
    // player.removeItem(inventoryIndex);
});

mp.events.addCommand("givedirtymoney", (player, _, value) => {
    const giveItemResult = player.giveItem("item_dirty_money", 1, {
        value: Number(value)
    });

    if (giveItemResult) {
        player.outputChatBox(`Received a male hoodie with texture variation ${texture}.`);
    } else {
        player.outputChatBox("Failed to give item.");
    }
});

mp.events.addCommand("inventory", (player) => {
    const inventory = player.getInventory();

    player.outputChatBox("Your inventory:");
    inventory.forEach((item, index) => {
        player.outputChatBox(`${index} | ${invAPI.getItemName(item.key)} (${item.key}) | ${item.amount}x`);
    });
});
