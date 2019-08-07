const misc = require('../cMisc');

const doors = [];

mp.events.add({
	"cDoor-Update" : (d) => {
        mp.gui.chat.push('model : ' + d.model);
        mp.game.object.doorControl(d.model, d.x, d.y, d.z, d.open, 0.0, 0.0, 0.0);

        for(let i = 0; i < doors.length; i++)
        {
            if(i !== d.id) continue;

            doors[i].label.text = d.open ? '[E] ~r~[Fermé]' : '[E] ~g~[Ouvert]';
        }
    },
    
    "cDoor-Create" : (d) => {
        for(let i = 0; i < d.length; i++)
        {
            const dVar = {
                open: d[i].open,
            }

            dVar.label = mp.labels.new(dVar.open ? '[E] ~r~[Fermé]' : '[E] ~g~[Ouvert]', new mp.Vector3(d[i].x, d[i].y, d[i].z),
            {
                los: false,
                font: 0,
                drawDistance: 3.5,
                color: [255,255,255,255],
                dimension: 0
            });

            doors.push(dVar);
        }
    }
});