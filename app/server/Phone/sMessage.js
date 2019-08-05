
const misc = require('../sMisc');

const messagesList = [];

class Message {
	constructor (d) {
        this.id = d.id;
        this.sender = d.sender;
        this.receiver = d.receiver;
        this.text = d.text;
        this.time = d.time;

        messagesList.push(this);
    }

    getMessageForPlayer(phone) {
		const playerMessages = [];
		for (const msg of messagesList) {
            if(msg.receiver !== phone && msg.sender !== phone) continue;

			const mVar = { 
                id: d[i].id,
                sender: d[i].sender,
                receiver: d[i].receiver,
                text: d[i].text,
                time: d[i].time
            }
            playerMessages.push(mVar); 
		}
		return JSON.stringify(playerMessages);
	}
    
}

async function loadMessage() {
	const d = await misc.query("SELECT * FROM phoneMessages");
	for (let i = 0; i < d.length; i++) {
		new Message(d[i]);
    }
    
    console.log("message load");
}
loadMessage();



module.exports = Message;
