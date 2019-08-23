const invAPI = require("../3rd/inventory.js");
const misc = require('../sMisc');


mp.events.add({
    "sInventory-getWeapon": (player) => {
        let playerWeapon = player.weapon;

        if(playerWeapon == 2725352035) return;
        if(player.faction == 1 && player.working) return;

        switch(playerWeapon)
        {
            case 2460120199:
                player.giveItem("weapon_dagger", "Dagues", 1);
                break;
            case 2508868239:
                player.giveItem("weapon_bat", "Batte", 1);
                break;  
            case 4192643659:
                player.giveItem("weapon_bottle", "Bouteille", 1);
                break;	   
            case 2227010557:
                player.giveItem("weapon_crowbar", "Pied de biche", 1);
                break;
            case 2343591895:
                player.giveItem("weapon_flashlight", "Torche", 1);
                break;
            case 1141786504:
                player.giveItem("weapon_golfclub", "Club golf", 1);
                break;
            case 1317494643:
                player.giveItem("weapon_hammer", "Marteau", 1);
                break;
            case 4191993645:
                player.giveItem("weapon_hatchet", "Hache", 1);
                break; 
            case 3638508604:
                player.giveItem("weapon_knuckle", "Poing Americain", 1);
                break;
            case 2578778090:
                player.giveItem("weapon_knife", "Couteau cranté", 1);
                break;
            case 3713923289:
                player.giveItem("weapon_machete", "Machete", 1);
                break;
            case 3756226112:
                player.giveItem("weapon_switchblade", "Couteau cran d'arret", 1);
                break;
            case 1737195953:
                player.giveItem("weapon_nightstick", "Matraque", 1);
                break;
            case 419712736:
                player.giveItem("weapon_wrench", "Clé outil", 1);
                break;
            case 3219281620:
                player.giveItem("weapon_pistol_mk2", "Pistolet MK II", 1);
                break;
            case 584646201:
                player.giveItem("weapon_appistol", "Pistolet Semi-auto", 1);
                break;
            case 3523564046:
                player.giveItem("weapon_heavypistol", "Colt 45", 1);
                break;
            case 3415619887:
                player.giveItem("weapon_revolver_mk2", "Revolver", 1);
                break;		
            case 324215364:
                player.giveItem("weapon_microsmg", "Micro SMG", 1);
                break;			
            case 736523883:
                player.giveItem("weapon_smg", "SMG", 1);
                break;					
            case 2024373456:
                player.giveItem("weapon_smg_mk2", "SMG MK II", 1);
                break;				
            case 3173288789:
                player.giveItem("weapon_minismg", "Mini SMG", 1);
                break;			
            case 487013001:
                player.giveItem("weapon_pumpshotgun", "Fusil a Pompe", 1);
                break;			
            case 1432025498:
                player.giveItem("weapon_pumpshotgun_mk2", "Fusil a Pompe MK II", 1);
                break;				
            case 2017895192:
                player.giveItem("weapon_sawnoffshotgun", "Fusil a Pompe Mini", 1);
                break;				
            case 4019527611:
                player.giveItem("weapon_dbshotgun", "Pompe Double Canon", 1);
                break;				
            case 3220176749:
                player.giveItem("weapon_assaultrifle", "Fusil D'assault AK47", 1);
                break;		
            case 4024951519:
                player.giveItem("weapon_assaultsmg", "Fusil d'assault", 1);
                break;
            case 3231910285:
                player.giveItem("weapon_specialcarbine", "Fusil d'assault MK II", 1);
                break;							
            case 100416529:
                player.giveItem("weapon_sniperrifle", "Sniper", 1);
                break;				
            case 205991906:
                player.giveItem("weapon_heavysniper", "Sniper MK II", 1);
                break;				
            case 615608432:
                player.giveItem("weapon_molotov", "Cocktail Molotov", 1);
                break;		
            case 4256991824:
                player.giveItem("weapon_smokegrenade", "Grenade Fumigene", 1);
                break;		
            case 883325847:
                player.giveItem("weapon_petrolcan", "Gericane Essence", 1);
                break;				
            case 4222310262:
                player.giveItem("gadget_parachute", "Parachute", 1);
                break;	    	
            case 453432689:
                player.giveItem("weapon_pistol", "Pistolet", 1);
                break;	 
            case 1593441988:
                player.giveItem("weapon_combatpistol", "Pistolet de combat", 1);
                break;
            case 2828843422:
                player.giveItem("weapon_musket", "Musket", 1);
                break;	
            case 1627465347:
                player.giveItem("weapon_gusenberg", "Gusenberg", 1);
                break;	
        }

        player.weapon = 0;

        player.unsetWeapon(playerWeapon);
    },
    "sInventory-useItem": (player, key) => {
        const inventory = player.getInventory();

        inventory.forEach((item, index) => {
            if(key == index) player.useItem(index);
        });
    },
    "sInventory-giveItem": (player, key) => {
        const inventory = player.getInventory();

        let target = misc.findPlayerByIdOrNickname(player.targetId);
        if(!target) return;

        let itemKey = 0;
        let amount = 0;

        inventory.forEach((item, index) => {
            if(key == index)
                itemKey = item.key;
        });

        if(itemKey == 'item_dirty_money')
            amount = player.getItemAmount(itemKey);
        else if(itemKey == 'item_matos')
            amount = player.getItemAmount(itemKey);
        else if(itemKey == 'item_munitions')
            amount = 1;
        else 
            amount = 1;


        player.notify(`~g~Vous avez donné à ${amount}x ${invAPI.getItemName(itemKey)} à ${target.name}.`);
        target.notify(`~g~${player.name} vous a donné ${amount}x ${invAPI.getItemName(itemKey)}.`);

        player.removeItem(key, amount);
        target.giveItem(itemKey, invAPI.getItemName(itemKey), amount);
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
    // graylog.log(`Item defined, key: ${key} | name: ${name} | description: ${description}`, `Item defined, key: ${key} | name: ${name} | description: ${description}`, 'inventory');
    console.log(`Item defined, key: ${key} | name: ${name} | description: ${description}`);
});

invAPI.on("itemAdded", (player, key, amount, data) => {
    // graylog.log(`${player.name} received ${amount}x ${key}.`, `${player.name} received ${amount}x ${key}.`, 'inventory');
    console.log(`${player.name} received ${amount}x ${key}.`);
});

invAPI.on("itemUsed", (player, invIdx, key, data) => {
    // graylog.log(`${player.name} used ${key}.`, `${player.name} used ${key}.`, 'inventory');
    console.log(`${player.name} used ${key}.`);
});

invAPI.on("itemRemoved", (player, invIdx, key, amount, data) => {
    // graylog.log(`${player.name} lost ${amount}x ${key}.`, `${player.name} lost ${amount}x ${key}.`, 'inventory');
    console.log(`${player.name} lost ${amount}x ${key}.`);
});

invAPI.on("itemRemovedCompletely", (player, key, data) => {
    // graylog.log(`${player.name} no longer has ${key} (${data ? "with data" : "without data"}) in their inventory.`, `${player.name} no longer has ${key} (${data ? "with data" : "without data"}) in their inventory.`, 'inventory');
    console.log(`${player.name} no longer has ${key} (${data ? "with data" : "without data"}) in their inventory.`);
});

invAPI.on("inventoryReplaced", (player, oldInventory, newInventory) => {
    // graylog.log(`${player.name} had their inventory replaced. (Old item count: ${oldInventory.length}, new: ${newInventory.length})`, `${player.name} had their inventory replaced. (Old item count: ${oldInventory.length}, new: ${newInventory.length})`, 'inventory');
    console.log(`${player.name} had their inventory replaced. (Old item count: ${oldInventory.length}, new: ${newInventory.length})`);
});

invAPI.addItem("weapon_dagger", "Dagues", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(2460120199, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_bat", "Batte", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(2508868239, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_bottle", "Bouteille", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(4192643659, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_crowbar", "Pied de biche", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(2227010557, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_flashlight", "Torche", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(2343591895, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_golfclub", "Club golf", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(1141786504, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_hammer", "Marteau", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(1317494643, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_hatchet", "Hache", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(4191993645, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_knuckle", "Poing Americain", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(3638508604, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_knife", "Couteau cranté", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(2578778090, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_machete", "Machete", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(3713923289, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_switchblade", "Couteau cran d'arret", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(3756226112, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_nightstick", "Matraque", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(1737195953, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_wrench", "Clé outil", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(419712736, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_pistol_mk2", "Pistolet MK II", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(3219281620, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_appistol", "Pistolet Semi-auto", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(584646201, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_heavypistol", "Colt 45", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(3523564046, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_revolver_mk2", "Revolver", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(3415619887, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_microsmg", "Micro SMG", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(324215364, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_smg", "SMG", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(736523883, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_smg_mk2", "SMG MK II", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(2024373456, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_minismg", "Mini SMG", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(324215364, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_pumpshotgun", "Fusil a Pompe", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(487013001, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_pumpshotgun_mk2", "Fusil a Pompe MK II", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(1432025498, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_sawnoffshotgun", "Fusil a Pompe Mini", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(2017895192, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_dbshotgun", "Pompe Double Canon", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(4019527611, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_assaultrifle", "Fusil D'assault AK47", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(3220176749, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_assaultsmg", "Fusil d'assault", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(4024951519, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_specialcarbine", "Fusil d'assault MK II", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(3231910285, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_sniperrifle", "Sniper", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(100416529, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_heavysniper", "Sniper MK II", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(205991906, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_molotov", "Cocktail Molotov", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(615608432, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_smokegrenade", "Grenade Fumigene", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(4256991824, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_petrolcan", "Gericane Essence", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(883325847, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("gadget_parachute", "Parachute", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(4222310262, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_pistol", "Pistolet", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(453432689, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_combatpistol", "Pistolet de combat", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(1593441988, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_musket", "Musket", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(2828843422, 0);
    player.removeItem(inventoryIndex);
});
invAPI.addItem("weapon_gusenberg", "Gusenberg", "", (player, inventoryIndex, itemKey, data) => {
    player.setWeapon(1627465347, 0);
    player.removeItem(inventoryIndex);
});

invAPI.addItem("item_dirty_money", "Argent sale", "", (player, inventoryIndex, itemKey, data) => {
    // player.armour = 100;
    // player.outputChatBox("Armor refilled.");
});

invAPI.addItem("item_matos", "Matos", "", (player, inventoryIndex, itemKey, data) => {
    // player.armour = 100;
    // player.outputChatBox("Armor refilled.");
});

invAPI.addItem("item_munitions", "Boîte de Munitions", "", (player, inventoryIndex, itemKey, data) => {
    let playerWeapon = player.weapon;

    if(playerWeapon == 2725352035) return player.notify("~r~Vous n'avez pas d'arme en mains."); 
    player.setWeapon(playerWeapon, 50);

    player.removeItem(inventoryIndex);
});