
import React, { Component } from 'react';


// require('./../../src/wx/wxjs-sdk.min');
const APPID = 'wxf8c8c30c4ef8e3f6';
const REDIRECT_URI = encodeURIComponent('http://cloudapi.famesmart.com/Mirai/web/src/index.html');

/*
	判断当前客户端版本是否支持指定JS接口
	wx.checkJsApi({
		jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
		success: function(res) {
			// 以键值对的形式返回，可用的api值true，不可用为false
			// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
		}
	});

	分享给朋友
	wx.onMenuShareAppMessage({
		title: '', // 分享标题
		desc: '', // 分享描述
		link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl: '', // 分享图标
		type: '', // 分享类型,music、video或link，不填默认为link
		dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		success: function () { 
			// 用户确认分享后执行的回调函数
		},
		cancel: function () { 
			// 用户取消分享后执行的回调函数
		}
	});

	下载图片到本地
	wx.downloadImage({
		serverId: '', // 需要下载的图片的服务器端ID，由uploadImage接口获得
		isShowProgressTips: 1, // 默认为1，显示进度提示
		success: function (res) {
			var localId = res.localId; // 返回图片下载后的本地ID
		}
	});
*/

const _wx={
	//注册微信接口
	_Regist(){
		var str = ''
		fetch("http://famesmart.com/WebApp/public/sample.php",{
			method: 'post',
			body: location.href.split('#')[0]
		})
		.then((response) => response.json())
		.then((json) => {
			wx.config({
				debug: false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: json.appId,// 必填，公众号的唯一标识
				timestamp: json.timestamp,// 必填，生成签名的时间戳
				nonceStr: json.nonceStr,// 必填，生成签名的随机串
				signature: json.signature,// 必填，签名
				jsApiList: [// 必填，需要使用的JS接口列表
				'checkJsApi',
				'chooseImage',
				'uploadImage',
				'downloadImage',
				'onMenuShareAppMessage',
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


module.exports  = _wx;