'use strict';

angular
  .module('sade.user', ['sade.rest'])
  .service('$User', ['$Rest', '$rootScope', '$q', '$localStorage', '$window',

    /**
     * The User Rest Service.
     *
     * @type {$User|Object}
     *
     * @param $Rest the $Rest rest service
     * @param $rootScope The angular $routeScope service
     * @param $q The angular promise service
     * @param $storage The ngStorage session service
     * @param $window
     */
      function ($Rest, $rootScope, $q, $storage, $window) {

      /**
       * Instantiates a new User Rest Service.
       *
       * @constructor
       * @param {$Rest} rest The rest instance
       * @param {$localstorage} storage the storage service
       * @param {$rootScope} scope The root scope
       */
      var UserRestService = function (rest, storage, scope) {

        /*
         * The service storage definition
         */
        storage.$default({
          user: {
            me: null
          }
        });

        // Prepare instance dependencies
        var self = this;
        self.rest = rest;
        self.cache = storage.user;
        self.scope = scope;

      };

      /**
       * Clear the service cache
       */
      UserRestService.prototype.clear = function () {
        this.cache.me = null;
        this.scope.path('/entrar');
      };


      /**
       * Gets the current user in session, if any.
       *
       * @returns {$User.me|null}
       */
      UserRestService.prototype.me = function () {
        return this.cache.me;
      };

      /**
       * Gets the user current token, if any.
       *
       * @returns {null|String}
       */
      UserRestService.prototype.token = function () {
        return this.cache.me ? this.cache.me.loginToken : null;
      };

      /**
       * Authenticates the user specified in the data
       *
       * @param data
       * @param {Function} [fn] The legacy callback
       *
       * @returns {Promise}
       */
      UserRestService.prototype.login = function (data, fn) {

        var self = this;
        var q = $q.defer();
        fn = fn || angular.noop;

        // Perform the post request
        self.rest.post('/login', data).then(function (response) {

          console.log(response);

          // Store user in cache and resolve
          self.cache.me = response.object;
          q.resolve(self.me());
          fn(null, self.me());

        }, function (error) {

          q.reject(error);
          fn(error);

        });

        return q.promise;

      };

      /**
       * Logout the user
       *
       * @param {Function} [fn] The legacy callback
       *
       * @returns {Promise}
       */
      UserRestService.prototype.logout = function (fn) {

        var self = this;
        var q = $q.defer();
        fn = fn || angular.noop;
        var token = self.cache.me.loginToken || null;

        // Perform the post request
        self.rest.post('/logout', token).then(function (response) {

          console.log(response);

          // Store user in cache and resolve
          self.clear();
          q.resolve();
          fn(null);

        }, function (error) {

          q.reject(error);
          fn(error);

        });

        return q.promise;

      };

      /**
       * Register the user specified in the data
       *
       * @param data
       * @param {Function} [fn] The legacy callback
       *
       * @returns {Promise}
       */
      UserRestService.prototype.signup = function (data, fn) {

        var self = this;
        var q = $q.defer();
        fn = fn || angular.noop;

        // Perform the post request
        self.rest.post('/user/register', data).then(function (response) {

          console.log(response);

          // Store user in cache and resolve
          self.cache.me = response.data;
          q.resolve(self.me());
          fn(null, self.me());

        }, function (error) {

          q.reject(error);
          fn(error);

        });

        return q.promise;

      };

      /**
       * Updates the user specified in the data
       *
       * @param data
       * @param {Function} [fn] The legacy callback
       *
       * @returns {Promise}
       */
      UserRestService.prototype.update = function (data, fn) {

        var self = this;
        var q = $q.defer();
        fn = fn || angular.noop;
        
        data.loginToken = self.cache.me.loginToken || null;

        // Perform the post request
        self.rest.post('/user/update', data).then(function (response) {

          console.log(response);

          q.resolve(response);
          fn(null, response);

        }, function (error) {

          q.reject(error);
          fn(error);

        });

        return q.promise;

      };

      /**
       * Gets the skills data
       *
       * @param {Function} [fn] The legacy callback
       *
       * @returns {Promise}
       */
      UserRestService.prototype.getSkills = function (fn) {

        var self = this;
        var q = $q.defer();
        fn = fn || angular.noop;

        // Perform the post request
        self.rest.get('/skill/get').then(function (response) {

          q.resolve(response.object);
          fn(null, response.object);

        }, function (error) {

          q.reject(error);
          fn(error);

        });

        return q.promise;

      };

      /**
       * Gets user
       *
       * @param {Function} [fn] The legacy callback
       *
       * @returns {Promise}
       */
      UserRestService.prototype.getUser = function (fn) {

        var self = this;
        var q = $q.defer();
        fn = fn || angular.noop;
        var token = self.cache.me.loginToken || null;

        // Perform the post request
        self.rest.post('/user/get', token).then(function (response) {

          q.resolve(response);
          fn(null);

        }, function (error) {

          q.reject(error);
          fn(error);

        });

        return q.promise;

      };

      return new UserRestService(new $Rest(), $storage, $rootScope)

    }
  ]);