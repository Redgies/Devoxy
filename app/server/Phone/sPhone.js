const misc = require('../sMisc');
const mysql = require("./sMysql");

let messagesList = [];
// let talksList = [];

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
            },

            "sPhone-updatePlayerMessages" : (player) => {
                // const mVar = { 
                //     id: messagesList.length + 1,
                //     sender: 123456,
                //     receiver: 555555,
                //     text: 'bogoss va',
                //     time: '2019-09-05 03:41:36',
                // }
                // messagesList.push(mVar);

                let execute = `app.d.messages = ${this.getMessageForPlayer(player.phone)};`;

                // player.notify("update");
                

                player.call("cPhone-Update", [execute]);
                misc.log.debug(`${player.name} update phone`);
            },
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
        const talksList = [];

        mysql.query(`SELECT * FROM phoneTalks WHERE sender = ? OR receiver = ?`, [phone, phone], function(err, result)
        {
            if (err) throw err;
            console.log(result);
        });

        // const d = misc.dbquery(`SELECT * FROM phoneTalks WHERE sender = '${phone}' OR receiver = '${phone}'`);
        // for (let i = 0; i < d.length; i++) {
    
        //     const e = misc.dbquery(`SELECT * FROM phoneMessages WHERE talk = '${d[i].id}' ORDER BY id DESC LIMIT 1`);
    
        //     const mVar = { 
        //         id: d[i].id,
        //         sender: d[i].sender,
        //         receiver: d[i].receiver,
        //         text: e[0].text,
        //         time: e[0].time,
        //     }
    
        //     talksList.push(mVar);
        // }
    
        // console.log('loaddTalks : ' + JSON.stringify(talksList));
    
        // return JSON.stringify(talksList);

        // console.log('talklist : ' + JSON.stringify(talksList));

        // const playerTalks = [];
        // for (let i = 0; i < talksList.length; i++) {

        //     if(talksList[i].sender !== phone || talksList[i].receiver !== phone) continue;

		// 	const mVar = { 
        //         id: talksList[i].id,
        //         sender: talksList[i].sender,
        //         receiver: talksList[i].receiver,
        //         text: talksList[i].text,
        //         time: talksList[i].time,
        //     }
        //     playerTalks.push(mVar); 
        // }

        // console.log('talks : ' + JSON.stringify(playerTalks));

		// return JSON.stringify(playerTalks);
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

    console.log(JSON.stringify(messagesList));
}
loadMessage();

// async function loadTalks(phone) {
//     talksList = [];

//     const d = await misc.query(`SELECT * FROM phoneTalks WHERE sender = '${phone}' OR receiver = '${phone}'`);
//     for (let i = 0; i < d.length; i++) {

//         const e = await misc.query(`SELECT * FROM phoneMessages WHERE talk = '${d[i].id}' ORDER BY id DESC LIMIT 1`);

//         const mVar = { 
//             id: d[i].id,
//             sender: d[i].sender,
//             receiver: d[i].receiver,
//             text: e[0].text,
//             time: e[0].time,
//         }

//         talksList.push(mVar);
//     }

//     console.log('loaddTalks : ' + JSON.stringify(talksList));

//     return JSON.stringify(talksList);
// }

new Phone();