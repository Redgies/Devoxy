const misc = require('../sMisc');

class Phone {
    constructor() {
        mp.events.add({
            "sKeys-F6" : (player) => {
                if(!player.loggedIn) return;
                let execute = `app.phone = '${player.phone}';`
                execute += `app.getMessages('${this.getMessages(player.phone)}');`;

                player.call("cPhone-Open", [execute]);
                misc.log.debug(`${player.name} opens phone`);
            }
        });

        // mp.events.addCommand({
		// 	'phone' : (player, fullText) => {
        //         if(!player.loggedIn) return;
        //         let execute = `app.playerMessages('${this.getMessages(player.phone)}');`;

        //         player.call("cPhone-Open", [execute]);
        //         misc.log.debug(`${player.name} opens phone`);
        //     }
        // });
    }

    async getMessages(phone) {
        const messagesList = [];
        
        const d = await misc.query(`SELECT * FROM phoneMessages WHERE receiver = '${phone}' OR sender = '${phone}'`);

        for(let i = 0; i < d.length; i++) {
            const mVar = { 
                id: d[i].id,
                sender: d[i].sender,
                receiver: d[i].receiver,
                text: d[i].text,
                time: d[i].time
            }
            messagesList.push(mVar); 
        }

        console.log(JSON.stringify(messagesList));

        return Promise.resolve(JSON.stringify(messagesList));
	}
}
new Phone();