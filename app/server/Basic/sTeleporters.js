const misc = require('../sMisc');

const teleporters = [
    {id: 1, enter: {x: -1044.319, y: -231.174, z: 39.014}, exit: {x: -1045.97, y: -231.915, z: 39.014}} 
]

class Teleporter {
    constructor(d) {

        console.log("le monopole");
        
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
                    player.canEnter = 1;

                if(shape == this.exitShape)
                    player.canExit = 1;
            },
            "playerExitColshape" : (player, shape) => {
                if (!player.loggedIn) return;
              
                if(shape == this.enterShape)
                    player.canEnter = 0;

                if(shape == this.exitShape)
                    player.canExit = 0;
            },
            
			"sKeys-E" : (player) => {
                if(!player.loggedIn || !player.doorId) return;

                if(player.canEnter)
                {
                    const d = {
                        x: this.exit.x, 
                        y: this.exit.y, 
                        z: this.exit.z
                    }
                    player.tp(d);
                }
                if(player.canExit)
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
