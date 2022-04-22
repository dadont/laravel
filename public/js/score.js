/*var socket;
if (location.origin == "http://stormrate.masterv1.com"){
    socket = io.connect("http://localhost:9000");
}
else{
    socket = io.connect(location.origin + ":9000");
}
$("[data-listid]").each(function(i,el){
    socket.emit("sendGames", $(el).attr("data-listid"));
});
socket.emit("nowIsReady");
socket.emit("get");
setInterval(function(){
    socket.emit("get");
}, 5000);*/

/*socket.on("sendScores", function(a){
    var node = $("[data-listid='"+a.listid+"']"), keys = Object.keys(a.teams);
    var x = node.find(".player_1_name");
    x = x.is("[title]") ? x.attr("title") : x.text();
    var m;
    if(keys[0].toLowerCase()===x.toLowerCase()){
        m = a.teams[keys[0]]+":"+a.teams[keys[1]];
    } else {
        m = a.teams[keys[1]]+":"+a.teams[keys[0]];
    }
    node.find(".rate_score").attr("score",m);
    if(!node.find(".rate_score").is(".finished")){
        node.find(".rate_score").text(m);
    }
});*/