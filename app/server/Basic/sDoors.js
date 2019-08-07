const misc = require('../sMisc');

class Doors {
    constructor() {
        this.doorsPoints = [
            {model: '320433149', x: 434.7479, y: -983.2151, z: 30.83926, open: false },
            {model: '-1215222675', x: 434.7479, y: -980.6184, z: 30.83926, open: false },
        ];

        this.createShapes();

        mp.events.add({
            "playerEnterColshape" : (player, shape) => {
                if (!player.loggedIn) return;

                player.doorId = shape.doorId;

                player.notify(`press E for baiser ta mère : ${player.doorId}`);
            },
            "playerExitColshape" : (player, shape) => {
                if (!player.loggedIn) return;
              
                player.doorId = false;
            },
            
			"sKeys-E" : (player) => {
                console.log("press E");
                if(!player.loggedIn || !player.doorId) return;

                console.log("press E 2");

                console.log('doors : ' + JSON.stringify(this.doorsPoints));
                
                for(let i = 0; i < this.doorsPoints.length; i++)
                {
                    console.log("press E 3");
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
            
            const marker = mp.markers.new(1, new mp.Vector3(this.doorsPoints[i].x, this.doorsPoints[i].y, this.doorsPoints[i].z - 1), 3,
            {
                color: [255, 165, 0, 50],
                visible: true,
            });

            const colshape = mp.colshapes.newSphere(this.doorsPoints[i].x, this.doorsPoints[i].y, this.doorsPoints[i].z - 1, 3);
            colshape.doorId = i;
        }
    }
}
new Doors();

// open = false
// mp.game.object.doorControl(door._model, door._position.x, door._position.y, door._position.z, false, 0.0, 50.0, 0.0);
