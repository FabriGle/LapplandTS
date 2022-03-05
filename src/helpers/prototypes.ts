// Utils
var u = require('../Util')

// from ifa.js
require('ifa.js/src/utils/helpers/prototypes')

// @ts-ignore
String.prototype.firstUpper=function(){
	return this.split(' ')
		.map((w:string)=>w.split('')
			.map((c:string,i:number)=>i===0
				? c.toUpperCase()
				: c
			).join('')
	).join(' ')
};

// @ts-ignore
String.prototype.toRandomCase=function(){
	return this.split('')
		.map((c)=>require('../Util').random(2)==2
			? c.toLowerCase()
			: c.toUpperCase()
		).join('')
};

// @ts-ignore
Array.prototype.delete=function(k){
	var i=this.indexOf(k);
	if(i!==-1)return this.splice(i,1)
};

// @ts-ignore
String.prototype.toCode=function(n:string=''){
	return `\`\`\`${n}
${require('discord.js').Util.escapeCodeBlock(this)}
\`\`\``
};

// @ts-ignore 
String.prototype.tlc=function(){
	return this.toLowerCase()
};

// @ts-ignore 
String.prototype.tuc=function(){
	return this.toUpperCase()
}

// @ts-ignore
String.prototype.fup=function(){
	return this.split(' ')
		.map((w:any)=>{
			return w.split('').map((c:any,index:number)=>index===0?c.tuc():c).join('')
		})
		.join(' ');
}

// @ts-ignore
String.prototype.rc=function(){
	return this.split('')
		.map((c:string)=>u.random(2)===2?c.toLowerCase():c.toUpperCase())
		.join('');
}

// @ts-ignore
String.prototype.red=function(){
	return `\x1b[0m\x1b[31m${this}\x1b[0m`
}

// @ts-ignore
String.prototype.green=function(){
	return `\x1b[0m\x1b[32m${this}\x1b[0m`
}

// @ts-ignore
String.prototype.yellow=function(){
	return `\x1b[0m\x1b[33m${this}\x1b[0m`
}

// @ts-ignore
String.prototype.blue=function(){
	return `\x1b[0m\x1b[34m${this}\x1b[0m`
}

// @ts-ignore
String.prototype.magenta=function(){
	return `\x1b[0m\x1b[35m${this}\x1b[0m`
}