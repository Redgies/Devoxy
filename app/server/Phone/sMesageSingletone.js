
const misc = require('../../sMisc');

const Vehicle = require('./sMessage');



class MessageSingleton {
	constructor() {
		
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
const messageSingleton = new MessageSingleton();
module.exports = messageSingleton;
