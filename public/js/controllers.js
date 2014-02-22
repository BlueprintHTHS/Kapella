var kapellaControllers = angular.module('kapellaControllers', ['kapellaServices']);

kapellaControllers.controller('BrowseCtrl', ['$scope', 'Songs', function($scope, Songs) {
    $scope.songs = Songs.query();
}]);

kapellaControllers.controller('RecordCtrl', ['$scope', 'Recordings', function($scope, Recordings) {
    $scope.save = function() {};
}]);