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
            "sInterface-setDestroy": (player) => {
                let veh = misc.getNearestVehicle(player, 3);
                veh.destroy();
            },
            "sInterface-setColor": (player, data) => {
                const d = JSON.parse(data);
                let veh = misc.getNearestVehicle(player, 3);
                veh.setColorRGB(d.color1.r, d.color1.g, d.color1.b, d.color2.r, d.color2.g, d.color2.b);
                veh.primaryColor = [d.color1.r, d.color1.g, d.color1.b];
                veh.secondaryColor = [d.color2.r, d.color2.g, d.color2.b];
            },
            "sInterface-setTunning": (player, mod, modvalue) => {
                let veh = misc.getNearestVehicle(player, 3);
                veh.setMod(parseInt(mod), parseInt(modvalue));

                for(let i = 0; i < veh.tunning.length; i++)
                {
                    if(veh.tunning[i].mod === mod)
                    {
                        veh.tunning[i].mod = mod;
                        veh.tunning[i].value = modvalue;
                    }
                }

            },
            "sInterface-newConfiscate": (player) => {
                let target = misc.findPlayerByIdOrNickname(player.targetId);
                if(!target) return;

                target.resetAllWeapons();

                target.notifyWithPicture("Police", "", `${player.name} vous a retiré vos armes.`, "CHAR_CALL911");
                player.notifyWithPicture("Police", "", `Vous avez retiré les armes de ${target.name}.`, "CHAR_CALL911");
            },
            "sInterface-setCuff": (player, data) => {
                const d = JSON.parse(data);

                let target = misc.findPlayerByIdOrNickname(player.targetId);

                if (d == 1) {
                    target.setCuff(true);
                } else {
                    target.setCuff(false);
                }
            },
            "sInterface-setJail": (player) => {
                let target = misc.findPlayerByIdOrNickname(player.targetId);
                if(!target) return;

                if(!target.canGoToJail) return player.notify("~r~Cette personne n'est pas en cellule.");
                if(target.delits.length <= 0) return player.notify("~r~Cette personne n'a pas de délits.");

                target.jailed = 1;

                target.tpToJail();

                target.notifyWithPicture("Police", "", `${player.name} vous a envoyé en prison.`, "CHAR_CALL911");
                player.notifyWithPicture("Police", "", `Vous avez envoyé ${target.name} en prison (~g~+5000$~w~).`, "CHAR_CALL911");

                player.changeMoney(+2500);
            },
            "sInterface-giveGunLicence": (player) => {
                let target = misc.findPlayerByIdOrNickname(player.targetId);
                if (!target) return;

                target.permis = !target.permis;

                if(target.permis)
                {
                    target.notifyWithPicture("Police", "", `${player.name} vous a donné le permis de port d'armes.`, "CHAR_CALL911");
                }
                else
                {
                    target.notifyWithPicture("Police", "", `${player.name} vous a retiré le permis de port d'armes.`, "CHAR_CALL911");
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