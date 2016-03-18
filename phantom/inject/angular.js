/**
 * XadillaX created at 2016-03-18 16:01:32 With ♥
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 */
"use strict";

(function() {
////////////////////////////////////////////////////////////////////////////////

var _proxy = window._proxy;
var angular = window.angular = {};
var trueAngularBootstrap;
Object.defineProperty(angular, "bootstrap", {
    get: function() {
        return trueAngularBootstrap ? function(element, moduleNames) {
            var moduleName = "webwxApp";
            if(moduleNames.indexOf(moduleName) >= 0) {
                var constants;
                angular.injector([ "ng", "Services" ]).invoke([
                    "confFactory",
                    function(confFactory) {
                        constants = confFactory;
                    }]);

                angular.module(moduleName).config([
                    "$httpProvider",
                    function($httpProvider) {
                        $httpProvider.defaults.transformResponse.push(function(value) {
                            if(typeof value === "object" && value !== null && value.AddMsgList instanceof Array) {
                                _proxy.emit("debug", value);
                            }

                            return value;
                        });
                    }
                ]);
            }

            return trueAngularBootstrap.apply(angular, arguments);
        } : trueAngularBootstrap;
    },
    set: function(real) {
        trueAngularBootstrap = real;
    }
});

_proxy.emit("debug", "injected");

////////////////////////////////////////////////////////////////////////////////
})();
