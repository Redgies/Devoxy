const misc = require('../sMisc');

async function tryVipCode(player, code) {
    player.outputChatBox("test 2 : " + code);

    const d = await misc.query(`SELECT payment_status, payment_type, payment_code_used FROM paiements WHERE payment_code = '${code}' LIMIT 1`);
    if (!d[0]) {
        return showError(player, "Le code entré est incorrecte.");
    }
    if(d[0].payment_status != 'approved')
    {
        return showError(player, "Ce code n'est pas encore disponible.");
    }
    if(d[0].payment_code_used == 1)
    {
        return showError(player, "Ce code est déjà utilisé.");
    }

    player.notify("d[0].payment_type : " + d[0].payment_type);

    let msg = '';

    if(d[0].payment_type == 1)
    {
        player.vip = 1;
        player.changeMoney(+300000);
        msg = "Vous avez activé votre Pack VIP. (utilisez /save)";
    }
    if(d[0].payment_type == 2)
    {
        player.whitewash = 1;
        player.changeMoney(+100000);
        msg = "Vous avez activé votre Pack Blanchisseur.  (utilisez /save";
    }
    if(d[0].payment_type == 3)
    {
        player.changeMoney(+600000);
        msg = "Vous avez activé votre Pack Argent I.  (utilisez /save";
    }
    if(d[0].payment_type == 4)
    {
        player.changeMoney(+1500000);
        msg = "Vous avez activé votre Pack Argent II.  (utilisez /save";
    }

    await misc.query(`UPDATE paiements SET payment_code_used = 1 WHERE payment_code = '${code}' LIMIT 1`);
    
    return showSuccess(player, msg);
}

function showError(player, text) {
    player.notify(text);
    player.call("cInjectCef", [`app.showError('${text}');`]);
}

function showSuccess(player, text) {
    player.notify(text);
    player.call("cInjectCef", [`app.showSuccess('${text}');`]);
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