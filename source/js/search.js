var app = angular.module('myApp', [])

  app.factory('RdList', ['$http', function ($http) {
        return{
            get: function(callback){
                $http.get('../test.json').success(function(item){
                    item.forEach(function (data){
                        data.FullName = data.First + ' ' + data.Last;
                        data.Email = 'Email@email.com';
                    });
                    callback(item);
                });
            }
        };
    }]);


    app.controller('DataCtrl', function($scope, RdList, $filter) {

        RdList.get(function(data){

            $scope.items = data;

            $scope.$watch('searchText', function(query){
                $scope.displayedItems = $filter('filter')($scope.items, query);

                if($scope.displayedItems.length >= 50){
                    $scope.displayView = 'one';
                }
                if($scope.displayedItems.length <= 49 && $scope.displayedItems.length >= 13){
                    $scope.displayView = 'two';
                }
                if($scope.displayedItems.length <= 12){
                    $scope.displayView = 'three';
                }
            });

        });
    });
