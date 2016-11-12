'use strict';

angular.module('sade')

  .controller('SignupCtrl', ['$scope', function ($scope) {

    $scope.step = 3;

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

    $scope.do_signup = function () {
      $scope.step = 4;
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

  }]);