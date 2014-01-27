'use strict';

angular.module('w3uiFrontendApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ngGrid',
    'textAngular'
])

/**
 * Config Application
  */
.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('master', {
        access: 'admin',
        url: '/',
        views: {
            'header': {
                controller: 'HeaderCtrl',
                templateUrl: 'views/master/header/header.view.html'
            },
            'main': {
                templateUrl: 'views/master/main.view.html'
            },
            'navigation@master': {
                controller: 'NavigationCtrl',
                templateUrl: 'views/master/navigation/navigation.view.html'
            },
            'breadcrumb@master': {
                controller: 'BreadcrumbCtrl',
                templateUrl: 'views/master/breadcrumb/breadcrumb.view.html'
            }
        }
    });
})

/**
 * Run Application
  */
.run(['$rootScope', '$state', 'Authentication',
    function ($rootScope, $state, Authentication) {

        $rootScope.appName = 'UI Template';

        $rootScope.$on('$stateChangeStart', function(event, next) {

            //Check if state is open for public
            if( next.access !== 'public' ){

                //Check if somebody is logged in
                if(!Authentication.isLoggedIn()){
                    event.preventDefault();
                    $state.go('authLogin');

                }else{
                    var user = Authentication.get('user');
                    if( user.role !== next.access ){
                        event.preventDefault();
                        $state.go('authLogin');
                    }
                }
            }
        });
}]);
