
    

    GetServerInfo("64.182.125.196/", "27017");

    $(".btnServer").on("click", function(e){
        
        
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
            case "4":
                    GetServerInfo("64.182.125.196/", "27019");
                    
                    break;
            default:
                break;
                 
        }
        
    });    

    async function GetServerInfo(ip, port){
        // let baseUrl = "https://txa-css-status.herokuapp.com/";
        let baseUrl = "https://0lg7bl-8000.preview.csb.app/";
       
        await $.ajax({
            url: baseUrl + ip + port, 
            dataType: "json"
        })
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

        
          
            
        $("#currentBotCount").text(data.raw.numbots);
       
            $("#playerTableBody").empty();
            let players = $(data.players).sort((a, b)=>{return b.raw.score - a.raw.score})
            $(players).each((index, player) => {
                $("#playerTableBody").append(
                    `<tr>
                        <td>${player.name}</td>
                        <td>${(player.raw.score)}</td>
                        <td>${new Date(player.raw.time * 1000).toISOString().substr(11,8)}</td>
                    </tr>`
                )
            })
        
    
    }
    

    
