/**
 * XadillaX created at 2016-03-18 15:30:58 With ♥
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 */
"use strict";

window._proxy = window.io("http://127.0.0.1:" + window._proxyPort + "/");
window._proxy.emit("debug", "socket.io injected");
