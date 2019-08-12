const misc = require('../sMisc');

const locationsData = [
    {pos: {x:-1038.748, y: -2731.016, z: 20.169}} // AEROPORT
];


class Location {
    constructor(d)
    {
        // this.pos.x = d.pos.x;
        // this.pos.y = d.pos.y;
        // this.pos.z = d.pos.z;

        // this.createEvents();
        // this.createShape();
    }

    createEvents() {
        mp.events.add({
            "playerEnterColshape" : (player, shape) => {
                if(shape === this.shape) {
                    player.notifyWithPicture("Appuyez ~b~E~w~ pour louer un véhicule (~g~500$~w~)");
                    player.canLocate = true;
                }
            },
            "playerExitColshape" : (player, shape) => {
                if(shape === this.shape)
                    player.canLocate = false;
            },
            "sKeys-E" : (player) => {
                if(player.canLocate) 
                {
                    let price = 500;
                    if (player.location) 
                        return player.notify("~r~Vous avez déjà loué un véhicule de location.");
                    if (player.money.cash < price)
                        return player.notify("~r~Vous n'avez pas assez sur vous.");

                    const d = {
                        model: 'faggio2',
                        coord: misc.getPlayerCoordJSON(player),
                        id: 0,
                        title: 'Pegassi Faggio',
                        fuel: 1,
                        fuelTank: 5,
                        fuelRate: 2,
                        price: 1,
                        ownerId: 0,
                        whoCanOpen: JSON.stringify([player.guid]),
                        factionId: 0,
                        numberPlate: this.generateRandomNumberPlate(),
                        primaryColor: JSON.stringify([misc.getRandomInt(0, 159), misc.getRandomInt(0, 159), misc.getRandomInt(0, 159)]),
                        secondaryColor: JSON.stringify([misc.getRandomInt(0, 159), misc.getRandomInt(0, 159), misc.getRandomInt(0, 159)]),
                    }
                    new Vehicle(d);
                    misc.log.debug(`${player.name} spawned faggio2`);

                    player.changeMoney(-price);
                    player.location = 1;
                    player.notify("~g~Vous avez loué un véhicule.");
                }
            },
        });
    }

    createShape() {
        this.shape = mp.colshapes.newSphere(this.pos.x, this.pos.y, this.pos.z, 1);
        this.label = mp.labels.new("[location]", new mp.Vector3(this.pos.x, this.pos.y, this.pos.z),
		{
			los: false,
			font: 2,
			drawDistance: 3,
			color: [255, 255, 255, 255],
        });
        this.marker = mp.markers.new(1, new mp.Vector3(this.pos.x, this.pos.y, this.pos.z - 1), 0.75, 
		{
            color: [225, 112, 85, 50],
			visible: true,
		});
    }
}

for(let i = 0; i < locationsData.length; i++)
{
    console.log("new location");
    new Location(locationsData[i]);
}

module.exports = location;