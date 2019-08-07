class Doors {
    constructor() {
        this.doorsPoints = [
            {x: 434.7479, y: -983.2151, z: 30.83926, opened: false },
            {x: 434.7479, y: -980.6184, z: 30.83926, opened: false },
        ];

        this.createShapes();

        mp.events.add({
            "playerEnterColshape" : (player, shape) => {
                if (!player.loggedIn) return;

                console.log("test");

                player.doorId = shape.doorId;

                player.notify(`${i18n.get('basic', 'pressEToOpenMenu', player.lang)}`);
            },
            "playerExitColshape" : (player, shape) => {
                if (!player.loggedIn) return;
              
                player.doorId = false;
            },
            
			"sKeys-E" : (player) => {
                if (!player.loggedIn || !player.doorId) return;
                
                for(let i = 0; i < this.doorsPoints; i++)
                {
                    if(i !== player.doorId) continue;

                    player.notify(`${this.doorsPoints[i].x}, ${this.doorsPoints[i].y}, ${this.doorsPoints[i].z}`);
                }
            },
        });
    }

    createShapes() {
        for(let i = 0; i < this.doorsPoints.length; i++) {
            // const marker = mp.markers.new(1, new mp.Vector3(this.doorsPoints[i].x, this.doorsPoints[i].y, this.doorsPoints[i].z), 30,
            // {
            //     color: [255, 165, 0, 50],
            //     visible: true,
            // });

            const colshape = mp.colshapes.newSphere(this.doorsPoints[i].x, this.doorsPoints[i].y, this.doorsPoints[i].z, 3);
            colshape.doorId = i;

            console.log('new door : ' + colshape);
        }
    }
}

// open = false
// mp.game.object.doorControl(door._model, door._position.x, door._position.y, door._position.z, false, 0.0, 50.0, 0.0);
