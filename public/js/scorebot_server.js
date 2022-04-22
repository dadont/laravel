//var Scorebot = require('hltv-scorebot');

/*var io = require('socket.io').listen(8080);
var client = io.sockets;

var fullGameLog = {};

var liveGames = [];

require("./other")(function(a){
    liveGames = [];
    a.forEach(function(game){
        liveGames.push({
            matchid: game.matchid,
            listit: game.listid,
            teams: [game.team1.trim().toLowerCase(),game.team2.trim().toLowerCase()]
        });
        fullGameLog[game.matchid] = [];
    });
    console.log(liveGames);
    start()
});

var Livescore = require('hltv-livescore'),
    socketList = [],
    fromHomePage = [];*/

/*(new LiveGameManager).getLiveGames(function (err, games) {
    liveGames = [];
    if(err || !games || !(games instanceof Array) || games.length === 0) {}
    games.forEach(function (game, i) {
        for(var j = 0; j < liveGames.length; j++){
            if(liveGames[j].matchid == game.matchid) return;
        }
        liveGames.push({
            matchid: game.matchid,
            listid: game.listid,
            teams: [game.teams[0].toLowerCase().trim(), game.teams[1].toLowerCase().trim()]
        });
        fullGameLog[game.matchid] = [];
    });

    start();
});*/

/*var m,k,r;

function start() {
    clearInterval(m);
    for (var i = 0; i < liveGames.length; i++) {
        var gameDetails = liveGames[i];
        var live = new Livescore({
            matchid: parseInt(gameDetails.matchid),
            listid: parseInt(gameDetails.listid)
        });
        m = setInterval(function () {
            live.getPlayers(function (players) {
                var plyrs = [];
                for (var name in players) {
                    plyrs.push({
                        name: name,
                        alive: players[name].alive,
                        side: players[name].team.side,
                        money: players[name].money,
                        k: players[name].kills,
                        a: players[name].assists,
                        d: players[name].deaths,
                        r: players[name].rating
                    });
                }
                socketList.forEach(function (socket) {
                    if (socket.wantsGame == gameDetails.matchid + "-" + gameDetails.listid){
                        socket.emit("players", plyrs);
                        return;
                    }
                });
            });
        }, 5000);
        live.on("scoreboard",function (teams) {
            teams = teams.teams;
            if (!teams[1]) return;
            var j = {};
            j[teams[1].name.toLowerCase().trim()] = teams[1].score;
            j[teams[2].name.toLowerCase().trim()] = teams[2].score;
            socketList.forEach(function (socket) {
                if (socket.wantsGame == gameDetails.matchid + "-" + gameDetails.listid) socket.emit("scoreUpdate", j);
            });
            fromHomePage.forEach(function (a) {
                a.emit("getAllScores", j);
            });
        });
        live.on("log", function (gameLog) {
            fullGameLog[gameDetails.matchid] = fullGameLog[gameDetails.matchid].concat(gameLog);
            socketList.forEach(function (socket) {
                if (socket.readyToLogs && (socket.wantsGame == gameDetails.matchid + "-" + gameDetails.listid)) socket.emit("gameLog", gameLog);
            });
        });
    }
}



io.on("connection", function (socket) {
    if(!socket.request._query['fromHomepage']) {
        console.log("Request not from home page");
        var teams = JSON.parse(socket.request._query['teams']);
        teams = liveGames.filter(function (a) {
            return (a.teams.indexOf(teams[0].toLowerCase().trim()) != -1 && a.teams.indexOf(teams[1].toLowerCase().trim()) != -1);
        });
        if (teams.length === 0) return;
        teams = teams[0];
        socket.wantsGame = teams.matchid + "-" + teams.listid;
        socket.emit("gameLog", fullGameLog[teams.matchid]);
        socket.on("disconnect", function () {
            socketList.splice(socketList.indexOf(socket), 1);
        });
        socket.readyToLogs = true;
        socketList.push(socket);
    } else {
        console.log("Socket from home pages");
        fromHomePage.push(socket);
        socket.on("getScores",function(wants){
            console.log('AAA');
            wants = JSON.parse(wants);
            fromHomePage.push({socket:socket, wants:wants});
        });
        socket.on("disconnect",function(){
           fromHomePage.splice(fromHomePage.indexOf(socket), 1);
        });
    }
});*/


var io = require('socket.io').listen(9000),
    client_io = require('socket.io-client');

var connectedSockets = [];

var currentScores = {};

io.on("connection",function(socket){
    socket.games = [];
    socket.on("sendGames", function(listid){
        socket.games.push(listid);
        if(!(listid in currentScores)){
            var m = client_io.connect("http://scorebot2.hltv.org:10022");
            m.on("connect",function(){
                m.on("scoreboard", function(scoreboard) {
                    var k = {teams:{}};
                    k.teams[scoreboard.ctTeamName.toLowerCase()] = scoreboard.counterTerroristScore;
                    k.teams[scoreboard.terroristTeamName.toLowerCase()] = scoreboard.terroristScore;
                    k.listid = listid;
                    currentScores[listid] = k;
                });
                m.emit("readyForMatch", parseInt(listid));
            });
        }
    });
    socket.on("nowIsReady", function(){
        connectedSockets.push(socket);
    });
    socket.on("get", function(){
        for(var k in currentScores){
            if(socket.games.indexOf(k) !== -1){
                socket.emit("sendScores", currentScores[k]);
            }
        }
    });
});

// io.sockets.on("getScore", function(listId){
//     console.log(listid);
//     connectedSockets.filter(function(sck){
//         return sck.gameId == listId;
//     }).forEach(function(socket){
//         socket.emit("clientScore", currentScores[listid]);
//     });
// });