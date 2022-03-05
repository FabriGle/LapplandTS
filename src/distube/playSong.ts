module.exports=async(_:any,q:any,s:any)=>{
	var m = await q.textChannel.send({
		content: `Playing \`${s.name}\`.\nRequested by ${s.user.tag}`
	});
	setTimeout(()=>m.delete(),6000)
}