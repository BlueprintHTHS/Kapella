var kapellaControllers = angular.module('kapellaControllers', ['kapellaServices']);

kapellaControllers.controller('BrowseCtrl', ['$scope', 'Songs', function($scope, Songs) {
    $scope.songs = Songs.query();
}]);

kapellaControllers.controller('RecordCtrl', ['$scope', 'Recordings', '$routeParams', function($scope, Recordings, $routeParams) {
    $scope.save = function() {};
    $scope.songId = $routeParams.songId;
}]);