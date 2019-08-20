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

mp.events.addDataHandler("walkStyle", (entity, value) => {
    if (entity.type === "player") setWalkingStyle(entity, value);
});

mp.events.addDataHandler("moodStyle", (entity, value) => {
    if (entity.type === "player") setMood(entity, value);
});
mp.events.add("StopAnimSync", (tID, dict, name) => {
	var player = mp.players.atRemoteId(tID);
	if (player) {
		player.stopAnimTask(dict, name, 1);
	}
});
mp.events.add("PrepareAnim", (anims) => {
	anims.forEach(function(anim) {
		console.log(JSON.stringify(anim));
		if (mp.game.streaming.doesAnimDictExist(anims.dict)) {
			mp.game.streaming.requestAnimDict(anims.dict);
			while (mp.game.streaming.hasAnimDictLoaded(anims.dict)) {
				mp.game.wait(10);
			}
			console.log("Loaded anim lib.", JSON.stringify(anim))
		}
	})
});
mp.events.add("PlayAnimation", (tID, dict, name, speed, speedMultiplier, duration, flag, playbackRate, lockX, lockY, lockZ, timeout) => {
	var player = mp.players.atRemoteId(tID);

	mp.gui.chat.push("player : " + player);

	if (player) {
		if (mp.game.streaming.doesAnimDictExist(dict)) {
			mp.game.streaming.requestAnimDict(dict);
			while (mp.game.streaming.hasAnimDictLoaded(dict)) {
				break;
			}
			mp.gui.chat.push("sync play started for" +  player.name + " " + dict + " " + name + " " + timeout);
			player.taskPlayAnim(dict, name, speed, speedMultiplier, duration, flag, playbackRate, lockX, lockY, lockZ);
			if (timeout != 0) {
				setTimeout(function() {
					player.stopAnimTask(dict, name, 1);
				}, timeout)
			}
		}
	}
});