
baseballApp.value("globals", {
    //playersCounter: 0,
    teamsCounter: 0
});

baseballApp.value('d3Service', d3);

baseballApp.factory("dataService", function ($resource) {

    var teamsResource = $resource("/api/teams");
    teamsResource.prototype.image = function () {
        return this.name + ".png";
    };

    var teams = [
        {id : 1,    name : "HOU" },
        {id : 2,	name : "MIA"},
        {id : 3,	name : "SDP"},
        {id : 4,	name : "NYM"},
        {id : 5,	name : "STL"},
        {id : 6,	name : "CHC"},
        {id : 7,	name : "SEA"},
        {id : 8,	name : "CHW"},
        {id : 11,	name : "COL"},
        {id : 12,	name : "PIT"},
        {id : 13,	name : "PHI"},
        {id : 14,	name : "LAA"},
        {id : 15,	name : "NYY"},
        {id : 17,	name : "MIN"},
        {id : 18,	name : "CIN"},
        {id : 19,	name : "SFG"},
        {id : 20,	name : "LAD"},
        {id : 21,	name : "TOR"},
        {id : 22,	name : "TBR"},
        {id : 23,	name : "ARI"},
        {id : 25,	name : "KCR"},
        {id : 26,	name : "WSN"},
        {id : 27,	name : "CLE"},
        {id : 28,	name : "TEX"},
        {id : 30,	name : "DET"},
        {id : 31,	name : "OAK"},
        {id : 32,	name : "MIA"},
        {id : 33,	name : "MIL"},
        {id : 34,	name : "BOS"},
        {id : 36,	name : "BAL"},
        {id : 37,	name : "ATL"}
    
    ];

    var playersResource = $resource("/api/teamPlayers");
    var battingStatisticsResource = $resource("/api/battingStatistics");
    battingStatisticsResource.prototype.year = function () {
        return new Date(this.timeStamp).getFullYear();
    };

    return {
        //getTeams: teamsResource.query,
        getTeams: function() {
            return teams;
        },

        getPlayers: function (teamId) {
            return playersResource.query({ teamId: teamId });
        },

        getBattingStatistics: function (teamPlayerId, year) {
            return battingStatisticsResource.query({ teamPlayerId: teamPlayerId, year: year });
        }
    };
});