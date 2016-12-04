'use strict';

angular.module('sade')

    .controller('SignupCtrl', ['$scope', '$User', function ($scope, $User) {

        $scope.FIRST = 1;
        $scope.LAST = 4;
        $scope.START = '08:00';
        $scope.END = '18:00';
        var weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        $scope.input = {};

        weekDays.forEach(function(d) {
            $scope.input['start' + d] = $scope.START;
            $scope.input['end' + d] = $scope.END;
            $scope['selected' + d] = true;
        });

        $scope.selectedSun = false;
        $scope.selectedSat = false;

        $scope.step = $scope.FIRST;
        $scope.saveAttemp = false;

        $scope.message = '';
        $scope.loading = false;

        $scope.toogleSun = function () {
            $scope.selectedSun = !$scope.selectedSun;
        }

        $scope.toogleMon = function () {
            $scope.selectedMon = !$scope.selectedMon;
        }

        $scope.toogleTue = function () {
            $scope.selectedTue = !$scope.selectedTue;
        }

        $scope.toogleWed = function () {
            $scope.selectedWed = !$scope.selectedWed;
        }

        $scope.toogleThu = function () {
            $scope.selectedThu = !$scope.selectedThu;
        }

        $scope.toogleFri = function () {
            $scope.selectedFri = !$scope.selectedFri;
        }

        $scope.toogleSat = function () {
            $scope.selectedSat = !$scope.selectedSat;
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

            var formatDate = function (s) {
                s = s.trim().split('/');
                return s[2] + '-' + s[1] + '-' + s[0];
            };

            var split = $scope.input.availability.split('-');
            var availablePeriod = {
                start: moment(formatDate(split[0])).format('YYYY-MM-DD'),
                end: moment(formatDate(split[1])).format('YYYY-MM-DD')
            };

            var availableDays = {};
            weekDays.forEach(function(d) {
                var start = $scope.input['start' + d];
                var end = $scope.input['end' + d];
                var isAvailable = $scope['selected' + d] && start != end;
                availableDays[d] = {
                    isAvailable: isAvailable
                };

                if (isAvailable) {
                    availableDays[d].start = start;
                    availableDays[d].end = end;
                }
            });

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
                skills: $scope.skills,
                availablePeriod: availablePeriod,
                availableDays: availableDays
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