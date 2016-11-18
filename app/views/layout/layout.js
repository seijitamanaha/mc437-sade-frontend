'use strict';

angular.module('sade')

.controller('LayoutCtrl', ['$rootScope', '$location', '$User', function($rootScope, $location, $User) {

  $rootScope.$User = $User;

  $rootScope.path = function (path) {
    $location.path(path);
  }

}]);