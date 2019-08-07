const misc = require('../cMisc');

const doors = [];

mp.events.add({
	"cDoor-Update" : (d) => {
        mp.gui.chat.push('model : ' + d.model);
        mp.game.object.doorControl(d.model, d.x, d.y, d.z, d.open, 0.0, 0.0, 0.0);
    },
    
    "cDoor-Create" : (d) => {
        for(let i = 0; i < d.length; i++)
        {
            const dVar = {
                open: d[i].open,
            }

            dVar.label = mp.labels.new(dVar.open ? '~r~[Fermé]' : '~g~[Ouvert]', new mp.Vector3(d[i].x, d[i].y, d[i].z),
            {
                los: false,
                font: 1,
                drawDistance: 3.5,
                color: [255,255,255,255],
                dimension: 0
            });

            doors.push(dVar);
        }
    }
});