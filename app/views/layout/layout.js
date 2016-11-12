'use strict';

angular.module('sade')

.controller('LayoutCtrl', ['$rootScope', '$location', function($rootScope, $location) {

  $rootScope.path = function (path) {
    $location.path(path);
  }

}]);