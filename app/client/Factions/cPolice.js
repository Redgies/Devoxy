
const misc = require('../cMisc');

player = mp.players.local;

mp.events.add(
{
	"cCuff": () => {        
		mp.game.graphics.notify('~g~Hello ~w~World');
        player.setEnableHandcuffs(true);
		player.cuffed = true;
    },
    "cUnCuff": () => {
        player.setEnableHandcuffs(false);
        player.cuffed = false;
	},
	"render": () => {
		if(player.cuffed)
		{
			mp.game.controls.disableControlAction(0, 21, true); // disable sprint
			mp.game.controls.disableControlAction(0, 24, true); // disable attack
			mp.game.controls.disableControlAction(0, 25, true); // disable aim
			mp.game.controls.disableControlAction(0, 47, true); // disable weapon
			mp.game.controls.disableControlAction(0, 58, true); // disable weapon
			mp.game.controls.disableControlAction(0, 263, true); // disable melee
			mp.game.controls.disableControlAction(0, 264, true); // disable melee
			mp.game.controls.disableControlAction(0, 257, true); // disable melee
			mp.game.controls.disableControlAction(0, 140, true); // disable melee
			mp.game.controls.disableControlAction(0, 141, true); // disable melee
			mp.game.controls.disableControlAction(0, 142, true); // disable melee
			mp.game.controls.disableControlAction(0, 143, true); // disable melee
			mp.game.controls.disableControlAction(0, 75, true); // disable exit vehicle
			mp.game.controls.disableControlAction(27, 75, true); // disable exit vehicle
			mp.game.controls.disableControlAction(0, 32, true); // move (w)
			mp.game.controls.disableControlAction(0, 34, true); // move (a)
			mp.game.controls.disableControlAction(0, 33, true); // move (s)
			mp.game.controls.disableControlAction(0, 35, true); // move (d)
		}
	}

});
