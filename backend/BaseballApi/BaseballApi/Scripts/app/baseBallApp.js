"use strict";

var baseballApp = angular.module("baseballApp", ['ngResource', 'ngAnimate']);//need to move this to baseballApp2

baseballApp.controller("statisticsController",
    function ($scope, $timeout, dataService) {
        $scope.teams = [];
        $scope.players = [];
        $scope.filteredStatistics = [];
        $scope.years = [2009, 2010, 2011, 2012, 2013];
        $scope.year = 2013;
        $scope.player = null;

        $scope.loadPlayers = function (id) {
            $scope.player = null;
            $scope.year = 2013;
            $scope.players = [];
            $scope.filteredStatistics = [];
            $scope.players = dataService.getPlayers(id);
        };

        $scope.isSelectedPlayer = function (player) {
            return player === $scope.player;
        };

        $scope.shouldDisplayPlayer = function(player) {
            return player.years.indexOf($scope.year) > -1;
        };

        $scope.selectPlayer = function (player) {
            $scope.player = player;
            loadStatistics();
        };        
        
        $scope.selectYear = function () {
            
            if ($scope.player && !$scope.shouldDisplayPlayer($scope.player)) {
                $scope.player = null;
            }
            
            loadStatistics();
        };

        function loadStatistics() {
            $scope.filteredStatistics = [];

            if ($scope.year && $scope.player) {
                $scope.filteredStatistics = dataService.getBattingStatistics($scope.player.teamPlayerId, $scope.year);
            }
        };


        $scope.teams = [
            { id: 1, name: "HOU" },
            { id: 2, name: "MIA" },
            { id: 3, name: "SDP" },
            { id: 4, name: "NYM" },
            { id: 5, name: "STL" },
            { id: 6, name: "CHC" },
            { id: 7, name: "SEA" },
            { id: 8, name: "CHW" },
            { id: 11, name: "COL" },
            { id: 12, name: "PIT" },
            { id: 13, name: "PHI" },
            { id: 14, name: "LAA" },
            { id: 15, name: "NYY" },
            { id: 17, name: "MIN" },
            { id: 18, name: "CIN" },
            { id: 19, name: "SFG" },
            { id: 20, name: "LAD" },
            { id: 21, name: "TOR" },
            { id: 22, name: "TBR" },
            { id: 23, name: "ARI" },
            { id: 25, name: "KCR" },
            { id: 26, name: "WSN" },
            { id: 27, name: "CLE" },
            { id: 28, name: "TEX" },
            { id: 30, name: "DET" },
            { id: 31, name: "OAK" },
            { id: 32, name: "MIA" },
            { id: 33, name: "MIL" },
            { id: 34, name: "BOS" },
            { id: 36, name: "BAL" },
            { id: 37, name: "ATL" }
        ];

        $timeout(function() {
            $scope.teams = dataService.getTeams();
        }, 0);
    });