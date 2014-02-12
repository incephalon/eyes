"use strict";

var baseballApp = angular.module("baseballApp", ['ngResource']);

baseballApp.factory("dataService", function ($resource) {

    var teamsResource = $resource("/api/teams");
    var playersResource = $resource("/api/teamPlayers");
    var battingStatisticsResource = $resource("/api/battingStatistics");

    return {
        getTeams: teamsResource.query,

        getPlayers: function (teamId) {
            return playersResource.query({ teamId: teamId });
        },

        getBattingStatistics: function (teamPlayerId, year) {
            return battingStatisticsResource.query({ teamPlayerId: teamPlayerId, year: year });
        }
    };
});

baseballApp.controller("statisticsController",
    function ($scope, $timeout, dataService) {
        $scope.teams = [];
        $scope.players = [];
        $scope.battingStatistics = [];
        $scope.years = [];
        $scope.year = null;

        for (var i = 2000; i < 2015; i++) {
            $scope.years.push(i);
        }

        $scope.loadPlayers = function () {
            $scope.players = [];
            $scope.battingStatistics = [];
            $scope.players = dataService.getPlayers($scope.team.id);
        };

        $scope.loadStatistics = function () {
            $scope.battingStatistics = [];
            $scope.battingStatistics = dataService.getBattingStatistics($scope.player.teamPlayerId, $scope.year);
        };

        $scope.teams = dataService.getTeams();
    });
