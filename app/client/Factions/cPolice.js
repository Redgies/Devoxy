
const misc = require('../cMisc');

player = mp.players.local;
player.cuffed = false;

mp.game.controls.enableAllControlActions(0);

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
		if(player.cuffed === true)
		{
			mp.gui.chat.push("cuffed");
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
			mp.game.controls.enableAllControlActions(0);
			mp.gui.chat.push("uncuffed");
		}
	}

});
