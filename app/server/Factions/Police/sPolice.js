const misc = require('../../sMisc');
const faction = require('../sFaction');
const clothes = require('../../Character/sClothes');

const factionData = {
    id: 1,
    name: "Los Santos Police Departement",
    surname: "LSPD",
    ranks: [
        "Cadet",
        "Officier", 
        "Officier supérieur",
        "Sergent",
        "Lieutenant",
        "Capitaine",
        "Commandant",
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
    },
    weaponPoint: {
        x: 452.194, 
        y: -980.08, 
        z: 30.69,
    },
    cellulesPoint: [
        {x: 459.551, y: -1001.676, z: 24.915},
        {x: 459.165, y: -997.912, z: 24.915},
        {x: 460.044, y: -994.33, z: 24.915},
    ],
    blip: {
        scale: 0.8,
        color: 38,
        model: 526, 
        pos: {
            x: 445.839,
            y: -996.392,
        } 
    },
    cautionPoint: {
        x: 1689.233, 
        y: 2529.437, 
        z: 45.565
    }
}

class Police extends faction {
	constructor() {
        super(factionData.id, factionData.name, factionData.surname, factionData.ranks, factionData.maxRank);

        this.createEvents();
        this.createServicePoint(factionData.servicePoint);
        this.createGiletPoint(factionData.giletPoint);
        this.createWeaponPoint(factionData.weaponPoint);
        this.createCellulesPoint(factionData.cellulesPoint);
        this.createCautionPoint(factionData.cautionPoint);
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
			"delit": (player, fullText, arg1) => {
                if(!this.isInThisFaction(player) || !this.isWorking(player)) return;

                let target = misc.findPlayerByIdOrNickname(arg1);
				if(!target)
                    return player.notify("~r~Cette personne n'est pas connecté.");

                let message = fullText.substr(arg1.length + 1, fullText.length);

                // if(message.length <= 0)
                //     return player.notify("~r~Utilisez /delit id message");

                target.addDelit(message.replace(/'/g, ' '));
                player.notifyWithPicture("Police", "", `Vous avez ajouté un délit à ${target.name} : ${message}.`, "CHAR_CALL911");
            }
        });
        mp.events.add({
            "playerExitVehicle" : (player) => {
                if(player.cuffed) player.setCuff(true);
            },  
            "playerEnterColshape" : (player, shape) => {
                if(shape === this.cellule1 || shape === this.cellule2 || shape === this.cellule3)
                {
                    player.canGoToJail = true; 
                }
                if(shape == this.cautionShape) 
                {
                    player.canPayCaution = true;
                    player.notifyWithPicture("Police", "", `Votre caution pour être libéré s'élève à ~g~${player.delits.length * 2500}$.`, "CHAR_CALL911");
                }

                if(!player.loggedIn || !this.isInThisFaction(player)) return;
    
                if(shape === this.serviceShape)
                {
                    player.canChangeClothes = true;
                    player.notify("Appuyez ~b~E ~w~pour vous mettre en service.");
                }

                if(shape === this.giletShape)
                {
                    player.notify("Appuyez ~b~E ~w~pour équiper un gilet.");
                    player.canTakeGilet = true;
                }

                if(shape === this.weaponShape)
                {
                    player.notify("Appuyez ~b~E ~w~pour équiper vos armes.");
                    player.canTakeWeapon = true;
                }
            },
            "playerExitColshape" : (player, shape) => {
                if(shape === this.cellule1 || shape === this.cellule2 || shape === this.cellule3)
                {
                    player.canGoToJail = false; 
                }
                if(shape == this.cautionShape) 
                {
                    player.canPayCaution = false;
                }

                if(!player.loggedIn || !this.isInThisFaction(player)) return;
                
                if(shape === this.serviceShape)
                    player.canChangeClothes = false;
                if(shape === this.giletShape)
                    player.canTakeGilet = false;
                if(shape === this.weaponShape)
                    player.canTakeWeapon = false;
            },
            "sKeys-E" : (player) => {
                if(player.canPayCaution) 
                {
                    let caution = player.delits.length * 2500;
                    if (player.money.cash < caution)
                        return player.notify("~r~Vous n'avez pas assez sur vous.");

                    player.changeMoney(-caution);

                    player.jailed = 0;

                    const pos = {
                        x: 1846.348, 
                        y: 2585.804, 
                        z: 45.672,
                        rot: 269.27
                    }

                    player.delits = [];

                    player.tp(pos);

                    player.notify("~g~Vous êtes maintenant libre.");

                    clothes.loadPlayerClothes(player);
                }

                if(!player.loggedIn || !this.isInThisFaction(player)) return;
    
                if(player.canChangeClothes)
                    this.changeClothes(player);
                if(player.canTakeGilet)
                    this.takeGilet(player);
                if(player.canTakeWeapon)
                    this.takeWeapons(player);
            },
        });
    }

    createCautionPoint(pos) {
        this.cautionShape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 1);
        this.cautionLabel = mp.labels.new("[caution]", new mp.Vector3(pos.x, pos.y, pos.z),
		{
			los: false,
			font: 2,
			drawDistance: 3,
			color: [255, 255, 255, 255],
        });
        this.cautionMarker = mp.markers.new(1, new mp.Vector3(pos.x, pos.y, pos.z - 1), 0.75, 
		{
			color: [255, 255, 255, 50],
			visible: true,
		});
    }

    createCellulesPoint(cellules) {
        this.cellule1 = mp.colshapes.newSphere(cellules[0].x, cellules[0].y, cellules[0].z, 2);
        this.cellule2 = mp.colshapes.newSphere(cellules[1].x, cellules[1].y, cellules[2].z, 2);
        this.cellule3 = mp.colshapes.newSphere(cellules[2].x, cellules[2].y, cellules[2].z, 2);

        this.cellule1Label = mp.labels.new("[cellule 1]", new mp.Vector3(cellules[0].x, cellules[0].y, cellules[0].z),
		{
			los: false,
			font: 2,
			drawDistance: 3,
			color: [255, 255, 255, 255],
        });
        
        this.cellule2Label = mp.labels.new("[cellule 2]", new mp.Vector3(cellules[1].x, cellules[1].y, cellules[2].z),
		{
			los: false,
			font: 2,
			drawDistance: 3,
			color: [255, 255, 255, 255],
        });
        
        this.cellule3Label = mp.labels.new("[cellule 3]", new mp.Vector3(cellules[2].x, cellules[2].y, cellules[2].z),
		{
			los: false,
			font: 2,
			drawDistance: 3,
			color: [255, 255, 255, 255],
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
    
    createGiletPoint(pos) {
		this.giletShape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 1);
		this.giletMarker = mp.markers.new(1, new mp.Vector3(pos.x, pos.y, pos.z - 1), 0.75, 
		{
			color: [9, 132, 227, 50],
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

    createWeaponPoint(pos) {
		this.weaponShape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 1);
		this.weaponMarker = mp.markers.new(1, new mp.Vector3(pos.x, pos.y, pos.z - 1), 0.75, 
		{
			color: [9, 132, 227, 50],
			visible: true,
		});
		this.weaponLabel = mp.labels.new("[armurerie]", new mp.Vector3(pos.x, pos.y, pos.z),
		{
			los: false,
			font: 2,
			drawDistance: 5,
			color: [255, 255, 255, 255],
		});
    }
    
    takeGilet(player) {
        if(player.rank <= 1)
            return player.notify("~r~Le gilet est accessible à partir du grade Officier.");
        if(!this.isWorking(player))
            return player.notify("~r~Vous devez être en service.");

        player.armour = 50;

        if(player.model === 1885233650)
            player.setClothes(8, 131, 0, 2); 
        else 
            player.setClothes(8, 161, 0, 2); 
    }

    takeWeapons(player) {
        if(!this.isWorking(player))
            return player.notify("~r~Vous devez être en service.");

        player.resetAllWeapons();

        player.setWeapon(0x678B81B1, 1);
        player.setWeapon(0x3656C8C1, 100);

        if(player.rank == 1)
        {
            player.setWeapon(0x1B06D571, 150);
        }
        if(player.rank >= 2)
        {
            player.setWeapon(0x99AEEB3B, 150);
        }
        if(player.rank >= 4)
        {
            player.setWeapon(0x1D073A89, 100);
        }
        if(player.rank >= 6)
        {
            player.setWeapon(0xEFE7E2DF, 300);
        }
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
            player.setClothes(7, 125, 0, 2);
        }
        if(player.rank == 7)
        {
            player.setClothes(6, 25, 0, 2);
            player.setClothes(4, 35, 0, 2);
            player.setClothes(11, 13, 0, 2);
            player.setClothes(3, 11, 0, 2);
            player.setClothes(7, 125, 0, 2);
            player.setClothes(8, 15, 0, 2);

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