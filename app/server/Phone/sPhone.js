const misc = require('../sMisc');

let messagesList = [];
let talksList = [];

class Phone {
    constructor() {
        mp.events.add({
            "sKeys-F6" : (player) => {
                if(!player.loggedIn) return;
                let execute = `app.phone = ${player.phone};`;
                execute += `app.d.messages = ${this.getMessageForPlayer(player.phone, 0)};`;
                execute += `app.d.talks = ${this.getTalksForPlayer(player.phone)};`;

                player.call("cPhone-Open", [execute]);
                misc.log.debug(`${player.name} opens phone`);
            },

            "sPhone-updatePlayerMessages" : (player, str) => {
                const d = JSON.parse(str);

                let execute = `app.d.talks = ${this.getTalksForPlayer(player.phone)};`;
                execute += `app.d.messages = ${this.getMessageForPlayer(player.phone, d.talkId)};`;
        

                player.call("cPhone-Update", [execute]);
                misc.log.debug(`${player.name} update phone`);
            },

            "sPhone-sendMessage": (player, str) => {
                const d = JSON.parse(str);

                createMessage(d);

                let execute = `app.d.messages = ${this.getMessageForPlayer(player.phone, d.talkId)};`;

                player.call("cPhone-Update", [execute]);
                misc.log.debug(`${player.name} send message`);
            },

            "sPhone-newMessage": (player, str) => {
                const d = JSON.parse(str);

                var exist = false;
                let execute = '';

                for(let i = 0; i < talksList.length; i++) {
                    if((talksList[i].sender === d.sender || talksList[i].receiver === d.sender) &&
                    talksList[i].sender === d.receiver || talksList[i].receiver === d.receiver)
                    {
                        exist = talksList[i].id;
                        break;
                    }
                }

                if(!exist)
                {
                    createTalk(d);

                    console.log("createTalk");

                    execute += `app.currentTab = 3;`;
                    execute += `app.currentTalk = 0`;
                }
                else
                {
                    d.talk = exist;
                    createMessage(d);

                    console.log("createMEssage");

                    execute += `app.currentTab = 30;`;
                    execute += `app.currentTalk = ${exist}`;
                }

                // const data = {
                //     sender: this.phone,
                //     receiver: this.newNumber,
                //     text: this.newMessage,
                // }

                player.call("cPhone-Update", [execute]);
                misc.log.debug(`${player.name} new message`);
            }
        });
    }

    getMessageForPlayer(phone, talkId) {
        const playerMessages = [];

        for (let i = 0; i < messagesList.length; i++) {
            if(messagesList[i].talk !== talkId) continue;

			const mVar = { 
                id: messagesList[i].id,
                sender: messagesList[i].sender,
                receiver: messagesList[i].receiver,
                text: messagesList[i].text,
                time: messagesList[i].time,
            }
            playerMessages.push(mVar); 
        }

        if(playerMessages.length <= 0)
        {
            const mVar = { 
                id: 1,
                sender: phone,
                receiver: '000000',
                text: '',
                time: '',
            }
            playerMessages.push(mVar);
        }

        // console.log('playerMessages : ' + JSON.stringify(playerMessages));

		return JSON.stringify(playerMessages);
    }
    
    getTalksForPlayer(phone) {
        const playerTalks = [];

        for (let i = 0; i < talksList.length; i++) {

            if(talksList[i].sender !== phone && talksList[i].receiver !== phone) continue;

			const mVar = { 
                id: talksList[i].id,
                sender: talksList[i].sender,
                receiver: talksList[i].receiver,
                text: talksList[i].text,
                time: talksList[i].time,
            }
            playerTalks.push(mVar); 
        }

        // console.log('playerTalks : ' + JSON.stringify(playerTalks));

		return JSON.stringify(playerTalks);
	}
}

async function createTalk(d)
{
    await misc.query(`INSERT INTO phoneTalks (sender, receiver) VALUES ('${d.sender}', '${d.receiver}');`);
    const data = await misc.query(`SELECT id FROM phoneTalks ORDER BY id DESC LIMIT 1`);

    console.log(data[0].id)

    await misc.query(`INSERT INTO phoneMessages (talk, sender, receiver, text) VALUES ('${data[0].id}', '${d.sender}', '${d.receiver}', '${d.text}');`);
}

async function createMessage(d) {
    await misc.query(`INSERT INTO phoneMessages (talk, sender, receiver, text) VALUES ('${d.talk}', '${d.sender}', '${d.receiver}', '${d.text}');`);
}

async function loadMessage() {
    messagesList = [];

    const d = await misc.query("SELECT * FROM phoneMessages");
    for (let i = 0; i < d.length; i++) {

        const mVar = { 
            id: d[i].id,
            talk: d[i].talk,
            sender: d[i].sender,
            receiver: d[i].receiver,
            text: d[i].text,
            time: d[i].time,
        }
        messagesList.push(mVar);
    }
}

async function loadTalks() {
    talksList = [];

    const d = await misc.query(`SELECT T.id, T.sender, T.receiver, M.text, M.time FROM phoneTalks T, phoneMessages M WHERE M.id = (SELECT id FROM phoneMessages WHERE talk = T.id ORDER BY id DESC LIMIT 1) GROUP BY T.id ORDER BY M.time DESC`);
    for (let i = 0; i < d.length; i++) {

        const mVar = { 
            id: d[i].id,
            sender: d[i].sender,
            receiver: d[i].receiver,
            text: d[i].text,
            time: d[i].time,
        }

        talksList.push(mVar);
    }

    return JSON.stringify(talksList);
}
setInterval(function() {
    loadTalks();
    loadMessage();
}, 5000);

new Phone();