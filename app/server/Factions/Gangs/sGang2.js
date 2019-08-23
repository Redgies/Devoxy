const misc = require('../../sMisc');
const faction = require('../sFaction');
const invAPI = require("../../3rd/inventory.js");

const factionData = {
    id: 9,
    name: "Vagos",
    surname: "Vagos",
    ranks: [
        "Recrue",
        "Soldat",
        "Gros bras",
        "Assassin",
        "Sous-Boss",
        "Boss",
    ],
    maxRank: 6,
    matosPoint: {
        x: 313.703, 
        y: -2055.702, 
        z: 20.356
    },
}

class Gang2 extends faction {
	constructor() {
        super(factionData.id, factionData.name, factionData.surname, factionData.ranks, factionData.maxRank);

        this.createEvents();
        this.matosPoint(factionData.matosPoint);
    }

    createEvents() {
        mp.events.add({
            "playerEnterColshape" : (player, shape) => {
                if(!player.loggedIn || !this.isInThisFaction(player)) return;
    
                if(shape === this.matosShape)
                {
                    player.canBuyMatos = true;
                    player.notify("Appuyez ~b~E ~w~pour acheter de la weed (~g~150$~w~ les 1g).");
                }
                
            },
            "playerExitColshape" : (player, shape) => {
                if(!player.loggedIn || !this.isInThisFaction(player)) return;
                
                if(shape === this.matosShape)
                    player.canBuyMatos = false;
            },
            "sKeys-E" : (player) => {
                if(!player.loggedIn || !this.isInThisFaction(player)) return;

                if(player.canBuyMatos)
                {
                    if(player.money.cash < 150)
                        return player.notify("~r~Vous n'avez pas assez sur vous.");

                    player.changeMoney(-150);
                    player.giveItem("item_weed", "Weed", 1);

                    player.notify("Vous avez acheté 1g de weed pour ~g~150$~w~.")
                }
            },
        });
    }

    matosPoint(pos) {
		this.matosShape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 1);
		this.matosMarker = mp.markers.new(1, new mp.Vector3(pos.x, pos.y, pos.z - 1), 0.75, 
		{
			color: [0, 184, 148, 50],
			visible: true,
		});
		this.matosLabel = mp.labels.new("[weed]", new mp.Vector3(pos.x, pos.y, pos.z),
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
const gang2 = new Gang2();