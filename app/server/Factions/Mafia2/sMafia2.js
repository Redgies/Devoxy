const misc = require('../../sMisc');
const faction = require('../sFaction');
const invAPI = require("../../3rd/inventory.js");

const factionData = {
    id: 7,
    name: "Les Bikers",
    surname: "Bikers",
    ranks: [
        "Recrue",
        "Biker",
        "Trésorier",
        "Vice Président",
        "Président",
    ],
    maxRank: 5,
    matosPoint: {
        x: 726.544, 
        y: 4169.017, 
        z: 40.709
    },
    createPoint: {
        x: 2347.756, 
        y: 3122.757, 
        z: 48.209
    },
}

class Mafia2 extends faction {
	constructor() {
        super(factionData.id, factionData.name, factionData.surname, factionData.ranks, factionData.maxRank);

        this.createEvents();
        this.matosPoint(factionData.matosPoint);
        this.createPoint(factionData.createPoint);
    }

    createEvents() {
        mp.events.add({
            "playerEnterColshape" : (player, shape) => {
                if(!player.loggedIn || !this.isInThisFaction(player)) return;
    
                if(shape === this.matosShape)
                {
                    player.canBuyMatos = true;
                    player.notify("Appuyez ~b~E ~w~pour acheter du matos (~g~15000$~w~ les 100 matos).");
                }
                if(shape === this.createShape)
                {
                    player.canCreateWeapon = true;
                    player.notify("Appuyez ~b~E ~w~pour fabriquer des armes.");
                }
                
            },
            "playerExitColshape" : (player, shape) => {
                if(!player.loggedIn || !this.isInThisFaction(player)) return;
                
                if(shape === this.matosShape)
                    player.canBuyMatos = false;
                if(shape === this.createShape)
                    player.canCreateWeapon = false;
            },
            "sKeys-E" : (player) => {
                if(!player.loggedIn || !this.isInThisFaction(player)) return;

                if(player.canBuyMatos)
                {
                    if(player.money.cash < 15000)
                        return player.notify("~r~Vous n'avez pas assez sur vous.");

                    player.changeMoney(-15000);
                    player.giveItem("item_matos", "Matos", 100);

                    player.notify("Vous avez acheté 100 matos pour ~g~15000$~w~.")
                }
                if(player.canCreateWeapon)
                {
                    player.call("cMafia-Open", []);
                }
            },
            "sMafia-buyWeapon" : (player, data) => {
                if(!player.loggedIn || !this.isInThisFaction(player)) return;

                const d = JSON.parse(data);
                const inventory = player.getInventory();

                inventory.forEach((item, index) => {
                    if(item.key == "item_matos")
                    {
                        let amount = player.getItemAmount(item.key);

                        if(amount < d.price) return player.notify("~r~Vous n'avez pas assez de matos.");

                        if(d.hash == 'munitions')
                        {
                            player.giveItem("item_munitions", "Boîte de Munitions", 1);
                            player.removeItem(index, d.price);
                            player.notify(`Vous avez fabriqué une boîte de munitions pour (~g~-${d.price} matos~w~).`);
                            return 1;
                        }

                        player.removeItem(index, d.price);
                        player.setWeapon(d.hash, 0);

                        player.notify(`Vous avez fabriqué une arme pour (~g~-${d.price} matos~w~).`);
                        return 1;
                    }
                });
            }
        });
    }

    matosPoint(pos) {
		this.matosShape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 1);
		this.matosMarker = mp.markers.new(1, new mp.Vector3(pos.x, pos.y, pos.z - 1), 0.75, 
		{
			color: [0, 184, 148, 50],
			visible: true,
		});
		this.matosLabel = mp.labels.new("[matos]", new mp.Vector3(pos.x, pos.y, pos.z),
		{
			los: false,
			font: 2,
			drawDistance: 5,
			color: [255, 255, 255, 255],
		});
    }

    createPoint(pos) {
		this.createShape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 1);
		this.createMarker = mp.markers.new(1, new mp.Vector3(pos.x, pos.y, pos.z - 1), 0.75, 
		{
			color: [0, 184, 148, 50],
			visible: true,
		});
		this.createLabel = mp.labels.new("[fabrication]", new mp.Vector3(pos.x, pos.y, pos.z),
		{
			los: false,
			font: 2,
			drawDistance: 5,
			color: [255, 255, 255, 255],
		});
    }

    changeClothesMan(player) {
	}

	changeClothesWoman(player) {
	}
}
const mafia2 = new Mafia2();