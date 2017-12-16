'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
    return window._; //Underscore should be loaded on the page
});

var app = angular
    .module('angularApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.grid',
        "underscore",
        "toastr"
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/products', {
                templateUrl: 'views/products.html',
                controller: 'productsctrl',
                controllerAs: 'productsctrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }).run(function($rootScope) {
        $rootScope.hideDropDownMenu = false;
        $rootScope.expand = function() {
            $rootScope.hideDropDownMenu = true;
            console.log("inside function", $rootScope.hideDropDownMenu)
        }
        $rootScope.collaspe = function() {
            $rootScope.hideDropDownMenu = false;
            console.log("inside function", $rootScope.hideDropDownMenu)
        }
    });

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }

});