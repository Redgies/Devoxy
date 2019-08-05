const misc = require('../sMisc');

const messagesList = [];

class Phone {
    constructor() {
        mp.events.add({
            "sKeys-F6" : (player) => {
                if(!player.loggedIn) return;
                let execute = `app.phone = ${player.phone};`;
                execute += `app.getMessages('${this.getMessageForPlayer(player.phone)}');`;

                player.call("cPhone-Open", [execute]);
                misc.log.debug(`${player.name} opens phone`);
            }
        });
    }

    getMessageForPlayer(phone) {
		const playerMessages = [];
		for (const msg of messagesList) {
            // if(msg.receiver !== phone && msg.sender !== phone) continue;

			var mVar = { 
                id: msg.id,
                sender: msg.sender,
                receiver: msg.receiver,
                text: msg.text,
                time: msg.time,
            }
            playerMessages.push(mVar); 
        }
        const str = JSON.stringify(playerMessages);
		return str;
	}
}


async function loadMessage() {
    const d = await misc.query("SELECT * FROM phoneMessages");
    for (let i = 0; i < d.length; i++) {

        const mVar = { 
            id: d[i].id,
            sender: d[i].sender,
            receiver: d[i].receiver,
            text: d[i].text,
            time: d[i].time,
        }
        messagesList.push(mVar);
    }
}
loadMessage();

new Phone();