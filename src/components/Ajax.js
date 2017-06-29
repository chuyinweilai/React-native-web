const peruri = "http://cloudapi.famesmart.com";

let appData  = {
	_dataGet(afteruri, callback){
		fetch(peruri+afteruri,{
			method: 'GET',
			headers: {
				'Accept': 'application/json', 'Content-Type': 'application/json', 'Cache-Control':'no-cache', 
			},
		})
		.then(res => res.status == 200 && res.json()) //判断res.state == 200 并进行json转换 
		.then(data => {
			callback(data)
		}).
		catch( error => {
			alert('data报错 :' + error)
		})
	},
	_dataPost(afteruri,data,callback){
		fetch(peruri+afteruri,{
				method: 'post',
				headers: {
					'Accept': 'application/json', 'Content-Type': 'application/json', 'Cache-Control':'no-cache', 
				},
				body: JSON.stringify(data)
		})
		.then(res =>{ 
			if(res.status == 200) {
				return res.json()
			}else if(res.status == 422){
				let ref={
					message: '报错'
				}
				return ref;
			}
		}) //判断res.state == 200 并进行json转换 
		.then(data => {
			if(data.message){
				alert(data.message)
			}else {
				callback(data)
			}
		}).
		catch( error => {
			alert('data报错 :' + error)
		})
	}
}
//在其他页面引用： let appData = require('./../data')

module.exports = appData;