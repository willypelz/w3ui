'use strict';

angular.module('w3ui')

/**
 * Each page or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more 'self-contained'.
 */
    .config(function config($stateProvider) {
        $stateProvider.state('master.page',{
            access: 'authorized',
            url: 'page',
            data: {
                isNavi: true,
                title: 'Seiten',
                icon: 'file',
                subtitle: ''
            },
            views :{
                'body': {
                    controller: 'PageCtrl',
                    templateUrl: 'views/page/page.view.html'
                },
                'content@master.page': {
                    controller: 'PageListCtrl',
                    templateUrl: 'views/page/list/list.view.html'
                }
            }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller('PageCtrl', function ($scope, $rootScope) {
        $scope.subtitle = '';
        $rootScope.$on('$stateChangeStart', function(event, next) {
            $scope.subtitle = next.data.subtitle;
        });

    });
