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
        self.parent.parent.emit("login_qrcode", url);
    });

    // 登录成功
    this.socket.on("logged_in", function(result) {
        self.parent.emit("logged_in", result);
        self.parent.parent.emit("logged_in", result);
    });

    // 载入联系人列表
    this.socket.on("load_contact_list", function(list) {
        self.parent.emit("load_contact_list", list);
        self.parent.parent.emit("load_contact_list", list);
    });

    this.socket.on("debug", function(msg) {
        debug("%j", msg);
    });
};

module.exports = WeRemote;
