mp.events.add({
    "sKeys-F8": (player) => {
        player.notify("yo poto");
        player.call("cTuner-Open", []);
    }
});

mp.events.add("mod", (player, mod, modvalue) => {
    player.vehicle.setMod(parseInt(mod), parseInt(modvalue));
});

mp.events.addCommand('mod', (player, fullText, a, b) => {
    player.vehicle.setMod(parseInt(a), parseInt(b));
});