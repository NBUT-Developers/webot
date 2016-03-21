/**
 * XadillaX created at 2016-03-16 20:08:35 With ♥
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 */
"use strict";

var EventEmitter = require("events").EventEmitter;
var http = require("http");
var util = require("util");

var createIO = require("socket.io");
var debug = require("debug")("we:proxy:log");

var WeRemote = require("./remote");

var WeProxy = function(bot, port) {
    EventEmitter.call(this);

    var server = this.server = http.createServer();
    this.io = createIO(server);
    this.parent = bot;
    this.port = port || 3498;
    this.remote = null;

    this._initProxyEvents();
};

util.inherits(WeProxy, EventEmitter);

WeProxy.prototype.start = function() {
    this.server.listen(this.port);
    debug("proxy listened on %d", this.port);
};

WeProxy.prototype._initProxyEvents = function() {
    var self = this;
    this.io.on("connection", function(socket) {
        if(self.remote) {
            return;
        }

        debug("proxy client connected");
        var remote = new WeRemote(socket, self);
        self.remote = remote;
    });
};

module.exports = WeProxy;
