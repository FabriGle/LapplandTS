"use strict";
var { Database } = require('dbdjs.db'), db = new Database({ path: './database/', tables: [{ name: 'main' }, { name: 'dev' }] });
db.connect();
module.exports = db;
