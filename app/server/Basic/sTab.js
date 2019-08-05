const misc = require('../sMisc');

class Tab {
    constructor() {
        mp.events.add({
            "sKeys-F5" : (player) => {
                if(!player.loggedIn) return;
                let execute = `app.onlinePlayers('${this.getPlayers()}');`;

                player.call("cTab-Open", [execute]);
                misc.log.debug(`${player.name} opens tab`);
            }
        });

        mp.events.addCommand({
			'list' : (player, fullText) => {
                if(!player.loggedIn) return;
                let execute = `app.onlinePlayers('${this.getPlayers()}');`;

                player.call("cTab-Open", [execute]);
                misc.log.debug(`${player.name} opens tab`);
            }
        });
    }

    getPlayers() {
        const onlinePlayers = [];
		const players = mp.players.toArray();
		for(const p of players) {
			if(!p.loggedIn) continue;
			const pVar = {
                id: p.id,
                guid: p.guid,
                aduty: p.aduty,
				name: p.name,
				loyality: p.loyality,
				ping: p.ping
			}
			onlinePlayers.push(pVar);
        }

        return JSON.stringify(onlinePlayers);
	}
}
new Tab();