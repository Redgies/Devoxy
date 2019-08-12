const misc = require('../../sMisc');
const faction = require('../sFaction');
const clothes = require('../../Character/sClothes');

const factionData = {
    id: 4,
    name: "Emergency Medical Services",
    ranks: [
        "Infirmier", 
        "Médecin",
        "Urgentiste",
        "Médecin en chef",
        "Directeur",
    ],
    maxRank: 5,
    servicePoint: {
		x:266.443, 
		y: -1365.262, 
		z: 24.538
	},
	exitPoint: {
		x: 275.66, 
		y: -1361.243, 
		z: 24.538,
		rot: 47.5,
	},
	enterPoint: {
		x: 294.39, 
		y: -1448.559, 
		z: 29.967, 
		rot: 315.6,
	},
	soinsPoint: {
		x: 264.499, 
		y: -1355.101, 
		z: 24.538
	},
    blip: {
        scale: 0.8,
        color: 49,
        model: 80, 
        pos: {
			x: 303.802, 
			y: -1443.077
        } 
    },
}

class Hospital extends faction {
	constructor() {
		super(factionData.id, factionData.name, factionData.ranks, factionData.maxRank);

		this.createEvents();
		this.createServicePoint(factionData.servicePoint);
		this.createExitPoint(factionData.exitPoint);
		this.createEnterPoint(factionData.enterPoint);
		this.createSoinsPoint(factionData.soinsPoint);
		this.createBlip();
	}

	createBlip() {
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
				if(shape === this.exitShape)
                {
                    player.canExitHospital = true;
				}
				if(shape === this.enterShape)
                {
                    player.canEnterHospital = true;
				}
				if(shape === this.soinsShape)
                {
					player.canSoinsHospital = true;
					player.notify("Appuyez ~b~E ~w~pour vous soigner (~g~500$~w~).");
				}

                if(!player.loggedIn || !this.isInThisFaction(player)) return;
    
                if(shape === this.serviceShape)
                {
                    player.canChangeClothes = true;
                    player.notify("Appuyez ~b~E ~w~pour vous mettre en service.");
                }
            },
            "playerExitColshape" : (player, shape) => {
				if(shape === this.exitShape)
                {
                    player.canExitHospital = false;
				}
				if(shape === this.enterShape)
                {
                    player.canEnterHospital = false;
				}
				if(shape === this.soinsShape)
                {
                    player.canSoinsHospital = false;
				}

                if(!player.loggedIn || !this.isInThisFaction(player)) return;
                
                if(shape === this.serviceShape)
                    player.canChangeClothes = false;
            },
            "sKeys-E" : (player) => {
				if(player.canExitHospital)
				{
					const pos = {
						x: factionData.enterPoint.x,
						y: factionData.enterPoint.y,
						z: factionData.enterPoint.z,
						rot: factionData.enterPoint.rot,
					}

					player.tp(pos);
				}
				if(player.canEnterHospital)
				{
					const pos = {
						x: factionData.exitPoint.x,
						y: factionData.exitPoint.y,
						z: factionData.exitPoint.z,
						rot: factionData.exitPoint.rot,
					}

					player.tp(pos);
				}
				if(player.canSoinsHospital)
				{
					if (player.money.cash < 500)
                    return player.notify("~r~Vous n'avez pas assez sur vous.");

					player.changeMoney(-500);
					player.health = 100;

					player.notify("~g~Vous êtes maintent soigné.");
               	 	
				}

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

	createSoinsPoint(pos) {
		this.soinsShape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 1);
		this.soinsMarker = mp.markers.new(1, new mp.Vector3(pos.x, pos.y, pos.z - 1), 0.75, 
		{
			color: [0, 184, 148, 50],
			visible: true,
		});
		this.soinsLabel = mp.labels.new("[soins]", new mp.Vector3(pos.x, pos.y, pos.z),
		{
			los: false,
			font: 2,
			drawDistance: 5,
			color: [255, 255, 255, 255],
		});
	}

	createExitPoint(pos) {
		this.exitShape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 1);
		this.exitMarker = mp.markers.new(0, new mp.Vector3(pos.x, pos.y, pos.z - 1), 0.75, 
		{
			color: [116, 185, 255, 50],
			visible: true,
		});
	}

	createEnterPoint(pos) {
		this.enterShape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 1);
		this.enterMarker = mp.markers.new(0, new mp.Vector3(pos.x, pos.y, pos.z - 1), 0.75, 
		{
			color: [116, 185, 255, 50],
			visible: true,
		});
	}
	
	changeClothesMan(player) {
        if(player.rank == 1)
        {
			player.setClothes(3, 85, 0, 2); // TORSO
			player.setClothes(6, 8, 0, 2); // SHOES
			player.setClothes(4, 96, 0, 2);  // LEGS
			player.setClothes(11, 250, 0, 2); // TOP
			player.setClothes(8, 129, 0, 2); // CEINTURE RADIO
            player.setClothes(10, 57, 0, 2); // PARAMEDIC
        }
        if(player.rank == 2)
        {
			player.setClothes(3, 15, 0, 2); // TORSO
			player.setClothes(6, 54, 0, 2); // SHOES
			player.setClothes(4, 49, 0, 2);  // LEGS
			player.setClothes(11, 250, 0, 2); // TOP
			player.setClothes(8, 129, 0, 2); // CEINTURE RADIO
            player.setClothes(10, 57, 0, 2); // PARAMEDIC
        }
        if(player.rank == 3)
        {
			player.setClothes(3, 15, 0, 2); // TORSO
			player.setClothes(6, 54, 0, 2); // SHOES
			player.setClothes(4, 49, 0, 2);  // LEGS
			player.setClothes(11, 250, 0, 2); // TOP
			player.setClothes(8, 129, 0, 2); // CEINTURE RADIO
            player.setClothes(10, 57, 0, 2); // PARAMEDIC
        }
        if(player.rank == 4)
        {
			player.setClothes(3, 15, 0, 2); // TORSO
			player.setClothes(6, 54, 0, 2); // SHOES
			player.setClothes(4, 49, 0, 2);  // LEGS
			player.setClothes(11, 250, 0, 2); // TOP
			player.setClothes(8, 129, 0, 2); // CEINTURE RADIO
            player.setClothes(10, 57, 0, 2); // PARAMEDIC
        }
	}

	changeClothesWoman(player) {
        if(player.rank == 1)
        {
			player.setClothes(10, 66, 0, 2); // PARAMEDIC
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
	}
}
const hospital = new Hospital();