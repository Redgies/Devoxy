const misc = require('../../sMisc');
const faction = require('../sFaction');

const factionData = {
    id: 5,
    name: "Mafia 1",
    surname: "mafia 1",
    ranks: [
        "Dépanneur",
        "Mécanicien",
        "Carrossier",
        "Pimper",
        "Chef d'équipe",
        "Directeur",
    ],
    maxRank: 6,
    matosPoint: {
        x: 1009.998, 
        y: -2892.902, 
        z: 11.26
    },
    createPoint: {
        x: 146.154, 
        y: -2199.973,
        z: 4.688
    },
}

class Mafia1 extends faction {
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
                    player.notify("Appuyez ~b~E ~w~pour acheter du matos (~g~5000$~w~ les 100 matos).");
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
                    if(player.money.cash < 5000)
                        return player.notify("~r~Vous n'avez pas assez sur vous.");

                    player.changeMoney(-5000);
                    player.giveItem("item_matos", "Matos", 100);

                    player.notify("Vous avez acheté 100 matos pour ~g~5000$~w~.")
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
		this.createLabel = mp.labels.new("[fabriquation]", new mp.Vector3(pos.x, pos.y, pos.z),
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
const mafia1 = new Mafia1();