'use strict';
var HEADER_NAME = 'MyApp-Handle-Errors-Generically';
var specificallyHandleInProgress = false;

angular.module('xiaoyuApp').factory('RequestsErrorHandler', ['$q', '$log', '$rootScope', 'httpErrorAction',
    function($q, $log, $rootScope, httpErrorAction) {
        return {
            // --- The user's API for claiming responsiblity for requests ---
            specificallyHandled: function(specificallyHandledBlock) {
                specificallyHandleInProgress = true;
                try {
                    return specificallyHandledBlock();
                } finally {
                    specificallyHandleInProgress = false;
                }
            },

            // --- Response interceptor for handling errors generically ---
            responseError: function(rejection) {
                var shouldHandle = (rejection && rejection.config && rejection.config.headers && rejection.config.headers[HEADER_NAME]);

                if (shouldHandle) {
                    // --- Your generic error handling goes here ---
                    $log.log('error');
                    console.dir(rejection);
                    httpErrorAction.baseErrorHandler();
                }

                return $q.reject(rejection);
            },

            response: function(response) {
                var shouldHandle = (response && response.config && response.config.headers && response.config.headers[HEADER_NAME]);
                if (shouldHandle) {
                    if (response.data && !$rootScope.isUndefined(response.data.errorCode)) {
                        $log.log('res');
                        console.dir(response);
                        if (response.data.errorCode == 0) {
                            $log.log('res success');
                        } else {
                            $log.log('res fail');
                            httpErrorAction.update(response.data.errorDescription);
                            httpErrorAction.messageErrorHandler();
                            return $q.reject(response);
                        }
                    }


                }
                return response;
            }
        };
    }
]);

angular.module('xiaoyuApp').config(['$provide', '$httpProvider',
    function($provide, $httpProvider) {
        $httpProvider.interceptors.push('RequestsErrorHandler');

        // --- Decorate $http to add a special header by default ---

        function addHeaderToConfig(config) {
            config = config || {};
            config.headers = config.headers || {};

            // Add the header unless user asked to handle errors himself
            if (!specificallyHandleInProgress) {
                config.headers[HEADER_NAME] = true;
            }

            return config;
        }

        // The rest here is mostly boilerplate needed to decorate $http safely
        $provide.decorator('$http', ['$delegate',
            function($delegate) {
                function decorateRegularCall(method) {
                    return function(url, config) {
                        return $delegate[method](url, addHeaderToConfig(config));
                    };
                }

                function decorateDataCall(method) {
                    return function(url, data, config) {
                        return $delegate[method](url, data, addHeaderToConfig(config));
                    };
                }

                function copyNotOverriddenAttributes(newHttp) {
                    for (var attr in $delegate) {
                        if (!newHttp.hasOwnProperty(attr)) {
                            if (typeof($delegate[attr]) === 'function') {
                                newHttp[attr] = function() {
                                    return $delegate.apply($delegate, arguments);
                                };
                            } else {
                                newHttp[attr] = $delegate[attr];
                            }
                        }
                    }
                }

                var newHttp = function(config) {
                    return $delegate(addHeaderToConfig(config));
                };

                newHttp.get = decorateRegularCall('get');
                newHttp.delete = decorateRegularCall('delete');
                newHttp.head = decorateRegularCall('head');
                newHttp.jsonp = decorateRegularCall('jsonp');
                newHttp.post = decorateDataCall('post');
                newHttp.put = decorateDataCall('put');

                copyNotOverriddenAttributes(newHttp);

                return newHttp;
            }
        ]);
    }
]);