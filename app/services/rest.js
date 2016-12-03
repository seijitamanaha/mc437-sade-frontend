'use strict';

/*
 * The angular Rest Client module.
 */
angular
  .module('sade.rest', [])
  .factory('$Rest', ['$http', '$q',

    /**
     * The Rest Client factory
     *
     */
      function ($http, $q) {

      return function (opt) {

        opt = opt || {};
        /** API URL Definition */
        opt.base_url = opt.base_url || 'http://177.220.85.233:8437/sade';

        var cache = {};

        /**
         * Perform an API request
         *
         * @param {String} method The HTTP method
         * @param {String} action The api action endpoint uri
         * @param {Object} input The input object
         * @param {Object} headers The request headers
         * @param transformRequest
         *
         * @returns {HttpPromise} The angular http promise
         */
        var request = function (method, action, input, headers, transformRequest) {

          var q = $q.defer();

          var req = {
            method: method,
            url: (opt.base_url + action),
            headers: headers,
            data: (method.toUpperCase() !== 'GET' ? input : {}),
            params: (method.toUpperCase() === 'GET' ? input : {})
          };

          if(transformRequest)
            req.transformRequest = transformRequest;

          $http(req).then(function (response) {

            if (response && response.data && (response.data.code === '00' || response.data.code === '200')) {
              q.resolve(response.data);
            } else {
              q.reject(response);
            }

          }, function (error) {

            q.reject(error);

          });

          return q.promise;

        };

        /*
         * Service public interface
         */
        return {

          /**
           * Performs a GET request in the API
           *
           * @param {String} action The action path
           * @param {Object} [input] The input to the GET request
           * @returns {HttpPromise} The angular http promise
           */
          'get': function (action, input, headers) {
            return request('get', action, input, headers);
          },

          /**
           * Performs a POST request in the API
           *
           * @param {String} action The action path
           * @param {Object} input The input to the POST request
           * @returns {HttpPromise} The angular http promise
           */
          'post': function (action, input, headers) {
            return request('post', action, input, headers);
          },

          /**
           * Performs a PUT request in the API
           *
           * @param {String} action The action path
           * @param {Object} input The input to the PUT request
           * @returns {HttpPromise} The angular http promise
           */
          'put': function (action, input, headers) {
            return request('put', action, input, headers);
          },

          /**
           * Performs a DELETE request in the API
           *
           * @param {String} action The action path
           * @param {Object} [input] The input to the DELETE request
           * @returns {HttpPromise} The angular http promise
           */
          'delete': function (action, input, headers) {
            return request('delete', action, input, headers);
          }

        }

      };

    }
  ]);