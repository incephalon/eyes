"use strict";

var baseballApp = angular.module("baseballApp", ['ngResource', 'ngAnimate']);

baseballApp.controller("statisticsController",
    function ($scope, $timeout, dataService) {
        $scope.teams = [];
        $scope.players = [];
        $scope.filteredStatistics = [];
        $scope.years = [2009, 2010, 2011, 2012, 2013];
        $scope.year = 2013;
        $scope.player = null;

        $scope.loadPlayers = function (team) {
            $scope.player = null;
            $scope.year = 2013;
            $scope.players = [];
            $scope.filteredStatistics = [];
            $scope.players = dataService.getPlayers(team.id);
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

        $timeout(function() {
            $scope.teams = dataService.getTeams();
        }, 0);
    });