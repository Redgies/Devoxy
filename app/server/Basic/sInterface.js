const misc = require('../sMisc');

class Interface {
    constructor() {
        mp.events.add({
            "sKeys-F3" : (player) => {
                if(!player.loggedIn) return;

                let target = misc.getNearestPlayer(player, 3);

                console.log(JSON.stringify(target));

                let execute = `app.currentTab = 0;`;
                execute += `app.target = ${target};`

                // let execute = `app.phone = ${player.phone};`;
                // execute += `app.d.messages = ${this.getMessageForPlayer(player.phone, 0)};`;
                // execute += `app.d.talks = ${this.getTalksForPlayer(player)};`;
                // execute += `app.d.contacts = ${this.getContactsForPlayer(player)};`;

                player.call("cInterface-Open", [execute]);
                misc.log.debug(`${player.name} opens interface`);
            },
        });
    }
}

new Interface();