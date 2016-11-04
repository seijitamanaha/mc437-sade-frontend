'use strict';

angular.module('sade', [
  'ngRoute'
])
  .config(['$locationProvider', '$routeProvider',
    function($locationProvider, $routeProvider) {

  $locationProvider.hashPrefix('!');

  $routeProvider
    .when('/', {
      templateUrl: 'views/home/home.html',
      controller: 'HomeCtrl'
    })
    .when('/cadastro', {
      templateUrl: 'views/signup/signup.html',
      controller: 'SignupCtrl'
    })
    .otherwise({redirectTo: '/'});

}]);
