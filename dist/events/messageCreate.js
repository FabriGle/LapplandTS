"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const child_process_1 = __importDefault(require("child_process"));
const os_1 = __importDefault(require("os"));
var cpu = os_1.default.cpus()[0];
async function exec(c) {
    return (await child_process_1.default.execSync(c)).toString();
}
module.exports = async (_, msg) => {
    if (msg.author.bot || !msg.channel || !msg.guild)
        return;
    var { guild, channel, member, author } = msg;
    var T = await _.db.get('GLOBAL_XP', author.id, { level: 1, current_xp: 0, req_xp: 500 });
    if (!(await _.db.get('GLOBAL_XP_COOLDOWN', author.id, !1))) {
        if (T.current_xp <= T.req_xp) {
            T.current_xp = T.current_xp + random(20);
            await _.db.set('GLOBAL_XP', author.id, T);
            await _.db.set('GLOBAL_XP_COOLDOWN', author.id, !0, 5000);
        }
        else {
            T.current_xp = 0;
            T.req_xp = T.req_xp + 500;
            T.level++;
            await _.db.set('GLOBAL_XP', author.id, T);
            await _.db.set('GLOBAL_XP_COOLDOWN', author.id, !0, 5000);
            console.log(`\x1b[31m${author.username} \x1b[0mascended to level\x1b[31m ${T.level}\x1b[0m`);
        }
    }
    _.prefix = await _.db.get('GUILD_PREFIX', guild.id, '?');
    if (!msg.content.startsWith(_.prefix))
        return;
    var [Command, ...args] = msg.content
        .slice(_.prefix.length)
        .trim()
        .split(/ +/g);
    Command = Command.tlc();
    var last_arg = args[args.length - 1];
    var str_args = args.join(' ');
    var first_arg = args[0];
    var Cmd = await _.cmds
        .find((c) => c?.name === Command || c?.aliases?.includes(Command));
    if (!Cmd)
        return;
    try {
        return await Cmd.run({
            msg,
            channel,
            guild,
            author,
            member,
            perms: member.permissions.toArray(),
            hasPerms: (perms, member = msg.member) => {
                var mp = member.permissions.toArray();
                perms = perms
                    .replace(' ', '')
                    .tuc()
                    .split(',');
                return mp.some((p) => p === 'ADMINISTRATOR') ? true : perms.every((P) => mp.some((p) => p === P));
            },
            distube: _.distube,
            queue: _.distube.getQueue(msg),
            args,
            last_arg,
            str_args,
            first_arg,
            removeArg: (arg) => {
                args.delete(arg);
                last_arg = args[args.length - 1];
                str_args = args.join(' ');
                first_arg = args[0];
            },
            Command,
            Cmd,
            client: _,
            emotes: _.Config.Emotes,
            util: _.util,
            os: os_1.default,
            cpu,
            cld: child_process_1.default,
            exec,
            axios: axios_1.default
        });
    }
    catch (e) {
        var embedError = _.util.makeError({ author, emotes: _.Config.Emotes }, `Reason: ${e.message}`, e.name);
        var row = {
            type: 1,
            components: [{
                    label: 'View stack',
                    type: 2,
                    style: 4,
                    customId: 'STACK_' + _.util.snowflake(),
                    disabled: !1,
                    emoji: null
                }]
        };
        _.cache.set(row.components[0].customId, e.stack);
        console.log(`\x1b[31m${e}\x1b[0m`);
        return msg.reply({ embeds: [embedError], components: [row] });
    }
};
