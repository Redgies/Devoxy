
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
