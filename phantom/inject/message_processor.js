/**
 * XadillaX created at 2016-03-20 15:02:10 With ♥
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 */
"use strict";

(function() {
////////////////////////////////////////////////////////////////////////////////

var proxy = window._proxy;

function process$Ajax(param/**, result*/) {
    // logged in
    if(param.url.indexOf("https://login.weixin.qq.com/cgi-bin/mmwebwx-bin/login") === 0) {
        var res = {
            code: window.code,
            redirectUri: window["redirect_uri"],
            userAvatar: window.userAvatar
        };

        // 扫描
        if(res.code === 201) {
            return proxy.emit("check_scan", res);
        }

        // 登录
        if(res.code === 200) {
            return proxy.emit("logged_in", res);
        }
    }
}

window.onMessage = function(message) {
    if(!message) return;

    // var constants = window.constants;

    // proxy.emit("debug", JSON.stringify(message).substr(0, 1000));

    if(typeof message === "object" && message.type === "$") {
        process$Ajax(message.param, message.result);
    } else if(typeof message === "object") {
        if(message["ContactList"] && message["Count"]) {
            proxy.emit("load_contact_list", message["ContactList"]);
        }
    } else if(typeof message === "string") {
        if(message.match(/<ret>(.*)<\/ret>/)) {
            proxy.emit("debug", message);
        }
    }
};

proxy.emit("debug", "message processor injected");

////////////////////////////////////////////////////////////////////////////////
})();
