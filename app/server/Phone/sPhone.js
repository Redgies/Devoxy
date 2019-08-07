const misc = require('../sMisc');

let messagesList = [];
let talksList = [];
let contactsList = [];

class Phone {
    constructor() {
        mp.events.add({
            "sKeys-F6" : (player) => {
                if(!player.loggedIn) return;

                console.log("test");

                let execute = `app.phone = ${player.phone};`;
                execute += `app.d.messages = ${this.getMessageForPlayer(player.phone, 0)};`;
                execute += `app.d.talks = ${this.getTalksForPlayer(player)};`;
                execute += `app.d.contacts = ${this.getContactsForPlayer(player)};`;

                player.call("cPhone-Open", [execute]);
                misc.log.debug(`${player.name} opens phone`);
            },

            "sPhone-updatePlayerMessages" : (player, str) => {
                const d = JSON.parse(str);

                let execute = `app.d.talks = ${this.getTalksForPlayer(player)};`;
                execute += `app.d.messages = ${this.getMessageForPlayer(player.phone, d.talkId)};`;
                execute += `app.d.contacts = ${this.getContactsForPlayer(player)};`;
        

                player.call("cPhone-Update", [execute]);
                misc.log.debug(`${player.name} update phone`);
            },

            "sPhone-updateContact": (player, str) => {
                const d = JSON.parse(str);

                console.log("contact : " + str);

                updateContact(d);

                let execute = `app.d.contact = ${this.getContactsForPlayer(player)};`;
                player.call("cPhone-Update", [execute]);
                misc.log.debug(`${player.name} phone update contact`);
            },

            "sPhone-sendMessage": (player, str) => {
                const d = JSON.parse(str);

                createMessage(d);

                console.log("fdp fdp fdp");

                let execute = `app.d.messages = ${this.getMessageForPlayer(player.phone, d.talkId)};`;
                execute += `app.d.contact = ${this.getContactsForPlayer(player)};`;

                player.call("cPhone-Update", [execute]);
                misc.log.debug(`${player.name} send message`);
            },

            "sPhone-newMessage": (player, str) => {
                const d = JSON.parse(str);

                var exist = false;
                let execute = '';

                for(let i = 0; i < talksList.length; i++) {
                    if((talksList[i].sender == d.sender || talksList[i].receiver == d.sender) &&
                    (talksList[i].sender == d.receiver || talksList[i].receiver == d.receiver))
                    {
                        console.log("exist : " + talksList[i].id);
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

                execute = `app.d.messages = ${this.getMessageForPlayer(player.phone, exist)};`;
                execute += `app.d.contacts = ${this.getContactsForPlayer(player)};`;


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
    
    getTalksForPlayer(player) {
        const playerTalks = [];

        for (let i = 0; i < talksList.length; i++) {

            if(talksList[i].sender !== player.phone && talksList[i].receiver !== player.phone) continue;

            const mVar = { 
                id: talksList[i].id,
                sender: talksList[i].sender,
                receiver: talksList[i].receiver,
                text: talksList[i].text,
                time: talksList[i].time,
                firstName: (player.phone == talksList[i].sender ? talksList[i].receiver : talksList[i].sender),
                lastName: 'A'
            }

            for(let j = 0; j < contactsList.length; j++)
            {
                if((contactsList[j].guid !== player.guid) || mVar.firstName !== contactsList[j].phone) continue;

                mVar.firstName = contactsList[j].firstName;
                mVar.lastName = contactsList[j].lastName;
            }

            playerTalks.push(mVar); 
        }

		return JSON.stringify(playerTalks);
    }
    
    getContactsForPlayer(player) {
        const playerContacts = [];

        for (let i = 0; i < contactsList.length; i++) {

            if(contactsList[i].guid !== player.guid) continue;

			const mVar = { 
                id: contactsList[i].id,
                phone: contactsList[i].phone,
                firstName: contactsList[i].firstName,
                lastName: contactsList[i].lastName,
            }
            playerContacts.push(mVar); 
        }

        // console.log('playerTalks : ' + JSON.stringify(playerTalks));

		return JSON.stringify(playerContacts);
	}
}

async function updateContact(d)
{
    await misc.query(`UPDATE phoneContacts SET phone = '${d.phone}', firstName = '${d.firstName}', lastName = '${d.lastName}' WHERE id = '${d.id}'`);
}

async function createTalk(d)
{
    await misc.query(`INSERT INTO phoneTalks (sender, receiver) VALUES ('${d.sender}', '${d.receiver}');`);
    const data = await misc.query(`SELECT id FROM phoneTalks ORDER BY id DESC LIMIT 1`);

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
}

async function loadContacts() {
    contactsList = [];

    const d = await misc.query(`SELECT * FROM phoneContacts`);
    for (let i = 0; i < d.length; i++) {

        const mVar = { 
            id: d[i].id,
            guid: d[i].user_id,
            phone: d[i].phone,
            firstName: d[i].firstName,
            lastName: d[i].lastName,
        }

        contactsList.push(mVar);
    }
}

setInterval(function() {
    loadTalks();
    loadMessage();
    loadContacts();
}, 500);

new Phone();