import React,{Component} from 'react';
import {
	
} from 'react-native';

const peruri = "http://cloudapi.famesmart.com";
const appData = require('./../../components/Ajax')
const _wx = require('./../../wx/wx')

const Routers  = require('./router');
const Regist  = require( './regist');
const Areas_choose  = require( './areas_choose');


const APPID = 'wxf8c8c30c4ef8e3f6';
const SECRET = 'ef02e18d9076d29858931626622a46e1';
const code = window.location.search;

const urlMess = window.location.search


export default class check extends Component{
	constructor(props){
		super(props);
		this.state={
			pageTurn: false,
			userMess: {},
		};
	}

	componentWillMount(){
		// this._getAccess()
		_wx._Regist()
		this._login(777)

	}

	//成功返回
	/*
	{"access_token":"",
	"expires_in":,"
	refresh_token":"","
	openid":"",
	"scope":""}
	*/
	_getAccess(){
		let as = /[^/code=?][0-9a-zA-Z]*[$/9a-zA-Z]?/;
		let arr = code.split('&')[0];
		let COD = arr.match(as)[0];
		let aurl = 'http://cloudapi.famesmart.com/redirect.php?appid=' + APPID + '&secret=' + SECRET + '&code='+ COD +''

		fetch(aurl,{
			method: 'GET',
			headers: {
				'Accept': 'application/json', 
				'Content-Type': 'application/json', 
				'Cache-Control':'no-cache', 
			},
		})
		.then(res => {
			if(res.status == 200){
				return res.json();
			}
		}) //判断res.state == 200 并进行json转换 
		.then(data => {
			this._login(data.openid)
			appData._Storage('set','openId',data.openid)
			appData._Storage('set','access_token',data.access_token)
		}).
		catch( error => {
			alert('get报错 :' + error)
		})

	}

	_login(openId){
		let afturi = '/api/wxuser/'+ openId
		appData._dataGet(afturi, (data) => {
			if(data){
				this.setState({
					userMess: data,
					pageTurn: true,
				})
			}else {
				this.setState({
					userMess: openId,
					pageTurn: false,
				})
			}
		});
	}

	_pageOut(){
		let userMess = this.state.userMess
		if(this.state.pageTurn){
			appData._Storage('set','userMess',userMess[0])
			return <Routers/>
		} else {
			return <Regist/>
		}
	}
	
	render(){
		return this._pageOut()
	}
}

module.exports = check