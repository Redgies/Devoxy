const misc = require('../../sMisc');
const faction = require('../sFaction');

const factionData = {
    id: 2,
    name: "Benny's Original Motor Works",
    ranks: [
        "Dépanneur",
        "Mécanicien",
        "Carrossier",
        "Pimper",
        "Chef d'équipe",
        "Directeur",
    ],
    maxRank: 6,
    servicePoint: {
        x: -201.815,
        y: -1314.437,
        z: 31.089,
    },
    blip: {
        scale: 0.8,
        color: 4,
        model: 72,
        pos: {
            x: -205.961,
            y: -1307.645,
        } 
    }
}

class Bennys extends faction {
	constructor() {
        super(factionData.id, factionData.name, factionData.ranks, factionData.maxRank);

        this.createEvents();
        this.createServicePoint(factionData.servicePoint);
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
        mp.events.add({
            "playerEnterColshape" : (player, shape) => {
                if(!player.loggedIn || !this.isInThisFaction(player)) return;
    
                if(shape === this.serviceShape)
                {
                    player.canChangeClothes = true;
                    player.notify("Appuyez ~b~E ~w~pour vous mettre en service.");
                }
                
            },
            "playerExitColshape" : (player, shape) => {
                if(!player.loggedIn || !this.isInThisFaction(player)) return;
                
                if(shape === this.serviceShape)
                    player.canChangeClothes = false;
            },
            "sKeys-E" : (player) => {
                if(!player.loggedIn || !this.isInThisFaction(player)) return;
    
                if(player.canChangeClothes)
                    this.changeClothes(player);
            },
        });

        mp.events.addCommand({	
            "rank" : (player, fullText, target, rank) => {
                target = misc.findPlayerByIdOrNickname(target);

                target.rank = parseInt(rank);

                player.notify('rank : ' + target.rank);
            }
        });
    }

    createServicePoint(pos) {
		this.serviceShape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 1);
		this.serviceMarker = mp.markers.new(1, new mp.Vector3(pos.x, pos.y, pos.z - 1), 0.75, 
		{
			color: [0, 184, 148, 50],
			visible: true,
		});
		this.serviceLabel = mp.labels.new("[service]", new mp.Vector3(pos.x, pos.y, pos.z),
		{
			los: false,
			font: 2,
			drawDistance: 5,
			color: [255, 255, 255, 255],
		});
    }



    changeClothesMan(player) {
        if(player.rank == 1)
        {
            player.setProp(0, 46, 0);
            player.setClothes(6, 25, 0, 2);
            player.setClothes(4, 41, 0, 2);
            player.setClothes(11, 55, 0, 2);
            player.setClothes(7, 0, 0, 2);
        }
        if(player.rank == 2)
        {
            player.setProp(0, 46, 0);
            player.setClothes(8, 129, 0, 2); 
            player.setClothes(6, 25, 0, 2);
            player.setClothes(4, 35, 0, 2);
            player.setClothes(11, 55, 0, 2);
            player.setClothes(7, 0, 0, 2);
        }
        if(player.rank == 3)
        {
            player.setProp(0, 46, 0);
            player.setClothes(8, 58, 0, 2); 
            player.setClothes(6, 25, 0, 2);
            player.setClothes(4, 35, 0, 2);
            player.setClothes(11, 55, 0, 2);
            player.setClothes(7, 0, 0, 2);
        }
        if(player.rank == 4)
        {
            player.setProp(0, 46, 0);
            player.setClothes(8, 58, 0, 2); 
            player.setClothes(6, 25, 0, 2);
            player.setClothes(4, 35, 0, 2);
            player.setClothes(11, 55, 0, 2);
            player.setClothes(10, 8, 1, 2);
            player.setClothes(7, 0, 0, 2);
        }
        if(player.rank == 5)
        {
            player.setProp(0, 46, 0);
            player.setClothes(8, 58, 0, 2); 
            player.setClothes(6, 25, 0, 2);
            player.setClothes(4, 35, 0, 2);
            player.setClothes(11, 43, 0, 2);
            player.setClothes(3, 11, 0, 2);
            player.setClothes(7, 0, 0, 2);
        }
        if(player.rank == 6)
        {
            player.setClothes(6, 25, 0, 2);
            player.setClothes(4, 35, 0, 2);
            player.setClothes(11, 26, 0, 2);
            player.setClothes(3, 11, 0, 2);
            player.setClothes(7, 125, 0, 2);
        }
	}

	changeClothesWoman(player) {
        if(player.rank == 1)
        {
            player.setProp(0, 45, 0);
            player.setClothes(6, 25, 0, 2);
            player.setClothes(4, 77, 0, 2);
            player.setClothes(11, 48, 0, 2);
            player.setClothes(7, 0, 0, 2);
        }
        if(player.rank == 2)
        {
            player.setProp(0, 45, 0);
            player.setClothes(8, 152, 0, 2); 
            player.setClothes(6, 25, 0, 2);
            player.setClothes(4, 77, 0, 2);
            player.setClothes(11, 48, 0, 2);
            player.setClothes(7, 0, 0, 2);
        }
        if(player.rank == 3)
        {
            player.setProp(0, 45, 0);
            player.setClothes(8, 35, 0, 2); 
            player.setClothes(6, 25, 0, 2);
            player.setClothes(4, 77, 0, 2);
            player.setClothes(11, 48, 0, 2);
            player.setClothes(7, 0, 0, 2);
        }
        if(player.rank == 4)
        {
            player.setProp(0, 45, 0);
            player.setClothes(8, 35, 0, 2); 
            player.setClothes(6, 25, 0, 2);
            player.setClothes(4, 77, 0, 2);
            player.setClothes(11, 48, 0, 2);
            player.setClothes(10, 7, 1, 2);
            player.setClothes(7, 0, 0, 2);
        }
        if(player.rank == 5)
        {
            player.setProp(0, 45, 0);
            player.setClothes(8, 35, 0, 2); 
            player.setClothes(6, 25, 0, 2);
            player.setClothes(4, 77, 0, 2);
            player.setClothes(11, 85, 0, 2);
            player.setClothes(7, 0, 0, 2);
        }
        if(player.rank == 6)
        {
            player.setClothes(6, 25, 0, 2);
            player.setClothes(4, 77, 0, 2);
            player.setClothes(11, 43, 0, 2);
            player.setClothes(7, 95, 0, 2);
        }
	}
}
const bennys = new Bennys();