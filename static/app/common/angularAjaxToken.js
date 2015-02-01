'use strict';
var WID = 'test';


angular.module('xiaoyuApp').factory('AjaxToken', ['$q', '$log', '$rootScope',
    function($q, $log, $rootScope) {
        return {
            // --- rewrite request to add token to request params
            request: function(config) {
                if (config.params === undefined) {
                    config.params = {};
                }
                config.params.wid = WID;
                $log.log(config.params);
                // if (config.data === undefined) {
                //     //Do nothing if data is not originally supplied from the calling method
                // } else {
                //     config.data.GroupId = 7;
                // }

                // if (config.method === 'GET') {
                //     if (config.params === undefined) {
                //         config.params = {};
                //     }
                //     config.params.GroupId = 7;
                //     console.log(config.params);
                // }

                return config;
            }
        };
    }
]);

angular.module('xiaoyuApp').config(['$provide', '$httpProvider',
    function($provide, $httpProvider) {
        $httpProvider.interceptors.push('AjaxToken');

    }
]);