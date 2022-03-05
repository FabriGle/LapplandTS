// Utils //
	// @ts-ignore
	globalThis.os = require('os');
	// @ts-ignore
	globalThis.axios = require('axios');
	// @ts-ignore
	globalThis.util = require('../Util');
	// @ts-ignore
	globalThis.cld = require('child_process');
	// @ts-ignore
	globalThis.fs = require('fs')
// Utils //

// Functions //
	// @ts-ignore
	globalThis.exec = async (c:string) => {
		// @ts-ignore
		return(await cld.execSync(c)).toString();
	};
	// @ts-ignore
	globalThis.aoiEval=async(d:any,code:any)=>{
		return(await (require('../../node_modules/aoi.js/src/interpreter.js'))(/*@ts-ignore*/_client, d.msg??{}, d.args??[], { name: 'Eval',code: code?.addBrackets() }, /*@ts-ignore*/_client?.database, !0, void 0, {}, void 0, void 0, !1, !1, !0))?.code
	};
	// @ts-ignore
	globalThis.ifaEval=async(d:any,code:any)=>{
		return(await (require('../../node_modules/ifa.js/src/interpreter.js'))(/*@ts-ignore*/_client, d.msg??{}, d.args??[], { name: 'Eval',code: code?.addBrackets() }, /*@ts-ignore*/_client?.database, !0, void 0, {}, void 0, void 0, !1, !1, !0))?.code
	};
  // @ts-ignore
	globalThis.random=(max:number,min:number=1,d:boolean=!1)=>d?Math.random()*(max-min)+min:Math.round(Math.random()*(max-min))+min
// Functions //