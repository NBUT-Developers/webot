/**
 * XadillaX created at 2016-03-18 14:05:21 With ♥
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 */
"use strict";

var debug = require("debug")("we:example");
var Webot = require("../lib/bot");

var webot = new Webot();

webot.on("login_qrcode", function(url) {
    debug("login qrcode: %s", url);
});

webot.start();
