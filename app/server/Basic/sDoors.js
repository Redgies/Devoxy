const misc = require('../sMisc');

class Doors {
    constructor() {
        this.doorsPoints = [
            {id: 0, model: 0, x: 0, y: 0, z: 0, open: false },
            {id: 1, model: 320433149, x: 434.7479, y: -983.2151, z: 30.83926, open: false },
            {id: 2, model: -1215222675, x: 434.7479, y: -980.6184, z: 30.83926, open: false },
        ];

        this.createShapes();

        mp.events.add({
            "playerJoin" : player => {
                player.call("cDoor-Create", [this.doorsPoints]);
            },
            "playerEnterColshape" : (player, shape) => {
                if (!player.loggedIn) return;

                player.doorId = shape.doorId;
            },
            "playerExitColshape" : (player, shape) => {
                if (!player.loggedIn) return;
              
                player.doorId = false;
            },
            
			"sKeys-E" : (player) => {
                if(!player.loggedIn || !player.doorId) return;

                for(let i = 0; i < this.doorsPoints.length; i++)
                {
                    if(i !== player.doorId) continue;

                    player.outputChatBox(`${this.doorsPoints[i].x}, ${this.doorsPoints[i].y}, ${this.doorsPoints[i].z}, open : ${this.doorsPoints[i].open}`);

                    this.doorsPoints[i].open = !this.doorsPoints[i].open;

                    for(const p of mp.players.toArray()) {
                        p.outputChatBox('cDoor-Update');
                        p.call("cDoor-Update", [this.doorsPoints[i]]);
                    }
                }
            },
        });
    }

    createShapes() {
        for(let i = 0; i < this.doorsPoints.length; i++) {
            const colshape = mp.colshapes.newSphere(this.doorsPoints[i].x, this.doorsPoints[i].y, this.doorsPoints[i].z - 1, 2);
            colshape.doorId = i;
        }
    }
}
new Doors();
