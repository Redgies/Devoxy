const misc = require('../sMisc');

class Interface {
    constructor() {
        mp.events.add({
            "sKeys-F3" : (player) => {
                if(!player.loggedIn) return;

                let target = misc.getNearestPlayer(player, 1);

                if(target)
                    player.targetId = target.id;

                let execute = `app.targetPlayer('${JSON.stringify(target)}');`;

                player.call("cInterface-Open", [execute]);
                misc.log.debug(`${player.name} opens interface`);
            },
            "sInterface-giveMoney": (player, data) => {
                const d = JSON.parse(data);

                let target = misc.findPlayerByIdOrNickname(player.targetId);
                if(!target) return;
                if(player.money.cash < d.money)
                    return player.notify("~r~Vous n'avez pas assez sur vous.");

                target.changeMoney(+d.money);
                target.notifyWithPicture("Banque", "", `${player.name} vous a donné ${d.money}$.`, "CHAR_BANK_FLEECA");

                player.changeMoney(-d.money);
                player.notifyWithPicture("Banque", "", `Vous avez donné ${d.money}$ à ${target.name}.`, "CHAR_BANK_FLEECA");
            },
        });
    }
}

new Interface();