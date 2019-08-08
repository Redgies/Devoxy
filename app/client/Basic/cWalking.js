function setWalkingStyle(player, style) {
    if (!style) {
        player.resetMovementClipset(0.0);
    } else {
        if (!mp.game.streaming.hasClipSetLoaded(style)) {
            mp.game.streaming.requestClipSet(style);
            while(!mp.game.streaming.hasClipSetLoaded(style)) mp.game.wait(0);
        }

        player.setMovementClipset(style, 0.0);
    }
}

mp.events.addDataHandler("walkingStyle", (entity, value) => {
    if (entity.type === "player") setWalkingStyle(entity, value);
});