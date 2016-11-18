'use strict';

angular.module('sade')

  .controller('SignupCtrl', ['$scope', '$User', function ($scope, $User) {

    $scope.input = {};

    $scope.step = 1;
    $scope.message = '';
    $scope.loading = false;

    $scope.next = function () {
      
      if(step==1)
      
      $scope.step += 1;
    };

    $scope.previous = function () {
      $scope.step -= 1;
    };

    $scope.isFirst = function () {
      return $scope.step == 1;
    };

    $scope.isLast = function () {
      return $scope.step == 3;
    };

    $scope.do_signup = function (input) {

      $scope.message = '';
      $scope.loading = true;

      var data = {
        name: input.name,
        mail: input.email,
        cpf: input.cpf,
        password: input.senha
      };

      $User.signup(data).then(function() {
        $scope.loading = false;
        $scope.step = 4;
      }).catch(function () {
        $scope.loading = false;
        $scope.message = 'Falha ao realizar cadastro';
      });
    };

    $scope.skills = [
      {
        id: 1,
        name: 'C#'
      },
      {
        id: 2,
        name: 'Java'
      },
      {
        id: 3,
        name: 'Ruby'
      }
    ];

    $scope.skills = $scope.skills.map(function(x){
      return {
        id: x.id,
        name: x.name,
        value: 10
      }
    });

  }]);