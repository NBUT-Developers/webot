/**
 * XadillaX created at 2016-03-18 13:49:32 With ♥
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 */
"use strict";

var Module = require("module");
var path = require("path");
var childProcess = require("child_process");

var debug = require("debug")("we:simulator:log");
var error = require("debug")("we:simulator:error");

var phantomjs = require("phantomjs");

var WeSimulator = function(port) {
    this.serverPort = port;
    this.bin = phantomjs.path;
    this.script = path.join(__dirname, "../phantom/run.js");

    this.socketIOClientPath = Module._resolveFilename("socket.io-client", module);
    this.socketIOClientPath = path.dirname(path.dirname(this.socketIOClientPath));

    this.phantom;
};

WeSimulator.prototype.start = function() {
    if(this.phantom) return;

    debug("creating phantomjs child process");
    this.phantom = childProcess.spawn(this.bin, [
        this.script,
        "--port=" + this.serverPort,
        "--iopath=" + this.socketIOClientPath,
        "--rootpath=" + path.join(__dirname, "../")
    ]);

    var phantomChunk = "";
    this.phantom.stdout.on("data", function(data) {
        data = data.toString();
        if(!data) return;

        if(data[data.length - 1] !== "\n") {
            phantomChunk += data;
        } else {
            debug(phantomChunk + data.substr(0, data.length - 1));
            phantomChunk = "";
        }
    });

    this.phantom.stderr.on("data", function(data) {
        data = data.toString();
        if(!data) return;

        if(data[data.length - 1] !== "\n") {
            phantomChunk += data;
        } else {
            error(phantomChunk + data.substr(0, data.length - 1));
            phantomChunk = "";
        }
    });

    this.phantom.on("close", function(code) {
        debug("phantom closed with code " + code);
    });
};

module.exports = WeSimulator;
