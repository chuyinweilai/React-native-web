import React,{ Component } from 'react';
import{
	Text,
	View,
	Image,
	Navigator,
	StyleSheet,
	TextInput,
	Button,
	TouchableOpacity,
	TouchableHighlight,
} from 'react-native';

const peruri = "http://cloudapi.famesmart.com";
const appData = require('./../../components/Ajax');
const Buttons = require('./../../components/Buttons');
const Card = require('./card');

const pxToDp =require('../responsive/px');

export default class invite extends Component{
	constructor(props){
		super(props);
			this.state = {
				//用户类型单选
				color1: "#c9c9c9",
				color2: "#69add0",
				visitType:'2',				
				card1: "#69add0",
				card2: "#c9c9c9",
				card3: "#c9c9c9",
				cardType:'00',
				
				page: true,
			};
			this.text = '';
			this.message;
	}


	_RouterCtrl(control){
		if(control){
			this.setState({
				page: false,
			})
		}else {
			this.setState({
				page: true,
			})
		}
	}

	//改变按钮背景颜色
	_changeBColor(){
		return this.state.color
	}

	//用户类型
	_visitType(type){
		if(type == 1){
			this.setState({
				color1: '#69add0',
				color2: '#c9c9c9',
				visitType:'1'
			})
		} else {
			this.setState({
				color2: '#69add0',
				color1: '#c9c9c9',
				visitType:'2'
			})
		}
	}

	//备注
	_textType(text){
		this.text = text
	}

	//卡片类型
	_cardType(type){
		if(type == 1){
			this.setState({
				card1: "#69add0",
				card2: "#c9c9c9",
				card3: "#c9c9c9",
				cardType:'00'
			})
		} else if(type == 2){
			this.setState({
				card1: "#c9c9c9",
				card2: "#69add0",
				card3: "#c9c9c9",
				cardType:'01'
			})
		} else if(type ==3){
			this.setState({
				card1: "#c9c9c9",
				card2: "#c9c9c9",
				card3: "#69add0",
				cardType:'02'
			})
		}
	}

	//提交数据
	_pulldata(){
		let visitType = this.state.visitType;
		let cardType = this.state.cardType;
		let text = this.text;

		let uri = '/api/cards/take';
		let _data = {
			"wx_id": "18912342933",		//openId
			"card_type": cardType,		  //00单次，01月卡，02季卡
			"user_type": visitType,			//0本人，1租户，2访客
			"memo": text				       //备注
		}
		appData._dataPost(uri,_data,(ref)=>{
			if(ref[1] < 0){
				this._fail(ref)
			} else {
				this._success(ref)
			}
		})
	}
	
	//成功返回
	_success(arry){
		this.message = arry;
		this.setState({
			page: false
		})
	}

	//失败返回
	_fail(mess){
		// console.log(mess)
	}

	//页面内容判断
	_showPage(){
		if(this.state.page){
			return this._nowPage();
		} else {
			return this._jumpPage();
		}
	}

	//当前页内容
	_nowPage(){
		return (
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
					<View style={{paddingBottom: pxToDp(14), paddingHorizontal: pxToDp(36), flexDirection:'row', alignItems:'center'}}>
						<Text style={{fontSize:pxToDp(28), color: '#5a5a5a'}}>上海闵行区马桥智慧社区34号1901室</Text>
						<Image style={{height:pxToDp(48), width: pxToDp(48)}} source={require('./../../assets/wxb定位.png')} resizeMode="contain"/>
					</View>

					<View style={{height:pxToDp(380), backgroundColor: 'white', paddingHorizontal: pxToDp(36), paddingVertical: pxToDp(20) }}>
						<View style={{flex: 1, flexDirection:'row',paddingVertical: pxToDp(20) ,borderBottomColor:'#bebebe', borderBottomWidth: pxToDp(2)}}>
							<View style={{width:pxToDp(200)}}>
								<Text style={{fontSize: pxToDp(36), color: '#474747'}}>邀请类别</Text>
							</View>
							<View style={{flex: 1}}>
								<TouchableOpacity 
									style={[{height: pxToDp(46), width: pxToDp(132), borderRadius:pxToDp(10),
												backgroundColor:"#69bdd0", justifyContent:'center'},{ backgroundColor:this.state.color1}]}  
									onPress={()=>this._visitType(1)}>
									<Text style={{fontSize: pxToDp(26), textAlign:'center', color: 'white'}}>租户</Text>
								</TouchableOpacity>
							</View>
							<View style={{flex: 1}}>
								<TouchableOpacity 
									style={[{height: pxToDp(46), width: pxToDp(132), borderRadius:pxToDp(10),
												backgroundColor:"#69bdd0", justifyContent:'center'},{ backgroundColor:this.state.color2}]}  
									onPress={()=>this._visitType(2)}>
									<Text style={{fontSize: pxToDp(26), textAlign:'center', color: 'white'}}>访客</Text>
								</TouchableOpacity>
							</View>
						</View>

						<View style={{flex: 1, flexDirection:'row',paddingVertical: pxToDp(20) ,borderBottomColor:'#bebebe', borderBottomWidth: pxToDp(2)}}>
							<View style={{width:pxToDp(200)}}>
								<Text style={{fontSize: pxToDp(36), color: '#474747'}}>备注</Text>
							</View>
							<View style={{flex: 1}}>
									<TextInput onChangeText={(value)=> this._textType(value)} style={{height: pxToDp(46), fontSize: pxToDp(26), color: '#474747', }} maxLength={14} placeholder ='可填写姓名等信息'/>
							</View>
						</View>
						
						<View style={{flex: 2, flexDirection:'row',paddingVertical: pxToDp(20)}}>
							<TouchableOpacity style={{flex: 1, alignItems:'center'}} onPress={() => this._cardType('1')}>
								<Image style={[{width: pxToDp(92), height: pxToDp(92), backgroundColor:'#69bdd0'},{backgroundColor:this.state.card1}]}></Image>
								<Text>次卡</Text>
							</TouchableOpacity>
							<TouchableOpacity style={{flex: 1, alignItems:'center'}} onPress={() => this._cardType('2')}>
								<Image style={[{width: pxToDp(92), height: pxToDp(92), backgroundColor:'#bebebe'},{backgroundColor:this.state.card2}]}></Image>
								<Text>月卡</Text>
							</TouchableOpacity>
							<TouchableOpacity style={{flex: 1, alignItems:'center'}} onPress={() => this._cardType('3')}>
								<Image style={[{width: pxToDp(92), height: pxToDp(92), backgroundColor:'#bebebe'},{backgroundColor:this.state.card3}]}></Image>
								<Text>季卡</Text>
							</TouchableOpacity>
						</View>
					</View>
					
					<View style={{backgroundColor:'#efefef',paddingHorizontal: pxToDp(36),}}>
						<Text style={{fontSize:pxToDp(28), color:'#bbb'}}>次卡可在当月内使用一次</Text>
						<Text style={{fontSize:pxToDp(28), color:'#bbb'}}>月卡可在当月内使用</Text>
						<Text style={{fontSize:pxToDp(28), color:'#bbb'}}>季卡可在当季度内使用</Text>
					</View>
					<View style={{flex: 1, justifyContent:'center',alignItems:'center'}}>
						<TouchableOpacity style={{width:pxToDp(660), height:pxToDp(86), backgroundColor: '#69bdd0', alignItems:'center', justifyContent:'center', borderRadius:pxToDp(20)}} onPress={() => this._pulldata()}>
							<Text style={{fontSize: pxToDp(38), color: 'white'}}>生成二维邀请码</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}

	//跳转页内容
	_jumpPage(){
		return (<Card cardMess={this.message}  backCtrl = {(bol)=> this._RouterCtrl(bol)}/>)
	}

	render(){
		return this._showPage()
	}
}
module.exports = invite;