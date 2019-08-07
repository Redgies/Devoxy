const misc = require('../cMisc');

mp.events.add({
	"cDoor-Update" : (d) => {
        mp.gui.chat.push('door : ' + JSON.stringify(d));
        mp.gui.chat.push('model : ' + d.model);
        mp.game.object.doorControl(d.model, d.x, d.y, d.z, true, 0.0, 0.0, 0.0);
	},
});