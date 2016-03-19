/**
 * XadillaX created at 2016-03-21 14:02:05 With ♥
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 */
"use strict";

(function() {
    var $;
    var onMessage = window.onMessage;

    var $ajax;
    var $$ajax = function() {
        var obj = $ajax.apply($, arguments);
        var arg = arguments;

        obj.done(function(msg) {
            onMessage({
                type: "$",
                param: arg.length ? arg[0] : {},
                result: msg
            });
        });
        
        return obj;
    };

    window.inject$ = function(_) {
        if($) return;
        $ = _;

        // ajax...
        $ajax = $.ajax.bind($);
        $.ajax = $$ajax.bind($);
    };
})();
