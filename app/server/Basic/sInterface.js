const misc = require('../sMisc');

class Interface {
    constructor() {
        mp.events.add({
            "sKeys-F3" : (player) => {
                if(!player.loggedIn) return;

                let target = misc.getNearestPlayer(player, 1);

                if(target)
                    player.targetId = target.id;

                console.log("target id : " + target.id);



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

                console.log("player.targetId : " + player.targetId);

                console.log("data : " + data);

                let target = misc.findPlayerByIdOrNickname(player.targetId);
                if(!target) return;

                target.changeMoney(+d.money);
                player.changeMoney(-d.money);

                console.log("sInterface-giveMoney id : " + target.id + " money : " + d.money);
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