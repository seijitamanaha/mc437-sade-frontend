'use strict';

angular.module('sade')

.controller('HeaderCtrl', ['$scope', '$User', function($scope, $User) {

  $scope.loading = false;

  $scope.logout = function() {

    $scope.message = '';
    $scope.loading = true;

    $User.logout().then(function() {
      $scope.loading = false;
      $scope.path('/login');
    }).catch(function () {
      $scope.loading = false;
    });

  }

}]);