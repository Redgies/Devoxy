const misc = require('../../sMisc');
const time = require('../../sTime');
const faction = require('../sFaction');
const clothes = require('../../Character/sClothes');

const factionData = {
    id: 6,
    name: "Live Invader",
    surname: "Life Inv.",
    ranks: [
        "Cadet",
        "Officier", 
        "Officier supérieur",
        "Sergent",
        "Lieutenant",
        "Commissaire",
        "Capitaine",
    ],
    maxRank: 6,
    announcePoint: {
        x: -1082.238, 
        y: -247.605, 
        z: 37.763
    },
    blip: {
        scale: 0.8,
        color: 48,
        model: 43, 
        pos: {
            x: -1067.374, 
            y: -244.212
        } 
    },
}

class LifeInvader extends faction {
	constructor() {
        super(factionData.id, factionData.name, factionData.surname, factionData.ranks, factionData.maxRank);

        this.createEvents();
        this.createAnnouncePoint(factionData.announcePoint);
        this.createBlip();
    }

    createBlip()
    {
        this.blip = mp.blips.new(factionData.blip.model, new mp.Vector3(factionData.blip.pos.x, factionData.blip.pos.y, 0),
        {   
            scale: factionData.blip.scale,
            name: factionData.name,
            color: factionData.blip.color,
            shortRange: true,
        });
    }

    createEvents() {
        mp.events.addCommand({	
			"annonce": (player, fullText) => {
                if (!player.canMakeAnnounce) return;
                if (fullText.length <= 0) return player.notify("~r~Vous devez entrer une annonce.");

                if (player.money.cash < 500)
                return player.notify("~r~Vous n'avez pas assez sur vous.");

                player.changeMoney(-500);

                mp.players.broadcast(`!{#fdcb6e}[${time.getTime()}] [ANNONCE] ${player.name} [${player.id}] : ${fullText}`);
				misc.log.debug(`${player.name} ${fullText}`);
            }
        });
        mp.events.add({ 
            "playerEnterColshape" : (player, shape) => {
                if(shape === this.announceShape)
                {
                    player.notify("Utiliser ~b~/annonce ~w~ pour faire une annonce (~g~500$~w~).");
                    player.canMakeAnnounce = 1; 
                }
            },
            "playerExitColshape" : (player, shape) => {
                if(shape === this.announceShape)
                {   
                    player.canMakeAnnounce = 0; 
                }
            },
        });
    }

    createAnnouncePoint(pos) {
		this.announceShape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 1);
		this.announceMarker = mp.markers.new(1, new mp.Vector3(pos.x, pos.y, pos.z - 1), 0.75, 
		{
			color: [9, 132, 227, 50],
			visible: true,
		});
		this.announceLabel = mp.labels.new("[annonce]", new mp.Vector3(pos.x, pos.y, pos.z),
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
const lifeinvader = new LifeInvader();