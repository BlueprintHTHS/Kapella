var kapella = angular.module('kapella', ['kapellaControllers', 'kapellaDirectives', 'ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'mean.system', 'mean.articles']);

kapella.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // For unmatched routes:
        $urlRouterProvider.otherwise('/');

        // states for my app
        $stateProvider
            .state('all articles', {
                url: '/articles',
                templateUrl: 'views/articles/list.html'
            })
            .state('create article', {
                url: '/articles/create',
                templateUrl: 'views/articles/create.html'
            })
            .state('edit article', {
                url: '/articles/:articleId/edit',
                templateUrl: 'views/articles/edit.html'
            })
            .state('article by id', {
                url: '/articles/:articleId',
                templateUrl: 'views/articles/view.html'
            })
            .state('home', {
                url: '/',
                templateUrl: 'views/index.html'
            })
            .state('browse songs', {
                url: '/browse',
                templateUrl: 'views/browse.html',
                controller: 'BrowseCtrl'
            })
            .state('recording song', {
                url: '/record/:songId',
                templateUrl: 'views/recordview.html',
                controller: 'RecordCtrl'
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