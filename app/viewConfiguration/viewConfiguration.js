'use strict';

angular.module('myApp.viewConfiguration', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/config', {
            templateUrl: 'viewConfiguration/viewConfiguration.html',
            controller: 'viewConfigurationCtrl'
        });
    }])

    .controller('viewConfigurationCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.form = {};

        $scope.popularHashtags = {
            "other":{
                "swiss":{qty:100},
                "swizerland":{qty:910},
                "ch2":{qty:10},
                "vevey2":{qty:10},
                "fribourg":{qty:10}
            },
            "football": [

            ],
            "gameofthrones":[

            ]
        };

        $scope.saveConfiguration = function () {

            $http.post('http://localhost:8080/rest/stream/config', {data: $scope.config.hashtags}).
                success(function (data, status, headers, config) {
                    $http.get('http://localhost:8080/rest/stream/config').
                        success(function (data, status, headers, config) {
                            $scope.config.hashtags = data.data;
                        }).
                        error(function (data, status, headers, config) {
                            $scope.config.hashtags = {};
                        });
                }).
                error(function (data, status, headers, config) {
                    $scope.config.hashtags = {};
                });
        }

        $http.get('http://localhost:8080/rest/stream/config').
            success(function (data, status, headers, config) {
                $scope.config.hashtags = data.data;
            }).
            error(function (data, status, headers, config) {
                $scope.config.hashtags = {};
            });

        $scope.config = {};
        $scope.config.hashtags = {
            "other":[
                "swiss",
                "swizerland",
                "ch",
                "vevey",
                "fribourg"
            ],
            "football": [
                "asf",
                "fifa",
                "qatar2022"
            ],
            "gameofthrones":[
                "got",
                "teamtyrion"
            ]
        }

        $scope.addMainHashtag = function(hashtag) {
            hashtag = hashtag.trim();
            var index = $scope.config.hashtags[hashtag];
            console.log(index);
            if(index==null && hashtag.trim() != '') {
                $scope.config.hashtags[hashtag] = [];
            }
        }

        $scope.addSubHashtag = function(key, hashtag) {
            hashtag = hashtag.trim();
            var index = $scope.config.hashtags[key].indexOf(hashtag);
            if(index==-1 && hashtag != '') {
                $scope.config.hashtags[key].push(hashtag);
            }
        }

        $scope.removeMainHashtag = function(key) {
            delete $scope.config.hashtags[key];
        }

        $scope.removeSubHashtag = function(key, hashtag) {
            var index = $scope.config.hashtags[key].indexOf(hashtag);
            $scope.config.hashtags[key].splice(index, 1);
        }

        $scope.contains = function(array, elt) {
            return array.indexOf(elt) == -1;
        }



    }]);