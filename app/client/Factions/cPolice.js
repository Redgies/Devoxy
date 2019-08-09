
const misc = require('../cMisc');

player = mp.players.local;

mp.events.add(
{
	"cCuff": () => {        
        player.setEnableHandcuffs(true);
		player.cuffed = true;
		mp.game.controls.disableControlAction(0, 22, true);
		mp.game.controls.disableControlAction(1, 22, true);
		mp.game.controls.disableControlAction(2, 22, true);
		mp.game.controls.disableControlAction(32, 22, true);
    },
    "cUnCuff": () => {
        player.setEnableHandcuffs(false);
        player.cuffed = false;
    },

});
