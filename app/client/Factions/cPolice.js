
const misc = require('../cMisc');

player = mp.players.local;

mp.events.add(
{
	"cCuff": () => {        
        player.setEnableHandcuffs(true);
		player.cuffed = true;
    },
    "cUnCuff": () => {
        player.setEnableHandcuffs(false);
        player.cuffed = false;
	},
	"render": () => {
		if(player.cuffed === 1)
		{
			mp.game.controls.disableControlAction(0, 22, true); // disable jump
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
			mp.game.controls.disableControlAction(0, 32, true); // move (w)
			mp.game.controls.disableControlAction(0, 34, true); // move (a)
			mp.game.controls.disableControlAction(0, 33, true); // move (s)
			mp.game.controls.disableControlAction(0, 35, true); // move (d)
			mp.game.controls.disableControlAction(0, 37, true);
		}
		else 
		{
			mp.game.controls.disableControlAction(0, 22, false); // disable jump
			mp.game.controls.disableControlAction(0, 21, false); // disable sprint
			mp.game.controls.disableControlAction(0, 24, false); // disable attack
			mp.game.controls.disableControlAction(0, 25, false); // disable aim
			mp.game.controls.disableControlAction(0, 47, false); // disable weapon
			mp.game.controls.disableControlAction(0, 58, false); // disable weapon
			mp.game.controls.disableControlAction(0, 263, false); // disable melee
			mp.game.controls.disableControlAction(0, 264, false); // disable melee
			mp.game.controls.disableControlAction(0, 257, false); // disable melee
			mp.game.controls.disableControlAction(0, 140, false); // disable melee
			mp.game.controls.disableControlAction(0, 141, false); // disable melee
			mp.game.controls.disableControlAction(0, 142, false); // disable melee
			mp.game.controls.disableControlAction(0, 143, false); // disable melee
			mp.game.controls.disableControlAction(0, 32, false); // move (w)
			mp.game.controls.disableControlAction(0, 34, false); // move (a)
			mp.game.controls.disableControlAction(0, 33, false); // move (s)
			mp.game.controls.disableControlAction(0, 35, false); // move (d)
			mp.game.controls.disableControlAction(0, 37, false);
		}
	}

});
