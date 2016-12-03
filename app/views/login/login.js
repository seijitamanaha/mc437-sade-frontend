'use strict';

angular.module('sade')

.controller('LoginCtrl', ['$scope', '$User', function($scope, $User) {

  $scope.message = '';
  $scope.loading = false;

  $scope.login = function(username, password) {

    $scope.message = '';
    $scope.loading = true;
    
    var data = {
      username: username,
      password: password
    };

    $User.login(data).then(function() {
      $scope.loading = false;
      if($User.me().role == 'ADMIN') {
        $scope.path('/lista');
      } else {
        $scope.path('/perfil');
      }
    }).catch(function () {
      $scope.loading = false;
      $scope.message = 'Usuário ou senha incorretos';
    });
    
  }

}]);