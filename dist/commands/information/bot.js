"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = {
    name: 'bot',
    aliases: ['bot-information', 'bot-info', 'botinfo'],
    desc: 'Return my information',
    run: (d) => __awaiter(void 0, void 0, void 0, function* () {
        var tsv = (yield d.exec('tsc -v')).toString(), uptime = d.client.uptime, CT = d.client.user.createdTimestamp, embed = {};
        embed.title = `${d.emotes.lappy} | Bot Information`;
        embed.thumbnail = { url: d.author.displayAvatarURL({ dynamic: !0, size: 4096 }) };
        embed.color = '#001';
        embed.description = `Prefix: \`${yield d.client.db.get('GUILD_PREFIX', d.msg.guild.id, '?')}\`
Creation Date: \`${CT}Ms\`  ||<t:${(CT / 1000).toFixed(0)}:R>||
Uptime: \`${uptime}Ms\`  ||<t:${((Date.now() - uptime) / 1000).toFixed(0)}:R>||
Ping: \`${d.client.ws.ping}Ms\`
Ram Usage: \`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} Mega Bytes\`
CPU Usage: \`${d.os.loadavg().map((c) => c + '%').join(' | ')}\`

**Libraries**
\`\`\`md
# TypeScript v${tsv.split(' ')[1]}# Node.js    ${process.version}\n# discord.js v${require('discord.js').version}\`\`\`
**Developers**
Main - <@!788869971073040454>`;
        d.msg.reply({ embeds: [embed] });
    })
};
