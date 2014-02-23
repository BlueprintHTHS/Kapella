var kapella = angular.module('kapella', ['ngAnimate', 'kapellaControllers', 'kapellaDirectives', 'ngCookies', 'ngResource', 'ui.bootstrap', 'ngRoute', 'mean.system', 'mean.articles']);

kapella.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/browse.html',
                controller: 'BrowseCtrl'
            })
            .when('/record/:songId',{
                templateUrl: 'views/recordview.html',
                controller: 'RecordCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);

//Setting HTML5 Location Mode
kapella.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);

angular.module('mean.system', []);
angular.module('mean.articles', []);