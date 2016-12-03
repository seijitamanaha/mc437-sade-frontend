'use strict';

angular.module('sade')
    .controller('ProfileCtrl', ['$scope', '$User', function ($scope, $User) {

        var model = {};

        $scope.loading = true;
        $User.getUser().then(function (response) {
            $scope.loading = false;
            //console.log(response.object);
            $scope.user_data = response.object;
            $scope.skills = $scope.user_data.skills.map(function (x) {
                return {
                    id: x.id,
                    name: x.name,
                    value: x.score
                }
            });
            $scope.resetForm();
        }).catch(function (error) {
            if (error.data && error.data.message == 'Usuário deslogado!') {
                $User.logout();
            }
            $scope.loading = false;
            //console.log(error);
        });

        $scope.PROFILE = 1;
        $scope.SKILLS = 2;

        $scope.slider = {
            value: 0,
            options: {
                floor: 0,
                ceil: 10
            }
        };

        $scope.input = {};

        $scope.tab = $scope.PROFILE;
        $scope.editMode = false;

        $scope.message = '';
        $scope.loading = false;

        $scope.showProfileTab = function () {
            $scope.tab = $scope.PROFILE;
            $scope.setEditMode(false);
        };

        $scope.showSkillsTab = function () {
            $scope.tab = $scope.SKILLS;
            $scope.setEditMode(false);
        };

        $scope.isProfileTab = function () {
            return $scope.tab == $scope.PROFILE;
        };

        $scope.isSkillsTab = function () {
            return $scope.tab == $scope.SKILLS;
        };

        $scope.setEditMode = function (b) {
            $scope.editMode = b;

            // reseta form
            if (b == false) {
                $scope.resetForm();
            }
        };

        $scope.resetForm = function () {

            $scope.form.rg.$touched = false;
            $scope.form.curriculum.$touched = false;
            $scope.form.phone.$touched = false;
            $scope.form.course.$touched = false;
            $scope.form.institution.$touched = false;
            $scope.form.address.$touched = false;
            $scope.form.howMet.$touched = false;

            $scope.input = {
                rg: $scope.user_data.rg,
                curriculum: $scope.user_data.curriculum,
                phone: $scope.user_data.phone,
                course: $scope.user_data.course,
                institution: $scope.user_data.institution,
                address: $scope.user_data.address,
                howMet: $scope.user_data.howMet,
                skills: $scope.user_data.skills
            }

            $scope.saveAttemp = false;
        };

        $scope.isEditMode = function () {
            return $scope.editMode;
        };

        $scope.match = function (value1, value2) {
            if (!value1) value1 = '';
            if (!value2) value2 = '';

            return value1 + '' == value2 + '';
        }

        $scope.do_update = function (input) {

            if ($scope.form.$valid) {
                console.log('SAVE');

                $scope.message = '';
                $scope.loading = true;

                //TODO
                var data = {
                    name: input.name,
                    mail: input.email,
                    cpf: input.cpf,
                    password: input.password,
                    rg: input.rg,
                    curriculum: input.curriculum,
                    phone: input.phone,
                    course: input.course,
                    institution: input.institution,
                    address: input.address,
                    howMet: input.howMet,
                    skills: $scope.skills
                };

                $User.signup(data).then(function () {
                    $scope.loading = false;
                }).catch(function () {
                    $scope.loading = false;
                    $scope.message = 'Falha ao atualizar ' + (($scope.isProfileTab()) ? 'os dados pessoais.' : 'as habilidades.');
                });
            }
            else {
                $scope.saveAttemp = true;
            }
        };

    }]);
