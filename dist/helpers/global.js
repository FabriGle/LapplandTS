"use strict";
globalThis.os = require('os');
globalThis.axios = require('axios');
globalThis.util = require('../Util');
globalThis.cld = require('child_process');
globalThis.fs = require('fs');
globalThis.exec = async (c) => {
    return (await cld.execSync(c)).toString();
};
globalThis.aoiEval = async (d, code) => {
    return (await (require('../../node_modules/aoi.js/src/interpreter.js'))(_client, d.msg ?? {}, d.args ?? [], { name: 'Eval', code: code?.addBrackets() }, _client?.database, !0, void 0, {}, void 0, void 0, !1, !1, !0))?.code;
};
globalThis.ifaEval = async (d, code) => {
    return (await (require('../../node_modules/ifa.js/src/interpreter.js'))(_client, d.msg ?? {}, d.args ?? [], { name: 'Eval', code: code?.addBrackets() }, _client?.database, !0, void 0, {}, void 0, void 0, !1, !1, !0))?.code;
};
globalThis.random = (max, min = 1, d = !1) => d ? Math.random() * (max - min) + min : Math.round(Math.random() * (max - min)) + min;
