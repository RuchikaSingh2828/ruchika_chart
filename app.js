var myApp = angular.module('myApp', ['d3']);

myApp.controller('MyController', ['$scope', 'd3Service', function($scope, d3Service) {
    var count = 0;
    setInterval(function() {
        $scope.data = d3Service;
        alert("call done : " + count++ + "times");
    }, 300000)
}]);