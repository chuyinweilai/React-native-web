
import React, { Component } from 'react';

const APPID = 'wxf8c8c30c4ef8e3f6';
const REDIRECT_URI = encodeURIComponent('http://cloudapi.famesmart.com/Mirai/web/src/index.html');
const testHttp = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf8c8c30c4ef8e3f6&redirect_uri=http%3A%2F%2Fwww.famesmart.com&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
const _wx={

	//获取用户信息授权
	getRoot(){
		// let uri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ APPID +'&redirect_uri='+ REDIRECT_URI +'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
		// console.log('getRootUri = ',uri)	

		fetch(testHttp, {
			method: 'GET',  
            mode: "no-cors", 
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Credentials':'true',
			}
		})
		.then((response)=>response.json())
		.then((json)=>{
			console.log('getJson = ',json)
		})
		.catch((error) => {
			console.log('error : ',error)
		})
	},

	//注册微信接口
	_Regist(foo){
		var str = ''
		fetch("http://famesmart.com/WebApp/public/sample.php",{
			method: 'post',
			body: location.href.split('#')[0]
		})
		.then((response) => response.json())
		.then((json) => {
			//http success
			wx.config({
				debug: false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: json.appId,// 必填，公众号的唯一标识
				timestamp: json.timestamp,// 必填，生成签名的时间戳
				nonceStr: json.nonceStr,// 必填，生成签名的随机串
				signature: json.signature,// 必填，签名
				jsApiList: [// 必填，需要使用的JS接口列表
				'checkJsApi',
				'scanQRCode',
				'getNetworkType'
				]
			});
			wx.error(function(res){   
				console.log('微信接口调用失败',res)
			});
		})
		.catch((error) => {
			console.log('error' + error);
		});
	},
}


// export default class wx extends Component {
// 	constructor(props){
// 		super(props);
		
// 	};

// }

module.exports  = _wx;