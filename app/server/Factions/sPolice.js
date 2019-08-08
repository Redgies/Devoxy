const misc = require('../sMisc');
const faction = require('./sFaction');

const factionData = {
    id: 1,
    name: "Los Santos Police Departement",
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
    servicePoint: {
        x: 458.955,
        y: -992.82,
        z: 30.69,
    },
    giletPoint: {
        x: 457.351, 
        y: -988.938, 
        z: 30.69,
    }
}

class Police extends faction {
	constructor() {
        super(factionData.id, factionData.name, factionData.ranks, factionData.maxRank);

        this.createEvents();
        this.createServicePoint(factionData.servicePoint);
        this.createGiletPoint(factionData.giletPoint);
    }

    createEvents() {
        mp.events.add({
            "playerEnterColshape" : (player, shape) => {
                if(!player.loggedIn || !this.isInThisFaction(player)) return;
    
                if(shape === this.serviceShape)
                {
                    player.canChangeClothes = true;
                    player.notify("Appuyez ~b~E ~w~pour vous mettre en service.")
                }
            },
            "playerExitColshape" : (player, shape) => {
                if(!player.loggedIn || !this.isInThisFaction(player)) return;
                
                if(shape == this.serviceShape)
                    player.canChangeClothes = false;
            },
            "sKeys-E" : (player) => {
                if(!player.loggedIn || !this.isInThisFaction(player)) return;
    
                if(player.canChangeClothes)
                    this.changeClothes(player);
            },
        });
    }

    createServicePoint(pos) {
		this.serviceShape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 1);
		this.serviceMarker = mp.markers.new(1, new mp.Vector3(pos.x, pos.y, pos.z - 1), 0.75, 
		{
			color: [0, 184, 148, 100],
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
    
    createGiletPoint(pos) {
		this.giletShape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 1);
		this.giletMarker = mp.markers.new(1, new mp.Vector3(pos.x, pos.y, pos.z - 1), 0.75, 
		{
			color: [0, 184, 148, 100],
			visible: true,
		});
		this.giletLabel = mp.labels.new("[gilet]", new mp.Vector3(pos.x, pos.y, pos.z),
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
            player.setClothes(4, 35, 0, 2);
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
            player.setClothes(7, 95, 0, 2);
        }
        if(player.rank == 7)
        {
            player.setClothes(6, 25, 0, 2);
            player.setClothes(4, 35, 0, 2);
            player.setClothes(11, 13, 0, 2);
            player.setClothes(3, 11, 0, 2);
            player.setClothes(7, 125, 0, 2);
            player.setClothes(8, 0, 0, 2);

            player.armour = 100;
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
        if(player.rank == 7)
        {
            player.setClothes(6, 25, 0, 2);
            player.setClothes(4, 77, 0, 2);
            player.setClothes(11, 73, 0, 2);
            player.setClothes(3, 14, 0, 2);
            player.setClothes(7, 95, 0, 2);
            player.setClothes(8, 0, 0, 2);

            player.armour = 100;
        }
	}
}
const police = new Police();