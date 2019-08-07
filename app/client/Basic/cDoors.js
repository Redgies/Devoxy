const misc = require('../cMisc');

mp.events.add({
	"cDoor-Update" : (d) => {
        alert(JSON.stringify(d));
        mp.game.object.doorControl(d.model, d.x, d.y, d.z, d.open, 0.0, 50.0, 0.0);
	},
});