'use strict';

angular.module('sade')

    .controller('ProfileCtrl', ['$scope', '$User', function ($scope, $User) {

        // TODO
        var model = {
            name: 'Andre Seiji',
            email: 'naofaznada@email.com',
            cpf: '12312312388',
            rg: '123123123',
            curriculum: 'http://www.google.com',
            phone: '1238123-123',
            celular: '88888-123',
            course: 'Enfermage',
            institution: 'PUC campinas',
            address: 'campinas 1828',
            howMet: 'site do saadeee'
        };

        var skills = [
            {
                id: 1,
                name: 'C#',
                value: 4
            },
            {
                id: 2,
                name: 'Java',
                value: 3
            },
            {
                id: 3,
                name: 'Ruby',
                value: 9
            }
        ];

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
        $scope.editMode = true;

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
            $scope.skills = skills.map(function (x) {
                return {
                    id: x.id,
                    name: x.name,
                    value: x.value
                }
            });

            $scope.user = {
                name: model.name,
                email: model.email,
                cpf: model.cpf.substr(0, 3) + '.' + model.cpf.substr(3, 3) + '.' + model.cpf.substr(6, 3) + '-' + model.cpf.substr(9),
            };

            $scope.input = {
                rg: model.rg,
                curriculum: model.curriculum,
                phone: model.phone,
                celular: model.celular,
                course: model.course,
                institution: model.institution,
                address: model.address,
                howMet: model.howMet,
                skills: $scope.skills
            }
        };

        $scope.isEditMode = function () {
            return $scope.editMode;
        };

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
                    celular: input.celular,
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
        };

        $scope.resetForm();

    }]);