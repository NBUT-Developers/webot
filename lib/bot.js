/**
 * XadillaX created at 2016-03-18 13:55:34 With ♥
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 */
"use strict";

var EventEmitter = require("events").EventEmitter;
var util = require("util");

var _ = require("lodash");

var WeProxy = require("./proxy");
var WeSimulator = require("./simulator");

var Webot = function(proxyPort) {
    EventEmitter.call(this);
    this.proxyPort = proxyPort || _.random(30000, 40000);
    this.proxy = new WeProxy(this.proxyPort);
    this.simulator = new WeSimulator(this.proxyPort);

    this._init();
};

util.inherits(Webot, EventEmitter);

Webot.prototype._init = function() {
    var self = this;
    this.proxy.on("login_qrcode", function(url) {
        self.emit("login_qrcode", url);
    });
};

Webot.prototype.start = function() {
    this.proxy.start();
    this.simulator.start();
};

module.exports = Webot;
