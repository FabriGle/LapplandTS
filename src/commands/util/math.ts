module.exports = {
	name: 'calculate',
	aliases: ['math'],
	params:[{name:'operation',opt:!1}],
	run:async (d:any) => {
		if(!d.str_args){
			var _err = util.makeError(d,'field 1 [\'operation\'] cannot be empty','field');
			return d.msg.reply({embeds:[_err]});
		};
		var _op1 = /([0-9]|\/|\+|\*|-|%|<|\(|\)|\[|\]|\.)/g;
		var _op2 = d.str_args.match(_op1).join('');
		if(_op2.replace(_op1,'').trim().length){
			var _err = util.makeError(d,'Invalid opration','Syntax');
			return d.msg.reply({embeds:[_err]});
		};
		try{
			_op2 = eval(_op2);
		}catch(e){
			var _err = util.makeError(d,e.message,e.title);
			return d.msg.reply({embeds:[_err]})
		};
		var _f = util.makeFields([
			':incoming_envelope: | input', d.str_args.toCode('fix')
		],[
			':page_facing_up: | output', _op2.toString().toCode('fix')
		]);
		var _e = util.makeEmbed(d,':book_blue: | Math opration',void 0,_f)
		return d.msg.reply({embeds:[_e]})
	}
}