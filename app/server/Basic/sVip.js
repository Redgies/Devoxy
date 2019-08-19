const misc = require('../sMisc');


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
        loginSingleton.tryVipCode(player, code);
    },
});