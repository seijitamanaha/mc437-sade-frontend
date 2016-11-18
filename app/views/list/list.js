'use strict';

angular.module('sade')

.controller('ListCtrl', ['$scope', '$User', function($scope, $User) {

  if(!$User.me()) {
    $scope.path('/');
  }

  $scope.message = '';
  $scope.loading = false;

  $scope.logout = function() {

    $scope.message = '';
    $scope.loading = true;

    $User.logout().then(function() {
      $scope.loading = false;
      $scope.path('/login');
    }).catch(function () {
      $scope.loading = false;
      $scope.message = 'Falha no logout';
    });

  }
  
}]);