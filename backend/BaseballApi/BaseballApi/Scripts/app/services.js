
baseballApp.value("globals", {
    playersCounter: 0,
    teamsCounter: 0
});

baseballApp.value('d3Service', d3);

baseballApp.factory("dataService", function ($resource) {

    var teamsResource = $resource("/api/teams");
    teamsResource.prototype.image = function () {
        return this.name + ".png";
    };

    var playersResource = $resource("/api/teamPlayers");
    var battingStatisticsResource = $resource("/api/battingStatistics");
    battingStatisticsResource.prototype.year = function () {
        return new Date(this.timeStamp).getFullYear();
    };
    
    return {
        getTeams: teamsResource.query,

        getPlayers: function (teamId) {
            return playersResource.query({ teamId: teamId });
        },

        getBattingStatistics: function (teamPlayerId, year, onSuccess) {
            return battingStatisticsResource.query({ teamPlayerId: teamPlayerId, year: year }, onSuccess);
        }
    };
});