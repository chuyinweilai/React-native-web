import React,{ Component } from 'react';
import{
	Text,
	View,
	Image,
	Navigator,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

const peruri = "http://cloudapi.famesmart.com";
const appData = require('./../../components/Ajax')
const pxToDp =require('../responsive/px');
const Addvisitor =require('./addvisitor');

export default class invite extends Component{
	constructor(props){
		super(props);
		this.state = {
			_page: 'recording'
		}
	}

	//记录
	recording(){
		return(
			<View style={{flex: 1}}>
				<View style={{height:pxToDp(86), flexDirection:'row', justifyContent:'space-between', borderBottomColor:'#bebebe', borderBottomWidth: pxToDp(2)}}>
					<TouchableOpacity style={{width:pxToDp(120), alignItems: 'center',  flexDirection:'row'}} onPress={()=>this.props.backCtrl(false)}>
						<Image style={{height:pxToDp(48), width: pxToDp(48)}} source={require('./../../assets/arrow-left.png')} 	resizeMode="contain"></Image>
						<Text style={{fontSize:pxToDp(30)}}>返回</Text>
					</TouchableOpacity>
					<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<Text>访客邀请</Text>
					</View>
					<View style={{width:pxToDp(120)}}></View>
				</View>
				<View style={{flex: 1, backgroundColor:'#efefef', paddingVertical:pxToDp(20)}}>
					<View style={{paddingBottom: pxToDp(14),paddingHorizontal: pxToDp(36), flexDirection:'row', alignItems:'center'}}>
						<Text style={{fontSize:pxToDp(28), color: '#5a5a5a'}}>上海闵行区马桥智慧社区34号1901室</Text>
						<Image style={{height:pxToDp(48), width: pxToDp(48)}} source={require('./../../assets/wxb定位.png')} resizeMode="contain"/>
					</View>

					<View style={{backgroundColor: 'white', flexDirection:'row', height: pxToDp(170), borderBottomColor:'#bebebe', borderBottomWidth: pxToDp(2), paddingHorizontal: pxToDp(36), }}>
						<View style={{flex: 1, justifyContent:'space-around'}}>
							<Text style={{fontSize: pxToDp(40), color: '#474747'}}>小萌姐</Text>
							<Text style={{fontSize: pxToDp(26), color: '#bbb'}}>有效期至： 2017年3月31日 21:53</Text>
						</View>
						<View style={{alignItems:'center', justifyContent:'center'}}>
							<Text style={{fontSize:pxToDp(40), color: '#b1cd29'}}>生效中</Text>
						</View>
					</View>

					<View style={{backgroundColor: 'white', flexDirection:'row', height: pxToDp(170), borderBottomColor:'#bebebe', borderBottomWidth: pxToDp(2), paddingHorizontal: pxToDp(36), }}>
						<View style={{flex: 1, justifyContent:'space-around'}}>
							<Text style={{fontSize: pxToDp(40), color: '#474747'}}>小萌姐</Text>
							<Text style={{fontSize: pxToDp(26), color: '#bbb'}}>有效期至： 2017年3月31日 21:53</Text>
						</View>
						<View style={{alignItems:'center', justifyContent:'center'}}>
							<Text style={{fontSize:pxToDp(40), color: '#a0a0a0'}}>已过期</Text>
						</View>
					</View>

				</View>
				<View>
					<TouchableOpacity style={{height:pxToDp(86), backgroundColor: '#69bdd0', alignItems:'center', justifyContent:'center'}} onPress={()=> this._addvisitor(true)}>
						<Text style={{fontSize: pxToDp(38), color: 'white'}}>+添加新邀请</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}

	//新增页面控制器
	_addvisitor(bol){
		if(bol){
			this.setState({
				_page: 'addVisitor'
			})
		}else {
			this.setState({
				_page: 'recording'
			})
		}
	}

	_choosePage(){
		if(this.state._page == 'recording'){
			let page = this.recording();
			return page;
		} else if(this.state._page == 'addVisitor'){
			return <Addvisitor backCtrl={()=>this._addvisitor(false)}/>
		}
	}

	render(){
		return (
			<View style={{flex: 1}}>
				{this._choosePage()}
			</View>
		)
	}
}
module.exports = invite;