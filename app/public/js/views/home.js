var currentCampaign;
var myUserName = "";
$(document).ready(function(){
    var app = new App();
    
    Campaigns.on('loaded', function(){
        currentCampaign = Campaigns.at(0);
        getMyBattles(function(battles){
            console.log("battles gotten");
            calculateBattleStats(battles, true, drawBattleStatsChart);
        });
    });
    
    function drawBattleStatsChart(battleStats){
        var iWonAgainst = battleStats.wins;
        var iLostAgainst = battleStats.loses;
        var chartLabels = [];
        var winData = [];
        var loseData = [];
        _.each(iWonAgainst, function(element, index){
            if(chartLabels.indexOf(index.toString()) == -1){
                chartLabels.push(index.toString());
                winData.push(iWonAgainst[index]);
                if(iLostAgainst[index] == undefined){
                    winData.push(0);
                }
            }
        });
        _.each(iLostAgainst, function(element, index){
            if(chartLabels.indexOf(index.toString()) == -1){
                chartLabels.push(index.toString());
            }
            loseData.push(iLostAgainst[index]);
            if(iWonAgainst[index] == undefined){
                loseData.push(0);
            }
        });
        console.log("chartLabels: " + chartLabels);
        console.log("winData: " + winData);
        console.log("loseData: " + loseData);
        
        var ctx = document.getElementByID('battleCanvas').getContext('2d');
        var data = {
            labels: chartLabels,
            datasets: [
                {
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff"
                },
                {
                }
            ]
        };
        var battleChart = new Chart(ctx).Radar(data);
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