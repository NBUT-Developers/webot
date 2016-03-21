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

webot.on("logged_in", function(result) {
    debug("logged in with %j", result);
});

webot.on("load_contact_list", function(list) {
    debug("contact list: %j", list.map(function(item) {
        return item["NickName"];
    }));
});

webot.start();
