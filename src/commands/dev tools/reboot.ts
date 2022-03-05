module.exports={
	name:'reboot',
	aliases:['rt'],
	desc:'The name is not quite descriptive?',
	run:async(d:any)=>{
		await d.util.reboot()
	}
}