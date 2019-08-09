
const misc = require('../cMisc');

player = mp.players.local;

mp.events.add(
{
	"cCuff": () => {        
		mp.game.graphics.notify('~g~Hello ~w~World');
        player.setEnableHandcuffs(true);
		player.cuffed = true;
		mp.game.controls.disableControlAction(0, 22, true);
		mp.game.controls.disableControlAction(1, 22, true);
		mp.game.controls.disableControlAction(2, 22, true);
		mp.game.controls.disableControlAction(32, 22, true);
		mp.game.controls.disableControlAction(2, 15, true);
    },
    "cUnCuff": () => {
        player.setEnableHandcuffs(false);
        player.cuffed = false;
    },

});
