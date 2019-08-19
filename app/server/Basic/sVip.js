const misc = require('../sMisc');

async function tryVipCode(player, code) {
    player.outputChatBox("test 2 : " + code);

    const d = await misc.query(`SELECT payment_status, payment_type, payment_code_used FROM paiements WHERE payment_code = '${code}' LIMIT 1`);
    if (!d[0]) {
        return showError(player, "Ce code n'éxiste pas !");
    }

    if(d[0].payment_code_used == 1)
    {
        return showError(player, "Ce code est déjà utilisé");
    }

    return showError(player, "Ce code est correct.");
}

function showError(player, text) {
    player.call("cInjectCef", [`app.showError('${text}');`]);
}

mp.events.addCommand({
    "vip" : (player) => {
        if (!player.loggedIn) return;

        player.call("cVip-Open", []);
        misc.log.debug(`${player.name} open vip panel`);
    },
});

mp.events.add({
    "sVip-CheckCode" : async (player, code) => {
        player.outputChatBox("test 1 : " + code);
        tryVipCode(player, code);
    },
});