'use strict';

angular.module('sade', [
  'sade.rest',
  'ngRoute'
  ])
  .config(['$locationProvider', '$routeProvider',
    function ($locationProvider, $routeProvider) {

      $locationProvider.hashPrefix('!');

      $routeProvider
        .when('/', {
          templateUrl: 'views/home/home.html',
          controller: 'HomeCtrl'
        })
        .when('/entrar', {
          templateUrl: 'views/login/login.html',
          controller: 'LoginCtrl'
        })
        .when('/cadastro', {
          templateUrl: 'views/signup/signup.html',
          controller: 'SignupCtrl'
        })
        .when('/lista', {
          templateUrl: 'views/list/list.html',
          controller: 'ListCtrl'
        })
        .otherwise({redirectTo: '/'});

    }]);
