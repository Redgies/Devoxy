const misc = require('../sMisc');

class Phone {
    constructor() {
        mp.events.add({
            "sKeys-F6" : (player) => {
                if(!player.loggedIn) return;
                let execute = `app.onlinePlayers('${this.getPlayers()}');`;

                player.call("cPhone-Open", [execute]);
                misc.log.debug(`${player.name} opens tab`);
            }
        });

        mp.events.addCommand({
			'phone' : (player, fullText) => {
                if(!player.loggedIn) return;
                let execute = `app.onlinePlayers('${this.getPlayers()}');`;

                player.call("cPhone-Open", [execute]);
                misc.log.debug(`${player.name} opens tab`);
            }
        });
    }

    getPlayers() {
        const onlinePlayers = [];
		const players = mp.players.toArray();
		for (const p of players) {
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
new Phone();