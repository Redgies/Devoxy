const misc = require('../sMisc');

const teleporters = [
    {id: 1, enter: {x: -1044.319, y: -231.174, z: 39.014}, exit: {x: -1045.97, y: -231.915, z: 39.014}},
    {id: 2, enter: {x: -1080.868, y: -259.95, z: 37.809}, exit: {x: -1081.818, y: -258.402, z: 37.76}},
    {id: 3, enter: {x: 254.179, y: 225.224, z: 101.876}, exit: {x: 253.404, y: 223.28, z: 101.683}}, 
    {id: 4, enter: {x: 133.869, y: -2203.325, z: 7.187}, exit: {x: 135.319, y: -2203.347, z: 7.309}},
    {id: 5, enter: {x: -1389.052, y: -587.329, z: 30.223}, exit: {x: -1387.912, y: -588.479, z: 30.32}}, // BAHAMA MAMAS
    {id: 5, enter: {x: 16.576, y: -1115.601, z: 29.791}, exit: {x: 17.011, y: -1114.116, z: 29.809}}, // ammunation centre
    {id: 6, enter: {x: -545.137, y: -204.164, z: 38.215}, exit: {x: 136.397, y: -761.089, z: 242.152}}, // MAIRIE
    {id: 7, enter: {x: -1075.244, y: -253.32, z: 44.021}, exit: {x: -1072.7, y: -246.547, z: 54.006}},
    {id: 8, enter: {x: 129.073, y: -1298.813, z: 29.233}, exit: {x: 128.168, y: -1297.644, z: 29.27}},
    {id: 9, enter: {x: 95.817, y: -1285.721, z: 29.269}, exit: {x: 95.093, y: -1284.503, z: 29.272}},
    {id: 10, enter: {x: 1394.86,y: 1141.705, z: 114.622}, exit: {x: 1397.313, y: 1141.967, z: 114.334}}, // MADRAZO INTERIOR    
]

class Teleporter {
    constructor(d) {
        
        this.id = d.id;
        this.enter = {};
        this.enter.x = d.enter.x;
        this.enter.y = d.enter.y;
        this.enter.z = d.enter.z;
        this.exit = {};
        this.exit.x = d.exit.x;
        this.exit.y = d.exit.y;
        this.exit.z = d.exit.z;
        this.createShapes();

        mp.events.add({
            "playerEnterColshape" : (player, shape) => {
                if (!player.loggedIn) return;

                if(shape == this.enterShape)
                    player.canEnter = this.id;

                if(shape == this.exitShape)
                    player.canExit = this.id;
            },
            "playerExitColshape" : (player, shape) => {
                if (!player.loggedIn) return;
              
                if(shape == this.enterShape)
                    player.canEnter = 0;

                if(shape == this.exitShape)
                    player.canExit = 0;
            },
            
			"sKeys-E" : (player) => {
                if(!player.loggedIn) return;

                if(player.canEnter == this.id)
                {
                    const d = {
                        x: this.exit.x, 
                        y: this.exit.y, 
                        z: this.exit.z
                    }
                    player.tp(d);
                }
                if(player.canExit == this.id)
                {
                    const d = {
                        x: this.enter.x, 
                        y: this.enter.y, 
                        z: this.enter.z
                    }
                    player.tp(d);
                }
            },
        });
    }

    createShapes() {
        this.enterShape = mp.colshapes.newSphere(this.enter.x, this.enter.y, this.enter.z, 1);
		this.enterMarker = mp.markers.new(1, new mp.Vector3(this.enter.x, this.enter.y, this.enter.z - 1), 0.75, 
		{
            color: [9, 132, 227, 50],
			visible: true,
        });
        this.exitShape = mp.colshapes.newSphere(this.exit.x, this.exit.y, this.exit.z, 1);
		this.exitMarker = mp.markers.new(1, new mp.Vector3(this.exit.x, this.exit.y, this.exit.z - 1), 0.75, 
		{
            color: [9, 132, 227, 50],
			visible: true,
		});
    }
}


for (let i = 0; i < teleporters.length; i++) {
    new Teleporter(teleporters[i]);
}
