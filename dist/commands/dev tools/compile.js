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
    name: 'compile',
    desc: 'Compile ts files',
    run: (d) => __awaiter(void 0, void 0, void 0, function* () {
        if (!['735170692915396698', '788869971073040454'].includes(d.author.id))
            return d.msg.reply('This command is for my developers only');
        var start = Date.now();
        yield d.exec('tsc');
        var fields = d.util.makeFields(['Compilation delay', `\`\`\`\n${Date.now() - start}Ms\`\`\``], ['Total compiled files', `\`\`\`\n${require('glob').sync('/home/runner/LapplandTS/dist/**').length}\`\`\``]);
        d.msg.reply({ embeds: [
                d.util.makeEmbed(d, `${d.emotes.lappy} | Compiled files`, null, fields)
            ] });
    })
};
