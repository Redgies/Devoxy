
const misc = require('../cMisc');

player = mp.players.local;

mp.events.add(
{
	"cCuff": () => {        
		mp.game.graphics.notify('~g~Hello ~w~World');
        player.setEnableHandcuffs(true);
		player.cuffed = true;
		mp.game.controls.disableControlAction(0, 21, true);
		mp.game.controls.disableControlAction(1, 21, true);
		mp.game.controls.disableControlAction(2, 21, true);
		mp.game.controls.disableControlAction(3, 21, true);
		mp.game.controls.disableControlAction(4, 21, true);
		mp.game.controls.disableControlAction(5, 21, true);
		mp.game.controls.disableControlAction(6, 21, true);
		mp.game.controls.disableControlAction(7, 21, true);
		mp.game.controls.disableControlAction(8, 21, true);
		mp.game.controls.disableControlAction(9, 21, true);
		mp.game.controls.disableControlAction(10, 21, true);
		mp.game.controls.disableControlAction(11, 21, true);
		mp.game.controls.disableControlAction(12, 21, true);
		mp.game.controls.disableControlAction(13, 21, true);
		mp.game.controls.disableControlAction(14, 21, true);
		mp.game.controls.disableControlAction(15, 21, true);
		mp.game.controls.disableControlAction(16, 21, true);
		mp.game.controls.disableControlAction(17, 21, true);
		mp.game.controls.disableControlAction(18, 21, true);
		mp.game.controls.disableControlAction(19, 21, true);
		mp.game.controls.disableControlAction(20, 21, true);
		mp.game.controls.disableControlAction(21, 21, true);
		mp.game.controls.disableControlAction(22, 21, true);
		mp.game.controls.disableControlAction(23, 21, true);
		mp.game.controls.disableControlAction(24, 21, true);
		mp.game.controls.disableControlAction(25, 21, true);
		mp.game.controls.disableControlAction(26, 21, true);
		mp.game.controls.disableControlAction(27, 21, true);
		mp.game.controls.disableControlAction(28, 21, true);
		mp.game.controls.disableControlAction(29, 21, true);
		mp.game.controls.disableControlAction(30, 21, true);
		mp.game.controls.disableControlAction(31, 21, true);
		mp.game.controls.disableControlAction(32, 21, true);
		mp.game.controls.disableControlAction(33, 21, true);
		mp.game.controls.disableControlAction(2, 19, true);
    },
    "cUnCuff": () => {
        player.setEnableHandcuffs(false);
        player.cuffed = false;
    },

});
