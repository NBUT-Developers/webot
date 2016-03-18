/**
 * XadillaX created at 2016-03-18 13:51:14 With ♥
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 */
var Page = require("webpage");
var system = require("system");
var opts = require("minimist")(system.args);

var urlUtil = require("./lib/url_util");

var homepage = "https://wx.qq.com/";

var page = Page.create();

page._emit = function(event, param) {
    page.evaluate(function(event, param) {
        window._proxy.emit(event, param);
    }, event, param);
};

page.onInitialized = function() {
    page.evaluate(function(port) {
        window._proxyPort = port;
    }, opts.port);

    console.log("page initialized");
    page.libraryPath = opts.iopath;
    console.log("inject socket.io.js: " + page.injectJs("socket.io.js"));
    page.libraryPath = opts.rootpath;
    console.log("inject custom listener code: " + page.injectJs("phantom/inject/io.js"));
    console.log("inject custom angular code: " + page.injectJs("phantom/inject/angular.js"));
};

// page.onResourceReceived = function(responseData) {
//     console.log("received: " + responseData.url);
// };

page.onResourceRequested = function(requestData) {
    if(urlUtil.isLoginQRCodeUrl(requestData.url)) {
        page._emit("login_qrcode", requestData.url);
    }
};

page.open(homepage, function() {});
