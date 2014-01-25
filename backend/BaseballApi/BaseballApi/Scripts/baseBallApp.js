"use strict";

var baseballApp = angular.module("baseballApp", []);

baseballApp.factory("dataService", function ($http, $q) {
    
    return {
        getTeams : function () {

            var defered = $q.defer();

            $http.get("/api/teams")
                .then(function (result) {
                    defered.resolve(result.data);
                }, function () {
                    defered.reject();
                });

            return defered.promise;
        },
        
        getPlayers: function(teamId) {
            var defered = $q.defer();

            $http.get("/api/teamPlayers/?teamId=" + teamId)
                .then(function (result) {
                    defered.resolve(result.data);
                }, function () {
                    defered.reject();
                });

            return defered.promise;
        },
        
        getBattingStatistics: function(teamPlayerId) {

            var defered = $q.defer();

            $http.get("/api/battingStatistics/?teamPlayerId=" + teamPlayerId)
                .then(function (result) {
                    defered.resolve(result.data);
                }, function () {
                    defered.reject();
                });

            return defered.promise;
        }
    };
});

baseballApp.controller("statisticsController",
    function ($scope, dataService) {
        $scope.teams = [];
        $scope.players = [];
        $scope.battingStatistics = [];

        $scope.loadPlayers = function () {
            $scope.players = [];
            $scope.battingStatistics = [];
            dataService.getPlayers($scope.team.id).then(function (players) {
                angular.copy(players, $scope.players);
            });
        };

        $scope.loadStatistics = function() {
            $scope.battingStatistics = [];
            
            dataService.getBattingStatistics($scope.player.teamPlayerId).then(function (statistics) {
                angular.copy(statistics, $scope.battingStatistics);
            });
        };

        dataService.getTeams().then(function(teams) {
            angular.copy(teams, $scope.teams);
        });
    });