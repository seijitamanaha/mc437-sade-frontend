'use strict';

angular.module('sade')

  .controller('SignupCtrl', ['$scope', '$User', function ($scope, $User) {

    $scope.input = {};

    $scope.step = 1;
    $scope.message = '';
    $scope.loading = false;

    $scope.next = function () {
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

    // Registers user
    $scope.do_signup = function (input) {

      $scope.message = '';
      $scope.loading = true;

      var data = {
        name: input.name,
        mail: input.email,
        cpf: input.cpf,
        password: input.senha,
        rg: input.rg,
        curriculum: input.curriculo,
        phone: input.tel,
        course: input.curso,
        institution: input.instituicao,
        address: input.endereco,
        howMet: input.howMet,
        skills: $scope.skills
      };

      $User.signup(data).then(function() {
        $scope.loading = false;
        $scope.step = 4;
      }).catch(function () {
        $scope.loading = false;
        $scope.message = 'Falha ao realizar cadastro';
      });
    };

    // Gets skills for user register
    $User.getSkills().then(function(response) {
      $scope.skills = response.map(function(x){
        return {
          id: x.id,
          name: x.name,
          score: 10
        }
      });
    }).catch(function(err){
      console.error(err);
    });

  }]);