const misc = require('../sMisc');

class Doors {
    constructor() {
        this.doorsPoints = [
            {id: 0, model: 0, x: 0, y: 0, z: 0, open: false }, // NE PAS UTILISER
            {id: 1, model: 320433149, x: 434.7479, y: -983.2151, z: 30.83926, open: false, faction: 1 }, // COMICO GAUCHE DROITE
            {id: 2, model: -1215222675, x: 434.7479, y: -980.6184, z: 30.83926, open: false, faction: 1 }, // COMICO AVANT GAUCHE
            {id: 3, model: -2023754432, x: 469.9679, y: -1014.452, z: 26.5362, open: false, faction: 1 }, // COMICO ARRIERE DROITE
            {id: 4, model: -2023754432, x: 467.3716, y: -1014.452, z: 26.53623, open: false, faction: 1 }, // COMICO ARRIERE GAUCHE
            {id: 5, model: 631614199, x: 461.8065, y: -994.4086, z: 25.06443, open: false, faction: 1 }, // COMICO CELLULE 1
            {id: 6, model: 631614199, x: 461.8065, y: -997.6583, z: 25.06443, open: false, faction: 1 }, // COMICO CELLULE 2
            {id: 7, model: 631614199, x: 461.8065, y: -1001.302, z: 25.06443, open: false, faction: 1 }, // COMICO CELLULE 3
            {id: 8, model: -550347177, x: -356.0905, y: -134.7714, z: 40.01295, open: true, faction: 2 }, // LOS SANTOS CUSTOM 1
            {id: 9, model: -550347177, x: -1145.898, y: -1991.144, z: 14.18357, open: true, faction: 2 }, // LOS SANTOS CUSTOM
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
                    if(this.doorsPoints[i].faction !== player.faction) continue;

                    this.doorsPoints[i].open = !this.doorsPoints[i].open;

                    for(const p of mp.players.toArray()) {
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
