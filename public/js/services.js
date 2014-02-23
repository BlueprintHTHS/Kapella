var kapellaServices = angular.module('kapellaServices', ['ngResource']);

kapellaServices.factory('Recordings', ['$resource', function($resource) {
    return $resource('/api/songs/recordings');
}]);

kapellaServices.factory('Songs', ['$resource', function($resource) {
    return $resource('/api/songs/:songId')
}]);
