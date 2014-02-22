var kapellaControllers = angular.module('kapellaControllers', ['kapellaServices']);

kapellaControllers.controller('BrowseCtrl', ['$scope', 'Songs', function($scope, Songs) {
    $scope.songs = Songs.query();
}]);
