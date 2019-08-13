var tsBrowser = null;
var refresh = 0;
var oldDateTime = 0;
var debug = 0;
mp.game.audio.startAudioScene("FBI_HEIST_H5_MUTE_AMBIENCE_SCENE");
mp.game.audio.startAudioScene("MIC1_RADIO_DISABLE");
tsBrowser = mp.browsers.new("package://RP/Browsers/ts3voice/index.html");
var streamedPlayers = [];

mp.keys.bind(0x57, true, function()  {
  if(mp.players.local.vehicle == null) {
    mp.events.callRemote("anim", "random@arrests", "generic_radio_chatter", 1, 49);
  }
  mp.events.callRemote("radioOn");
});
mp.keys.bind(0x57, false, function()  {
  if(mp.players.local.vehicle == null) {
    mp.events.callRemote("pointingStop");
  }
  mp.events.callRemote("radioOff");
});


mp.events.add({
  "browserDomReady": (browser) => {
    if(debug) mp.gui.chat.push('Vocal ready');

    mp.discord.update('Joue à Devoxy.fr', mp.players.local.name);

    refresh = 1;
  },
  "cFaction-Update": (value) => {
    mp.players.local.faction = value;
    mp.gui.chat.push("faction : " + mp.players.local.faction);
  }
});


var getStreamedPlayers = () => {
  let streamedPlayersArray = [];
  mp.players.forEachInStreamRange(
    (player, id) => {
    //   if(debug) mp.gui.chat.push("name : " + JSON.stringify(player.name));
      streamedPlayersArray.push(player);
    }
  );
  return streamedPlayersArray;
};
// API.onServerEventTrigger.connect(function (name, args) 
// {
//  if (name == "ConnectTeamspeak")
//  {
//    refresh = 1;
//  }
// });


setInterval(function(){
  // mp.gui.chat.push("faction : " + mp.players.local.faction);
    // var dateTime = API.getGameTime();
    if (refresh == 1)// && (dateTime - oldDateTime) >= 500)
    {
      // oldDateTime = dateTime;
      var player = mp.players.local;
      if(debug) mp.gui.chat.push("PPOS:");
      if(debug) mp.gui.chat.push(JSON.stringify(player.position));
      var playerPos = player.position;
      var playerRot = player.getHeading();

      if(debug) mp.gui.chat.push(player.dimension);

      var rotation = Math.PI / 180 * (playerRot * -1);
      var streamedPlayers = getStreamedPlayers();

      var playerNames = new Array();
    //   if(debug) mp.gui.chat.push("streamedd player : " + JSON.stringify(streamedPlayers[0].name));
      
      // if (API.hasEntitySyncedData(player, "CALLING_PLAYER_NAME") && API.hasEntitySyncedData(player, "CALL_IS_STARTED") && API.getEntitySyncedData(player, "CALL_IS_STARTED").toString() == "1")
      // {
      //  var callingPlayerName = API.getEntitySyncedData(player, "CALLING_PLAYER_NAME");
      //  if (callingPlayerName != "")
      //  {
      //    playerNames.push(callingPlayerName + "~10~0~0~3");
      //  }
      // }
      for (var i = 0; i < streamedPlayers.length; i++)
      {
        var streamedPlayer = streamedPlayers[i];
        var streamedPlayerPos = streamedPlayers[i].position;
        var distance = mp.game.gameplay.getDistanceBetweenCoords(playerPos.x, playerPos.y, playerPos.z, streamedPlayerPos.x, streamedPlayerPos.y, streamedPlayerPos.z, false);
        // if(debug) mp.gui.chat.push(distance);
        var voiceRange = "Weit";//API.getEntitySyncedData(streamedPlayers[i], "VOICE_RANGE");
        var volumeModifier = 1;
        var range = 25;
        if (distance > 5)
        {
          volumeModifier = (distance * -5 / 10);
        }
        if (volumeModifier > 0)
        {
          volumeModifier = 0;
        }
        // if(debug) mp.gui.chat.push(volumeModifier);

        if(player.getVariable("faction") == streamedPlayer.getVariable("faction"))
        {
          if(streamedPlayer.getVariable("radioOn") == 1)
          {
            volumeModifier = 1;
          }
          else
          {
            volumeModifier = -10000000;
          }

          playerNames.push(streamedPlayer.name + "~0~0~0~" + volumeModifier);
          continue;
        }

        if(distance < range)
        {
          // var subPos = streamedPlayerPos.Subtract(playerPos);
          var subPos = {};
          subPos.x = streamedPlayerPos.x - playerPos.x;
          subPos.y = streamedPlayerPos.y - playerPos.y;
          subPos.z = streamedPlayerPos.z - playerPos.z;

          var x = subPos.x * Math.cos(rotation) - subPos.y * Math.sin(rotation);
          var y = subPos.x * Math.sin(rotation) + subPos.y * Math.cos(rotation);
          
          x = x * 10 / range;
          y = y * 10 / range;
          
          var isDeath = 0;
          // if (streamedPlayer.health > 0)
          // {
          // mp.gui.cshat.push("player streamed : " + streamedPlayer.name + " faction : " + streamedPlayer.getVariable("faction"));
          playerNames.push(streamedPlayer.name + "~" + (Math.round(x * 1000) / 1000) + "~" + (Math.round(y * 1000) / 1000) + "~0~" + (Math.round(volumeModifier * 1000) / 1000));
          // }
          continue;
        }
      }
      tsBrowser.url = "http://localhost:15555/players/" + player.name + "/" + playerNames.join(";") + "/";
      mp.gui.chat.push("http://localhost:15555/players/" + player.name + "/" + playerNames.join(";") + "/");
      
    }
}, 1000);



// API.onResourceStop.connect(function() {
//  if (tsBrowser != null) {
//    refresh = false;
//    API.destroyCefBrowser(tsBrowser);
//  }
//  