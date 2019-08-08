let speedo = mp.browsers.new("package://RP/Browsers/Infos/infos.html");
let showed = false;
let player = mp.players.local;

let money;

mp.events.add({
    "cMoney-Update" : (value) => money = value,
    "render": () =>
    {
        speedo.execute(`update(0, 0, ${money});`);  
        
        if(player.vehicle && player.vehicle.getPedInSeat(-1) === player.handle)
            {
                if(showed === false)
                {
                    speedo.execute("showSpeedo();");
                    showed = true;
                }

                let vel1 = player.vehicle.getSpeed() * 3.6;
                let vel = (vel1).toFixed(0);
                let gas = player.vehicle.getPetrolTankHealth();
                gas = gas < 0 ? 0: gas / 10;
                
                speedo.execute(`update(${vel}, ${gas}, ${money});`);
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