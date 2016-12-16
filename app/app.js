'use strict';

angular.module('sade', [
    'ngRoute',
    'ngStorage',
    'ui.utils.masks',
    'rzModule',
    'sade.rest',
    'sade.user',
    'sade.list',
    'ui.validate'
])
    .config(['$locationProvider', '$routeProvider',
        function ($locationProvider, $routeProvider) {

            $locationProvider.hashPrefix('!');

            $routeProvider
                .when('/', {
                    templateUrl: 'views/home/home.html',
                    controller: 'HomeCtrl'
                })
                .when('/entrar', {
                    templateUrl: 'views/login/login.html',
                    controller: 'LoginCtrl'
                })
                .when('/cadastro', {
                    templateUrl: 'views/signup/signup.html',
                    controller: 'SignupCtrl'
                })
                .when('/lista', {
                    templateUrl: 'views/list/list.html',
                    controller: 'ListCtrl'
                })
                .when('/perfil', {
                    templateUrl: 'views/profile/profile.html',
                    controller: 'ProfileCtrl'
                })
                .otherwise({redirectTo: '/'});

        }])

    .directive('daterangepicker', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $(element).daterangepicker({
                    minDate:moment(),

                    startDate: moment(),
                    endDate: moment().add(1,'year'),

                    showDropdowns: true,

                    alwaysShowCalendars: true,
                    showCustomRangeLabel: false,
                    drops: 'up',

                    ranges: {
                        'Este mês': [moment(), moment().add(1,'month')],
                        'Próximos 3 meses': [moment(), moment().add(3,'month')],
                        'Próximos 6 meses': [moment(), moment().add(6,'month')],
                        'Próximo ano': [moment(), moment().add(1,'year')],
                        'Próximos 2 anos': [moment(), moment().add(2,'year')],
                        'Para sempre :)': [moment(), moment().add(150,'year')]
                    },

                    locale: {
                        format: 'DD/MM/YYYY'
                    }
                });
            }
        };
    })

    .directive('clockpicker', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $(element).clockpicker({
                    placement: 'top',
                    align: 'top',
                    autoclose: true
                });

                if ($(element).attr('data-before')) {

                    $(element).on('change', function(){

                        var before = $(this).attr('data-before');
                        before = $('#' + before);

                        var date1 = before.val().split(':');
                        var date2 = $(this).val().split(':');

                        date1 = moment().startOf('day').add(date1[0],'hours').add(date1[1], 'minutes');
                        date2 = moment().startOf('day').add(date2[0],'hours').add(date2[1], 'minutes');

                        if (date1.isAfter(date2)) {
                            $(this).val(before.val());
                        }
                    });
                } else if ($(element).attr('data-after')) {

                    $(element).on('change', function(){

                        var after = $(this).attr('data-after');
                        after = $('#' + after);

                        var date1 = $(this).val().split(':');
                        var date2 = after.val().split(':');

                        date1 = moment().startOf('day').add(date1[0],'hours').add(date1[1], 'minutes');
                        date2 = moment().startOf('day').add(date2[0],'hours').add(date2[1], 'minutes');

                        if (date1.isAfter(date2)) {
                            $(this).val(after.val());
                        }
                    });
                }

            }
        };
    })

    ;
