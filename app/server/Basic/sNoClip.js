mp.events.addCommand('savecam', (player, name = 'No name') => {
    if (player.adminLvl < 1) return;
    player.call('getCamCoords', [name]);
});
const saveFile = 'savedposcam.txt';
mp.events.add('saveCamCoords', (player, position, pointAtCoord, name = 'No name') => {
    const pos = JSON.parse(position);
    const point = JSON.parse(pointAtCoord);

    fs.appendFile(saveFile, `Position: ${pos.x}, ${pos.y}, ${pos.z} | pointAtCoord: ${point.position.x}, ${point.position.y}, ${point.position.z} | entity: ${point.entity} - ${name}\r\n`, (err) => {
        if (err) {
            player.notify(`~r~SaveCamPos Error: ~w~${err.message}`);
        } else {
            player.notify(`~g~PositionCam saved. ~w~(${name})`);
        }
    });
});

const misc = require('../sMisc');

class NoClip {
    constructor() {
        mp.events.add({
            "sKeys-F2" : player => {
                if(player.adminLvl < 1) return;

                player.fly = !player.fly;
                player.call("cNoclip-Update", [player.fly]);

            }
        });
    }
}
new NoClip();