'use strict';

angular.module('sade')

    .controller('SignupCtrl', ['$scope', '$User', function ($scope, $User) {

        $scope.FIRST = 1;
        $scope.LAST = 4;

        $scope.input = {};

        $scope.selectedDom = false;
        $scope.selectedSeg = true;
        $scope.selectedTer = true;
        $scope.selectedQua = true;
        $scope.selectedQui = true;
        $scope.selectedSex = true;
        $scope.selectedSab = false;

        $scope.step = 4;//$scope.FIRST;
        $scope.saveAttemp = false;

        $scope.message = '';
        $scope.loading = false;

        $scope.toogleDom = function () {
            $scope.selectedDom = !$scope.selectedDom;
        }

        $scope.toogleSeg = function () {
            $scope.selectedSeg = !$scope.selectedSeg;
        }

        $scope.toogleTer = function () {
            $scope.selectedTer = !$scope.selectedTer;
        }

        $scope.toogleQua = function () {
            $scope.selectedQua = !$scope.selectedQua;
        }

        $scope.toogleQui = function () {
            $scope.selectedQui = !$scope.selectedQui;
        }

        $scope.toogleSex = function () {
            $scope.selectedSex = !$scope.selectedSex;
        }

        $scope.toogleSab = function () {
            $scope.selectedSab = !$scope.selectedSab;
        }
        
        $scope.next = function () {
            var valid = true;

            if ($scope.step == 1) {
                valid = (
                    $scope.form.name.$valid &&
                    $scope.form.cpf.$valid &&
                    $scope.form.email.$valid &&
                    $scope.form.email2.$valid &&
                    $scope.form.senha.$valid &&
                    $scope.form.senha2.$valid
                );
            }
            else if ($scope.step == 2) {
                valid = (
                    $scope.form.rg.$valid &&
                    $scope.form.curriculo.$valid &&
                    $scope.form.tel.$valid &&
                    $scope.form.instituicao.$valid &&
                    $scope.form.curso.$valid &&
                    $scope.form.endereco.$valid &&
                    $scope.form.howMet.$valid
                );
            }

            if (valid) {
                $scope.saveAttemp = false;
                $scope.step += 1;
            }
            else {
                $scope.saveAttemp = true;
                return;
            }
        };

        $scope.previous = function () {
            $scope.step -= 1;
        };

        $scope.isFirst = function () {
            return $scope.step == $scope.FIRST;
        };

        $scope.isLast = function () {
            return $scope.step == $scope.LAST;
        };

        $scope.isDone = function () {
            return $scope.step == $scope.LAST + 1;
        }

        $scope.match = function (value1, value2) {
            if (!value1) value1 = '';
            if (!value2) value2 = '';

            return value1 + '' == value2 + '';
        }

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

            $User.signup(data).then(function () {
                $scope.loading = false;
                $scope.step = $scope.LAST + 1;
            }).catch(function () {
                $scope.loading = false;
                $scope.message = 'Falha ao realizar cadastro';
            });
        };

// Gets skills for user register
        $User.getSkills().then(function (response) {
            $scope.skills = response.map(function (x) {
                return {
                    id: x.id,
                    name: x.name,
                    score: 10
                }
            });
        }).catch(function (err) {
            console.error(err);
        });

    }]);