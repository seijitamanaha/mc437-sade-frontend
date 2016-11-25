'use strict';

angular.module('sade')

.controller('ListCtrl', ['$scope', '$User', '$List', function($scope, $User, $List) {

  if(!$User.me()) {
    $scope.path('/');
  }

  // $List.listUsers().then(function(response){
  //   console.log(response);
  // }).catch(function(error){
  //   console.log(error)
  // });

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