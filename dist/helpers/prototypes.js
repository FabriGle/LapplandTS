"use strict";
var u = require('../Util');
require('ifa.js/src/utils/helpers/prototypes');
String.prototype.firstUpper = function () {
    return this.split(' ')
        .map((w) => w.split('')
        .map((c, i) => i === 0
        ? c.toUpperCase()
        : c).join('')).join(' ');
};
String.prototype.toRandomCase = function () {
    return this.split('')
        .map((c) => require('../Util').random(2) == 2
        ? c.toLowerCase()
        : c.toUpperCase()).join('');
};
Array.prototype.delete = function (k) {
    var i = this.indexOf(k);
    if (i !== -1)
        return this.splice(i, 1);
};
String.prototype.toCode = function (n = '') {
    return `\`\`\`${n}
${require('discord.js').Util.escapeCodeBlock(this)}
\`\`\``;
};
String.prototype.tlc = function () {
    return this.toLowerCase();
};
String.prototype.tuc = function () {
    return this.toUpperCase();
};
String.prototype.fup = function () {
    return this.split(' ')
        .map((w) => {
        return w.split('').map((c, index) => index === 0 ? c.tuc() : c).join('');
    })
        .join(' ');
};
String.prototype.rc = function () {
    return this.split('')
        .map((c) => u.random(2) === 2 ? c.toLowerCase() : c.toUpperCase())
        .join('');
};
String.prototype.red = function () {
    return `\x1b[0m\x1b[31m${this}\x1b[0m`;
};
String.prototype.green = function () {
    return `\x1b[0m\x1b[32m${this}\x1b[0m`;
};
String.prototype.yellow = function () {
    return `\x1b[0m\x1b[33m${this}\x1b[0m`;
};
String.prototype.blue = function () {
    return `\x1b[0m\x1b[34m${this}\x1b[0m`;
};
String.prototype.magenta = function () {
    return `\x1b[0m\x1b[35m${this}\x1b[0m`;
};
