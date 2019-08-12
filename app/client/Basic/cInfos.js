let speedo = mp.browsers.new("package://RP/Browsers/Infos/infos.html");
let showed = false;
let player = mp.players.local;

let money;
let job = 'Chômeur';

mp.events.add({
    "cMoney-Update" : (value) => { 
        money = value
    },
    "cJob-Update" : (value) => {
        job = value;
    },
    "playerStartTalking": (player) => 
    {
        mp.gui.chat.push("je parle");
    },
    "playerStopTalking": (p) => 
    {
        if(p == playerStartTalking)
            mp.gui.chat.push("je parle plus");
    },
    "render": () =>
    {
        speedo.execute(`updateMoney(${money}, '${job}');`);  

        if(player.vehicle && player.vehicle.getPedInSeat(-1) === player.handle)
            {
                if(showed === false)
                {
                    speedo.execute("showSpeedo();");
                    showed = true;
                }

                let vel1 = Math.ceil(player.vehicle.getSpeed() * (player.vehicle.getSpeed() / 20) * 2);
                let vel = (vel1).toFixed(0);
                let gas = player.vehicle.getPetrolTankHealth();
                gas = gas < 0 ? 0: gas / 10;
                
                speedo.execute(`update(${vel}, ${gas});`);
            }
            else
            {
                if(showed)
                {
                    speedo.execute("hideSpeedo();");
                    showed = false;
                }
            }
        }
    }
);