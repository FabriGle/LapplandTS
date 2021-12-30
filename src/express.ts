var app:any=require('express')(),colors:any=require('colors')
app
	.set('json spaces', 2)
	.get('/',(req:any,res:any)=>{
		res.json({
			status:res.statusCode,web: 'https://lappland.kaedestudio.ga/app',
			lavalink: {
				url: 'https://lava.pavez.ga',
				password: 'youshallnotpass',
				port: 443,
				secure: !0
		}
	})
})
module.exports = () => {
	app.listen(3000,()=>console.log('Server ready'))
	return!0
}