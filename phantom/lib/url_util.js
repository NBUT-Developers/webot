/**
 * XadillaX created at 2016-03-18 14:39:38 With ♥
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 */
"use strict";

exports.isLoginQRCodeUrl = function(url) {
    return /^https:\/\/login\.weixin\.qq\.com\/qrcode\/[a-zA-Z0-9\-\=]+$/.test(url);
};
