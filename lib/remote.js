/**
 * XadillaX created at 2016-03-16 20:17:50 With ♥
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 */
"use strict";

var debug = require("debug")("we:remote:debug");

var WeRemote = function(socket, proxy) {
    this.socket = socket;
    this.parent = proxy;
    this._init();
};

WeRemote.prototype._init = function() {
    var self = this;

    // 登录二维码
    this.socket.on("login_qrcode", function(url) {
        self.parent.emit("login_qrcode", url);
    });

    this.socket.on("debug", function(msg) {
        debug("%j", msg);
    });
};

module.exports = WeRemote;
