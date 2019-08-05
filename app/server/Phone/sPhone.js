const misc = require('../sMisc');

const messagesList = [];
const talksList = [];

class Phone {
    constructor() {
        mp.events.add({
            "sKeys-F6" : (player) => {
                if(!player.loggedIn) return;
                let execute = `app.phone = ${player.phone};`;
                execute += `app.d.messages = ${this.getMessageForPlayer(player.phone)};`;
                execute += `app.d.talks = ${this.getTalksForPlayer(player.phone)};`;

                player.call("cPhone-Open", [execute]);
                misc.log.debug(`${player.name} opens phone`);
            }
        });
    }

    getMessageForPlayer(phone) {
        const playerMessages = [];
        for (let i = 0; i < messagesList.length; i++) {
            if(messagesList[i].receiver !== phone && messagesList[i].sender !== phone) continue;

			const mVar = { 
                id: messagesList[i].id,
                sender: messagesList[i].sender,
                receiver: messagesList[i].receiver,
                text: messagesList[i].text,
                time: messagesList[i].time,
            }
            playerMessages.push(mVar); 
        }
		return JSON.stringify(playerMessages);
    }
    
    getTalksForPlayer(phone) {
        const playerTalks = [];
        for (let i = 0; i < talksList.length; i++) {
            if(talksList[i].receiver !== phone && talksList[i].sender !== phone) continue;

			const mVar = { 
                id: talksList[i].id,
                sender: talksList[i].sender,
                receiver: talksList[i].receiver,
            }
            playerTalks.push(mVar); 
        }
		return JSON.stringify(playerTalks);
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

async function loadTalks() {
    const d = await misc.query("SELECT * FROM phoneTalks");
    for (let i = 0; i < d.length; i++) {

        const mVar = { 
            id: d[i].id,
            sender: d[i].sender,
            receiver: d[i].receiver,
        }
        talksList.push(mVar);
    }
}
loadTalks();

new Phone();