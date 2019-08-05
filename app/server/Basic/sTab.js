const misc = require('../sMisc');

class Tab {
    constructor() {
        mp.events.add({
            "sKeys-TAB" : (player) => {
                if(!player.loggedIn) return;
                let execute = `app.onlinePlayers('${this.getPlayers()}');`;

                player.call("cTab-Open", [execute]);
                misc.log.debug(`${player.name} opens tab`);
            }
        });
    }

    getPlayers() {
        const onlinePlayers = mp.players.toArray();
		return JSON.stringify(onlinePlayers);
	}
}
new Tab();