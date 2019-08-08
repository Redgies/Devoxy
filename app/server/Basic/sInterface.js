const misc = require('../sMisc');

class Interface {
    constructor() {
        mp.events.add({
            "sKeys-F3" : (player) => {
                if(!player.loggedIn) return;

                let target = misc.getNearestPlayer(player, 1);

                // player.target = target;

                let execute = `app.targetPlayer('${JSON.stringify(target)}');`;

                // let execute = `app.phone = ${player.phone};`;
                // execute += `app.d.messages = ${this.getMessageForPlayer(player.phone, 0)};`;
                // execute += `app.d.talks = ${this.getTalksForPlayer(player)};`;
                // execute += `app.d.contacts = ${this.getContactsForPlayer(player)};`;

                player.call("cInterface-Open", [execute]);
                misc.log.debug(`${player.name} opens interface`);
            },
            "sInterface-giveMoney": (player, data) => {
                const d = JSON.parse(data);

                console.log("data : " + data);

                let target = findPlayerByIdOrNickname(d.id);
                if(!target) return;

                player.target.money.cash += parseInt(d.money);
                player.money.cash -= parseInt(d.money);
                console.log("sInterface-giveMoney id : " + d.id + " money : " + d.money);
                // let execute = `app.whoName = '${player.name}';`;
                // execute += `app.whoId = ${player.target.id};`;
                // execute += `app.wantText = 'Veux te donner de l'oseil kwa;`;
                // execute += `app.priceText = 'nike ta mère'`;
                // execute += `app.price = ${money};`;
                // player.target.call("cMisc-CreateChooseWindow", [player.lang, execute, "test", "test"]);
        
                // const d = JSON.parse(str);

                // updateContact(d);

                // let execute = `app.d.contacts = ${this.getContactsForPlayer(player)};`;
                // player.call("cPhone-Update", [execute]);
                // misc.log.debug(`${player.name} phone update contact`);
            },
        });
    }
}

new Interface();