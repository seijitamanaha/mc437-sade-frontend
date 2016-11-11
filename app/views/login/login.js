'use strict';

angular.module('sade')

.controller('LoginCtrl', ['$scope', function($scope) {
  
  $scope.message = '';

  $scope.login = function(username, password) {
    console.log('submitted login form');
    
    $scope.message = 'Usuário ou senha incorretos';
    
    // $scope.message = 'Login efetuado';
    
  }

}]);