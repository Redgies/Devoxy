function setWalkingStyle(player, style) {
    if(!style) {
        player.resetMovementClipset(0.0);
    } else {
        if (!mp.game.streaming.hasClipSetLoaded(style)) {
            mp.game.streaming.requestClipSet(style);
            while(!mp.game.streaming.hasClipSetLoaded(style)) mp.game.wait(0);
        }

        player.setMovementClipset(style, 0.0);
    }
}

function setMood(player, mood) {
    if(!mood) {
        player.clearFacialIdleAnimOverride();
    } else {
        mp.game.invoke("0xFFC24B988B938B38", player.handle, mood, 0);
    }
}

mp.events.addDataHandler("walkingStyle", (entity, value) => {
    if (entity.type === "player") setWalkingStyle(entity, value);
});

mp.events.addDataHandler("moodStyle", (entity, value) => {
    if (entity.type === "player") setMood(entity, value);
});