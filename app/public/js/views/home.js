var currentCampaign;
var myUserName = "";
$(document).ready(function(){
    var app = new App();
    
    Campaigns.on('loaded', function(){
        currentCampaign = Campaigns.at(0);
        getMyBattles(function(battles){
            console.log("battles gotten");
            console.log("Number of battles: " + battles.length);
            calculateBattleStats(battles, true, drawBattleStatsChart);
        });
    });
    
    function drawBattleStatsChart(battleStats){
        var iWonAgainst = battleStats.wins;
        var iLostAgainst = battleStats.loses;
        console.log(iWonAgainst, iLostAgainst);
        setUpChartLabels(iWonAgainst, iLostAgainst, function(labels){
            console.log("labels: " + labels);
            var winData = new Array(labels.length);
            var loseData = new Array(labels.length);
            _.each(iWonAgainst, function(element, index){
                var i = labels.indexOf(index);
                winData[i] = iWonAgainst[index];
                if(iLostAgainst[index] == undefined){
                    loseData[i] = 0;
                }
            });
            _.each(iLostAgainst, function(element, index){
                var i = labels.indexOf(index);
                loseData[i] = iLostAgainst[index];
                if(iWonAgainst[index] == undefined){
                    winData[i] = 0;
                }
            });
            
            
            drawChart(winData, loseData, labels);
        });
        
    }
    function drawChart(winData, loseData, labels){
        var canvas = $('.battleChart');
        var ctx = canvas.get(0).getContext('2d');
        var data = {
            labels: labels,
            datasets: [
                {
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    data: winData
                },
                {
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    data: loseData
                }
            ]
        };
        var battleChart = new Chart(ctx).Radar(data);
    }
    
    function setUpChartLabels(iWonAgainst, iLostAgainst, callback){
        var labels = [];
        _.each(iWonAgainst, function(element, index){
            labels.push(index);
        });
        
        _.each(iLostAgainst, function(element, index){
            if(labels.indexOf(index) == -1) labels.push(index);
        });
        callback(labels);
    }

    function getMyBattles(callback){
        var battles = currentCampaign.get('battles');
        var myBattles = [];
        $.post('myUserName', function(myName){
            myUserName = myName;
            console.log("myUserName: " + myUserName);
            _.each(battles, function(element, index){
                var battlePlayers = battles.at(index).get('players');
                if(battlePlayers.indexOf(myUserName) > -1){
                    myBattles.push(battles.at(index));
                }
            });
            callback(myBattles);
        });
    }
    
    function calculateBattleStats(battles, calculateWin, callback){
        var iWonAgainst = {};
        var iLostAgainst = {};
        _.each(battles, function(element, index){
            var losingPlayers = element.get('players').slice(0);
            var winningPlayers = element.get('winningPlayers');
            //console.log(winningPlayers);
            for(var i=0; i<winningPlayers.length; i++){
                var winner = winningPlayers[i];
                losingPlayers.splice(losingPlayers.indexOf(winner), 1);
            }
            //console.log(losingPlayers);
            if(winningPlayers.indexOf(myUserName) > -1){
                for(var j=0; j<losingPlayers.length; j++){
                    if(iWonAgainst[losingPlayers[j]] == undefined){
                        iWonAgainst[losingPlayers[j]] = 1;
                    }else{
                        iWonAgainst[losingPlayers[j]] ++;
                    }
                }
            }else{
                for(var j=0; j<winningPlayers.length; j++){
                    if(iLostAgainst[winningPlayers[j]] == undefined){
                        iLostAgainst[winningPlayers[j]] = 1;
                    }else{
                        iLostAgainst[winningPlayers[j]] ++;
                    }
                }
            }
        });
        callback({wins: iWonAgainst, loses: iLostAgainst});
        console.log(iWonAgainst);
        console.log(iLostAgainst);
        
    }
})