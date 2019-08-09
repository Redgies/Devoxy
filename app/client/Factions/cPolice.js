
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
		mp.game.controls.disableControlAction(3, 22, true);
		mp.game.controls.disableControlAction(4, 22, true);
		mp.game.controls.disableControlAction(5, 22, true);
		mp.game.controls.disableControlAction(6, 22, true);
		mp.game.controls.disableControlAction(7, 22, true);
		mp.game.controls.disableControlAction(8, 22, true);
		mp.game.controls.disableControlAction(9, 22, true);
		mp.game.controls.disableControlAction(10, 22, true);
		mp.game.controls.disableControlAction(11, 22, true);
		mp.game.controls.disableControlAction(12, 22, true);
		mp.game.controls.disableControlAction(13, 22, true);
		mp.game.controls.disableControlAction(14, 22, true);
		mp.game.controls.disableControlAction(15, 22, true);
		mp.game.controls.disableControlAction(16, 22, true);
		mp.game.controls.disableControlAction(17, 22, true);
		mp.game.controls.disableControlAction(18, 22, true);
		mp.game.controls.disableControlAction(19, 22, true);
		mp.game.controls.disableControlAction(20, 22, true);
		mp.game.controls.disableControlAction(21, 22, true);
		mp.game.controls.disableControlAction(22, 22, true);
		mp.game.controls.disableControlAction(23, 22, true);
		mp.game.controls.disableControlAction(24, 22, true);
		mp.game.controls.disableControlAction(25, 22, true);
		mp.game.controls.disableControlAction(26, 22, true);
		mp.game.controls.disableControlAction(27, 22, true);
		mp.game.controls.disableControlAction(28, 22, true);
		mp.game.controls.disableControlAction(29, 22, true);
		mp.game.controls.disableControlAction(30, 22, true);
		mp.game.controls.disableControlAction(31, 22, true);
		mp.game.controls.disableControlAction(32, 22, true);
		mp.game.controls.disableControlAction(33, 22, true);
    },
    "cUnCuff": () => {
        player.setEnableHandcuffs(false);
        player.cuffed = false;
    },

});
