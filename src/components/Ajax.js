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
	_dataPost(afteruri){
		fetch(peruri+afteruri+'/11/close',{
				method: 'post',
				headers: {
					'Accept': 'application/json', 'Content-Type': 'application/json', 'Cache-Control':'no-cache', 
				},
		})
		.then(res => res.status == 202 && res.json()) //判断res.state == 200 并进行json转换 
		.then(data => {

		}).
		catch( error => {
			alert('data报错 :' + error)
		})
	}
}
//在其他页面引用： let appData = require('./../data')

module.exports = appData;