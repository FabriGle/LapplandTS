"use strict";
module.exports = async (_, q, s) => {
    var m = await q.textChannel.send(`Playing \`${s.name}\``);
    setTimeout(() => m.delete(), 6000);
};
