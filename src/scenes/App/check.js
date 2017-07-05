import React,{Component} from 'react';
import {
	
} from 'react-native';

const peruri = "http://cloudapi.famesmart.com";
const appData = require('./../../components/Ajax')

const Routers  = require('./router');
const Regist  = require( './regist');
const Areas_choose  = require( './areas_choose');

export default class check extends Component{
	constructor(props){
		super(props);
		this.state={
			pageTurn: false,
			userMess: {},
		};
	}
	componentWillMount(){
		this._login(777)
	}

	_login(openId){
		let afturi = '/api/wxuser/'+ openId
		appData._dataGet(afturi, (data) => {
			if(data){
				this.setState({
					pageTurn: true,
					userMess: data,
				})
			}else {
				this.setState({
					pageTurn: false,
					userMess: openId,
				})
			}
		});
	}

	_pageOut(){
		let userMess = this.state.userMess
		if(this.state.pageTurn){
			if(userMess.length >1){
				return <Areas_choose userMess={userMess}/>
			} else {
				appData._Storage('set','userMess',data[0])
				return <Routers/>
			}
		} else {
			return <Regist/>
		}
	}
	
	render(){
		return this._pageOut()
	}
}

module.exports = check