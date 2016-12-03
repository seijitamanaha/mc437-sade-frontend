'use strict';

angular.module('sade')

.controller('ListCtrl', ['$scope', '$User', '$List', function($scope, $User, $List) {

  if(!$User.me() || $User.me().role != 'ADMIN') {
    $scope.path('/');
  }

  $scope.users = [];

  $scope.search = function(name) {
    $scope.loading = true;
    name = name || '';
    $List.listUsers({
      name: name
    }).then(function(response) {
      $scope.users = response.object;
      $scope.loading = false;
      console.log(response.object);
    }).catch(function(error){
      if(error.data && error.data.message == 'Usuário deslogado!') {
        $User.logout();
      }
      $scope.loading = false;
      $scope.message = 'Erro ao buscar usuários';
      console.log(error)
    });

  };
  $scope.search();

  $scope.message = '';
  $scope.loading = false;
  
}]);