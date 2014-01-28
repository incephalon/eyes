"use strict";

var baseballApp = angular.module("baseballApp", []);

baseballApp.factory("dataService", function ($http, $q) {

    return {
        getTeams: function () {

            var defered = $q.defer();

            $http.get("/api/teams")
                .then(function (result) {
                    defered.resolve(result.data);
                }, function () {
                    defered.reject();
                });

            return defered.promise;
        },

        getPlayers: function (teamId) {
            var defered = $q.defer();

            $http.get("/api/teamPlayers/?teamId=" + teamId)
                .then(function (result) {
                    defered.resolve(result.data);
                }, function () {
                    defered.reject();
                });

            return defered.promise;
        },

        getBattingStatistics: function (teamPlayerId) {

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

//defining d3 as a service, so we'll be able to inject it into angular components (there're another options to do this)
baseballApp.value('d3Service', d3);

baseballApp.controller("statisticsController",
    function ($scope, $timeout, dataService) {
        $scope.teams = [];
        $scope.players = [];
        $scope.battingStatistics = [];
        $scope.years = [];
        $scope.filter = {
            timeStamp: ""
        };

        $scope.loadPlayers = function () {
            $scope.players = [];
            $scope.battingStatistics = [];
            $scope.years = [];
            dataService.getPlayers($scope.team.id).then(function (players) {
                angular.copy(players, $scope.players);
            });
        };

        $scope.loadStatistics = function () {
            $scope.battingStatistics = [];
            $scope.years = [];

            dataService.getBattingStatistics($scope.player.teamPlayerId).then(function (statistics) {
                angular.copy(statistics, $scope.battingStatistics);

                for (var i = 0; i < statistics.length; i++) {
                    var year = new Date(statistics[i].timeStamp).getFullYear();
                    if ($scope.years.indexOf(year) == -1) {
                        $scope.years.push(year);
                    }
                }
            });
        };

        dataService.getTeams().then(function (teams) {
            angular.copy(teams, $scope.teams);
        });

        $scope.scoreData = [
        { name: "Player1", score: 88 },
        { name: "Player2", score: 99 },
        { name: "Player3", score: 44 }
        ];

        $timeout(function () {
            $scope.scoreData.push({
                name: "Player4", score: 55
            });
        }, 3000);
    });

baseballApp.directive('scoreBars', function (d3Service) {
    return {
        restrict: 'A',
        scope: {
            data: "=",
            label: "@"
        },

        //d3 code goes here
        link: function (scope, iElement) {
            var svg = d3Service.select(iElement[0])
                .append("svg")
                .attr("width", "100%");

            // watch for data changes and re-render
            scope.$watch('data', function (newVals) {
                return scope.render(newVals);
            }, true);

            scope.render = function (data) {

                svg.selectAll("*").remove();

                var width, height, max;
                width = d3Service.select(iElement[0])[0][0].offsetWidth - 20;
                height = scope.data.length * 35;
                max = 98;
                svg.attr('height', height);


                svg.selectAll("rect")
                  .data(data)
                  .enter()
                    .append("rect")
                    .attr("height", 30) // height of each bar
                    .attr("width", 0) // initial width of 0 for transition
                    .attr("x", 10) // half of the 20 side margin specified above
                    .attr("y", function (d, i) {
                        return i * 35;
                    }) // height + margin between bars
                    .transition()
                      .duration(1000) // time of duration
                      .attr("width", function (d) {
                          return d.score / (max / width);
                      }); // width based on scale

                svg.selectAll("text")
                  .data(data)
                  .enter()
                    .append("text")
                    .attr("fill", "#fff")
                    .attr("y", function (d, i) { return i * 35 + 22; })
                    .attr("x", 15)
                    .text(function (d) { return d[scope.label]; });

            };
        }
    };
});