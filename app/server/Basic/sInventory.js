const invAPI = require("../3rd/inventory.js");
const misc = require('../sMisc');


mp.events.add({
    "sInventory-getWeapon": (player) => {
        let playerWeapon = player.weapon;

        if(playerWeapon == 2725352035) return;
        // if(player.faction == 1 && player.working) return;

        switch(playerWeapon)
        {
            case 2460120199:
                player.giveItem("weapon_dagger", "Dagues", 1);
                break;
            case 2508868239:
                player.giveItem("weapon_bat", "Batte", 1);
                break;
        }

        player.unsetWeapon(playerWeapon);
    },
    "sInventory-useItem": (player, key) => {
        const inventory = player.getInventory();

        inventory.forEach((item, index) => {
            if(key == index) player.useItem(index);
        });
    },
    "sInventory-giveItem": (player, key) => {
        let target = misc.findPlayerByIdOrNickname(player.targetId);
        if(!target) return;

        let itemKey = 0;

        inventory.forEach((item, index) => {
            if(key == index)
                itemKey = item.key;
        });

        player.notify(`~g~Vous avez donné à 1x ${invAPI.getItemName(itemKey)} à ${target.name}.`);
        target.notify(`~g~${player.name} vous a donné 1x ${invAPI.getItemName(itemKey)}.`);

        player.removeItem(key, 1);
        target.giveItem(itemKey, invAPI.getItemName(itemKey), 1);
    },
    "sInventory-deleteItem": (player, key) => {
        const inventory = player.getInventory();

        let itemKey = 0;

        inventory.forEach((item, index) => {
            if(key == index)
                itemKey = item.key;
        });

        player.notify(`~g~Vous avez jeté ${player.getItemAmount(itemKey)}x ${invAPI.getItemName(itemKey)}.`);
        player.removeItem(key, player.getItemAmount(itemKey));
    }
});

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

invAPI.addItem("weapon_dagger", "Dagues", "");

invAPI.addItem("weapon_bat", "Batte", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(2508868239, 1);
    player.removeItem(inventoryIndex);
});

invAPI.addItem("item_male_hoodie", "Hoodie (Male)", "A hoodie for freemode male model.", (player, inventoryIndex, itemKey, data) => {
    if (player.model !== mp.joaat("mp_m_freemode_01")) {
        player.outputChatBox("Can't use this item with your current model.");
        return;
    }

    let texture = 0;
    if (data && data.hasOwnProperty("texture")) texture = data.texture;

    player.setClothes(11, 7, texture, 2);
    player.outputChatBox(`Now wearing: Hoodie with texture variation ${texture}.`);
    player.removeItem(inventoryIndex);
});

mp.events.addCommand("givehoodie", (player, _, texture) => {
    const giveItemResult = player.giveItem("item_male_hoodie", "NOM DE l'ITEM", 1, {
        texture: Number(texture)
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

