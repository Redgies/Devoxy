const misc = require('../sMisc');

class Interface {
    constructor() {
        mp.events.add({
            "sKeys-F3": (player) => {
                if (!player.loggedIn) return;

                // let target = player;
                let target = misc.getNearestPlayer(player, 1);
                if (!target)
                    target = [];

                let veh = misc.getNearestVehicle(player, 3);
                if (!veh)
                    veh = [];
                else {
                    veh.number = veh.numberPlate;
                }

                if (target)
                    player.targetId = target.id;

                let execute = `app.targetPlayer('${JSON.stringify(target)}');`;
                execute += `app.targetVehicle('${JSON.stringify(veh)}');`;
                execute += `app.playerInfos('${JSON.stringify(player)}');`;

                player.call("cInterface-Open", [execute]);
                misc.log.debug(`${player.name} opens interface`);
            },
            "sInterface-setWalking": (player, data) => {
                player.data.walkingStyle = data;
            },
            "sInterface-setMood": (player, data) => {
                player.data.moodStyle = data;
            },
            "sInterface-setRepair": (player) => {
                let veh = misc.getNearestVehicle(player, 3);
                veh.repair();
            },
            "sInterface-setColor": (player, data) => {
                const d = JSON.parse(data);
                let veh = misc.getNearestVehicle(player, 3);
                veh.setColorRGB(d.color1.r, d.color1.g, d.color1.b, d.color2.r, d.color2.g, d.color2.b);
                veh.primaryColor = [d.color1.r, d.color1.g, d.color1.b];
                veh.secondaryColor = [d.color2.r, d.color2.g, d.color2.b];
            },
            "sInterface-setCuff": (player, data) => {
                const d = JSON.parse(data);

                console.log("cuffed : " + data);

                let target = misc.findPlayerByIdOrNickname(player.targetId);

                if (d == 1) {
                    console.log("cuff target");
                    target.setCuff(true);
                } else {
                    console.log("uncuff target");
                    target.setCuff(false);
                }
            },
            "sInterface-giveMoney": (player, data) => {
                const d = JSON.parse(data);

                d.money = Math.abs(d.money);

                let target = misc.findPlayerByIdOrNickname(player.targetId);
                if (!target) return;
                if (typeof d.money != "number") return;
                if (d.money <= 0) return;
                if (player.money.cash < d.money)
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