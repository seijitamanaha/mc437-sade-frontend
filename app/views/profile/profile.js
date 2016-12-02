'use strict';

angular.module('sade')

    .controller('ProfileCtrl', ['$scope', '$User', function ($scope, $User) {

        $scope.PROFILE = 1;
        $scope.SKILLS = 2;

        $scope.input = {};

        $scope.tab = 1;
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
            //TODO
            //$scope.user = angular.copy(originalModel);
        };

        $scope.isEditMode = function () {
            return $scope.editMode;
        };

        $scope.do_update = function (input) {

            $scope.message = '';
            $scope.loading = true;

            //TODO
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
                howMet: input.conheceu,
                skills: $scope.skills
            };

            $User.signup(data).then(function () {
                $scope.loading = false;

            }).catch(function () {
                $scope.loading = false;
                $scope.message = 'Falha ao atualizar ' + (($scope.isProfileTab()) ? 'os dados pessoais.' : 'as habilidades.');
            });
        };

        // TODO
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

        $scope.skills = $scope.skills.map(function (x) {
            return {
                id: x.id,
                name: x.name,
                value: 10
            }
        });

    }]);