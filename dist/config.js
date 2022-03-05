"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.music = exports.Emotes = exports.bot = void 0;
var { Intents } = require('discord.js');
const soundcloud_1 = require("@distube/soundcloud");
const spotify_1 = require("@distube/spotify");
exports.bot = {
    allowedMentions: {
        repliedUser: false
    },
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ],
    presence: {
        status: 'dnd',
        activities: [
            {
                name: 'New prototypes, new Utils, basically, new system',
                type: 0
            }
        ]
    }
};
exports.Emotes = {
    error: '<:lappyAaa:913295794151501864>',
    rip: '<:lappydeath:902410489458475068>',
    facha: '<:lappyfacha:902410117826351154>',
    feli: '<:lappyfeli:913295978205966338>',
    food: '<:lappyfood:913295896899383306>',
    tofu: '<:lappytofu:902410429601570866>',
    death: '<:lappy_:902410151766667275> ',
    lappy: '<:lappy:902410135958343680>'
};
exports.music = {
    plugins: [new spotify_1.SpotifyPlugin(), new soundcloud_1.SoundCloudPlugin()],
    nsfw: !0,
    updateYouTubeDL: !1,
    youtubeDL: !1
};
