$( document ).ready(function() {
    console.log( "ready!" );

    GetServerInfo("64.182.125.196/", "27017");

    $(".btnServer").click( function(e){
        
        console.log($(this).attr("sid"));
        switch ($(this).attr("sid")){
            case "1":
                GetServerInfo("64.182.125.196/", "27017");
                
                break;
            case "2":
                GetServerInfo("108.61.236.12/", "27015");
                
                break;
            case "3":
                GetServerInfo("170.75.249.15/", "27015");
                
                break;
            default:
                break;
                 
        }
        
    });    

    async function GetServerInfo(ip, port){
        let baseUrl = "https://txa-css-status.herokuapp.com/";
        
        console.log(baseUrl + ip + port)
        await $.ajax(baseUrl + ip + port)
        .then(data => {
            
             LoadServerInfo(ip, port, data);
        })
        .catch(error => {
            console.log(error);
        });


}

    

    async function LoadServerInfo(ip, port, serverData){
        let data = await serverData;
        

        console.log(data);     
        let ipString = ip.replace("/", ":")
        if (data.name)
        $("#serverName").empty().text(data.name);
        $("#currentIP").text(ipString + port );
        $("#currentMap").text(data.map);
        $("#currentPlayerCount").text(data.players.length + "/" + data.maxplayers);

        $("#mapImage").attr("src", "http://www.texasarlingtoncs.us/stats/img/maps/halflife/cstrike/" + data.map + ".jpg"  )
            .attr("onerror", "http://www.texasarlingtoncs.us/stats/img/maps/halflife/cstrike/" + data.map + ".png");
        $("#currentBotCount").text(data.raw.numbots);
       
            $("#playerTableBody").empty();
            $(data.players).each((index, player) => {
                $("#playerTableBody").append(
                    `<tr>
                        <td>${player.name}</td>
                        <td>${(player.raw.score)}</td>
                        <td>${new Date(player.raw.time * 1000).toISOString().substr(11,8)}</td>
                    </tr>`
                )
            })
        
    
    }
    

    
});