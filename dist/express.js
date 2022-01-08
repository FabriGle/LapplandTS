"use strict";
var app = require('express')();
app
    .set('json spaces', 2)
    .get('/', (req, res) => {
    res.json({
        status: res.statusCode, web: 'https://lappland.kaedestudio.ga/app',
        lavalink: {
            url: 'https://lava.pavez.ga',
            password: 'youshallnotpass',
            port: 443,
            secure: !0
        }
    });
});
module.exports = () => {
    app.listen(3000, () => console.log('Server ready'));
    return !0;
};
