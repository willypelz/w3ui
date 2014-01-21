'use strict';

angular.module('w3uiFrontendApp')
    .factory('Ajax', function ($http, Authentication) {

        /**
         * Global variables
         */
        var backendUrl = configuration.generateBackendURLHelper();
        console.log('Ajax Core', Authentication.get('token'));

        /**
         * Run Http Request
         *
         * @param requestData
         * @param requestSuccess
         * @param requestError
         */
        function run(requestData, requestSuccess, requestError, requestDone) {
            var url = $.trim(backendUrl + requestData.url);
            var method = $.trim(requestData.method);
            var headers = {
                'Accept': configuration.get('CONTENT_TYPE'),
                'Content-Type': configuration.get('CONTENT_TYPE'),
                'Authorization': Authentication.get('token')
            };


            //Check function vars
            var isRequestSuccessSet = false;
            var isRequestErrorSet = false;
            var isRequestDoneSet = false;
            if (typeof requestSuccess == 'function') {
                isRequestSuccessSet = true;
            }
            if (typeof requestError == 'function') {
                isRequestErrorSet = true;
            }
            if (typeof requestDone == 'function') {
                isRequestDoneSet = true;
            }


                //Without request data
            if (method == 'GET' || method == 'OPTIONS' || method == 'DELETE') {
                $http({
                    method: method,
                    url: url,
                    headers: headers
                }).success(function (responseBody, status, headers) {
                    Authentication.set('token', headers().authorization);

                    if(isRequestSuccessSet){
                        try {
                            requestSuccess(responseBody.data, responseBody.message, responseBody.status);
                        } catch (e) {
                            console.error('#ERROR - AJAX Factory: No Success Function Defined');
                        }
                    }

                    if(isRequestDoneSet){
                        try {
                            requestDone(responseBody.message, responseBody.status, headers);
                        } catch (e) {
                            console.error('#ERROR - AJAX Factory: No Done Function Defined');
                        }
                    }

                }).error(function () {
                    if(isRequestErrorSet){
                        try {
                            requestError(responseBody.message, responseBody.status);
                        } catch (e) {
                            console.error('#ERROR - AJAX Factory: No Error Function Defined');
                        }
                    }

                    if(isRequestDoneSet){
                        try {
                            requestDone(responseBody.message, responseBody.status, headers);
                        } catch (e) {
                            console.error('#ERROR - AJAX Factory: No Done Function Defined');
                        }
                    }
                });


            //With request data
            } else {
                var data = requestData.data;
                if (configuration.get('CONTENT_TYPE') == 'application/json') {
                    data = JSON.stringify(data);
                }

                $http({
                    method: method,
                    url: url,
                    data: data,
                    headers: headers
                }).success(function (responseBody, status, headers) {
                    Authentication.set('token', headers().authorization);

                    if(isRequestSuccessSet){
                        try {
                            requestSuccess(responseBody.data, responseBody.message, responseBody.status);
                        } catch (e) {
                            console.error('#ERROR - AJAX Factory: No Success Function Defined');
                        }
                    }

                    if(isRequestDoneSet){
                        try {
                            requestDone(responseBody.message, responseBody.status, headers);
                        } catch (e) {
                            console.error('#ERROR - AJAX Factory: No Done Function Defined');
                        }
                    }


                }).error(function () {
                    if(isRequestErrorSet){
                        try {
                            requestError(responseBody.message, responseBody.status);
                        } catch (e) {
                            console.error('#ERROR - AJAX Factory: No Error Function Defined');
                        }
                    }

                    if(isRequestDoneSet){
                        try {
                            requestDone(responseBody.message, responseBody.status, headers);
                        } catch (e) {
                            console.error('#ERROR - AJAX Factory: No Done Function Defined');
                        }
                    }

                });
            }
        }


        /**
         * Public API
         */
        return {
            get: function (options, success, error, done) {
                options.method = 'GET';
                run(options, success, error, done);
            },
            post: function (options, success, error, done) {
                options.method = 'POST';
                run(options, success, error, done);
            },
            put: function (options, success, error, done) {
                options.method = 'PUT';
                run(options, success, error, done);
            },
            delete: function (options, success, error, done) {
                options.method = 'DELETE';
                run(options, success, error, done);
            }
        };
    });