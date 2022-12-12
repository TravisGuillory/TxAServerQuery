
    

    GetServerInfo("64.182.125.196/", "27017");

    $(".btnServer").on("click", function(e){
        
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
        // let baseUrl = "https://txa-css-status.herokuapp.com/";
        let baseUrl = "https://travisguillory-bug-free-couscous-755xwv9qr55cp6qv-8000.preview.app.github.dev/";
        console.log(baseUrl + ip + port)
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
    

    
