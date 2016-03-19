/**
 * XadillaX created at 2016-03-18 16:01:32 With ♥
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 */
"use strict";

(function() {
////////////////////////////////////////////////////////////////////////////////

var proxy = window._proxy;
var angular = window.angular = {};
var trueAngularBootstrap;
var onMessage = window.onMessage;
var inject$ = window.inject$;

// pre-create a bootstrap angular object
Object.defineProperty(angular, "bootstrap", {
    get: function() {
        return trueAngularBootstrap ? function(element, moduleNames) {
            var moduleName = "webwxApp";
            if(moduleNames.indexOf(moduleName) >= 0) {
                proxy.emit("debug", angular);

                var constants;
                angular.injector([ "ng", "Services" ]).invoke([
                    "confFactory",
                    function(confFactory) {
                        window.constants = constants = confFactory;
                    }]);

                // inject angular $httpProvider
                angular.module(moduleName).config([
                    "$httpProvider",
                    function($httpProvider) {
                        $httpProvider.defaults.transformResponse.push(function(value) {
                            // proxy.emit("debug", ">>>>> " + JSON.stringify(arguments[1]()));
                            onMessage(value);
                            return value;
                        });
                    }
                ]);

                // inject jquery
                inject$(window.$);
            }

            return trueAngularBootstrap.apply(angular, arguments);
        } : trueAngularBootstrap;
    },
    set: function(real) {
        trueAngularBootstrap = real;
    }
});

proxy.emit("debug", "angular object injected");

////////////////////////////////////////////////////////////////////////////////
})();
