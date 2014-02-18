"use strict";

var baseballApp = angular.module("baseballApp", ['ngResource', 'ngAnimate']);

baseballApp.controller("statisticsController",
    function ($scope, $timeout, dataService, globals) {
        $scope.teams = [];
        $scope.players = [];
        $scope.filteredStatistics = [];
        $scope.years = [];
        $scope.year = null;
        $scope.player = {};
        var allStatistics = [];

        $scope.loadPlayers = function (team) {
            globals.playersCounter = 0;
            $scope.players = [];
            $scope.filteredStatistics = [];
            $scope.players = dataService.getPlayers(team.id);
        };

        $scope.isSelectedPlayer = function (player) {
            return player === $scope.player;
        };

        $scope.selectPlayer = function (player) {
            $scope.year = null;
            $scope.years = [];
            $scope.filteredStatistics = [];
            $scope.player = player;
            loadAllStatistics();
        };

        $scope.filterStatistics = function () {
            for (var i = 0; i < allStatistics.length; i++) {
                if (allStatistics[i].year() == $scope.year) {
                    $scope.filteredStatistics.push(allStatistics[i]);
                }
            }
        };

        function loadAllStatistics() {
            dataService.getBattingStatistics($scope.player.teamPlayerId, null, function (statistics) {
                allStatistics = statistics;
                for (var i = 0; i < statistics.length; i++) {
                    var year = statistics[i].year();
                    if ($scope.years.indexOf(year) == -1) {
                        $scope.years.push(year);
                    }
                }
            });

        };

        $scope.teams = dataService.getTeams();
    });