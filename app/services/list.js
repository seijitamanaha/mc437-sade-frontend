'use strict';

angular
  .module('sade.list', ['sade.rest'])
  .service('$List', ['$Rest', '$User', '$rootScope', '$q',

    /**
     * The List Rest Service.
     *
     * @type {$User|Object}
     *
     * @param $Rest the $Rest rest service
     * @param $rootScope The angular $routeScope service
     * @param $q The angular promise service
     */
      function ($Rest, $rootScope, $q) {

      /**
       * Instantiates a new List Rest Service.
       *
       * @constructor
       * @param {$Rest} rest The rest instance
       * @param {$rootScope} scope The root scope
       */
      var ListRestService = function (rest, scope) {

        // Prepare instance dependencies
        var self = this;
        self.rest = rest;
        self.scope = scope;

      };

      /**
       * Lists the data
       *
       * @param data
       * @param {Function} [fn] The legacy callback
       *
       * @returns {Promise}
       */
      ListRestService.prototype.listUsers = function (data, fn) {

        var self = this;
        var q = $q.defer();
        fn = fn || angular.noop;

        // Perform the get request
        self.rest.get('/posts').then(function (response) {

          q.resolve(response);
          fn(null, response);

        }, function (error) {

          q.reject(error);
          fn(error);

        });

        return q.promise;

      };

      return new ListRestService(new $Rest(), $rootScope)

    }
  ]);