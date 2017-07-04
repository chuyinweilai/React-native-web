/**
 * React Native for Web Starter App
 * https://github.com/grabcode/react-native-web-starter
 * Follow me https://twitter.com/grabthecode
 */

import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
  	Button,
	Switch,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Dimensions
} from 'react-native';

const peruri = "http://cloudapi.famesmart.com";
const appData = require('./../../components/Ajax');
const pxToDp =require('../responsive/px');

export default class details extends Component {
	constructor(props) {
		super(props);
		this.state = {
			SwitchIsOn:false,
		};
	}

	componentWillMount(){
		appData._dataGet('/api/events', this._getEvent.bind(this));
	}

	_getEvent(json){
		// this.setState({
    	// 	dataSource: json.data
		// })
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={{height:pxToDp(86), flexDirection:'row',backgroundColor:'#f2f2f2',  justifyContent:'space-between'}}>
					<TouchableOpacity style={{flexDirection:'row',width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.props.backCtrl(false)}>
						<Image style={{height:pxToDp(48), width: pxToDp(48)}} source={require('./../../assets/arrow-left.png')} 	resizeMode="contain"/>
						<Text style={{fontSize:pxToDp(30)}}>返回</Text>
					</TouchableOpacity>
					<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{fontSize: pxToDp(36)}}>活动详情</Text>
					</View>
					<View style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}}/>
				</View>

				<View>
					<View style={{flexDirection:'row', alignItems:'center'}}>
						<Image style={{width: pxToDp(41), height:pxToDp(41), margin:pxToDp(16)}} source={require('./../../assets/公益活动icon@2x.png')}/>
						<Text style={{color:'#fdac41'}}>#公益活动#</Text>
					</View>

					<TouchableOpacity style={{alignItems:'center'}} onPress={()=>this.props.backCtrl('goods_details')}>
						<Text style={{ textAlign:'justify',width:pxToDp(684), fontSize:pxToDp(21), lineHeight:pxToDp(29)}}>
							闵行区马桥镇开展以“社区共建共享”为主题的志愿服务活动，项目有义务维修、专家义诊、清洁社区、社区读书日、日用品派送等系列活动，倡导居民我爱人人，人人爱我的奉献精神；社区居民积极响应，活动取得圆满成功。
						</Text>
						<View style={{flexDirection: 'row', marginVertical:pxToDp(16), justifyContent:'center'}}>
							<Image style={{width:pxToDp(342), height:pxToDp(212), backgroundColor:'#6fc'}} resizeMode="stretch" />
							<View style={{width:pxToDp(16)}}></View>
							<Image style={{width:pxToDp(342), height:pxToDp(212), backgroundColor:'#6fc'}} resizeMode="stretch" />
						</View>
					</TouchableOpacity>

					<View style={{paddingBottom:pxToDp(10), flexDirection:'row',justifyContent:'space-between', paddingHorizontal:pxToDp(30),borderBottomWidth:pxToDp(34), borderBottomColor:'#f2f2f2'}}>
						<View >
							<Text style={{ textAlign:'right',fontSize:pxToDp(14), color:'#9c9c9c',marginRight:pxToDp(20)}}>2017-06-31 09:02</Text>
						</View>
						<View style={{flexDirection:'row'}}>
							<Image style={{width: pxToDp(32), height:pxToDp(32),marginRight:pxToDp(10)}} resizeMode='contain' source={require('./../../assets/热度icon@2x.png')}/>
							<Text style={{ textAlign:'right',fontSize:pxToDp(14), color:'#9c9c9c',marginRight:pxToDp(20)}}>50</Text>
							<Image style={{width: pxToDp(32), height:pxToDp(32),marginRight:pxToDp(10)}} resizeMode='contain' source={require('./../../assets/加分icon@2x.png')}/>
							<Text style={{textAlign:'right',fontSize:pxToDp(14), color:'#9c9c9c'}}>12</Text>
						</View>
					</View>

				</View>
				<View>
					<View style={{height: pxToDp(86), marginHorizontal:pxToDp(20), flexDirection:'row', borderBottomColor:'#b6b6b6', borderBottomWidth: pxToDp(2), alignItems:'center', justifyContent:'space-between'}}>
						<Text style={{fontSize:pxToDp(32), color: '#69bdd0'}}>已有32人报名</Text>
						<TouchableOpacity style={{width: pxToDp(164), height: pxToDp(64), backgroundColor:'#d0d0d0', borderRadius:pxToDp(20), alignItems:'center', justifyContent:'center'}}>
							<Text style={{fontSize:pxToDp(40), color: 'white'}}>报名</Text>
						</TouchableOpacity>
					</View>
					<View style={{height: pxToDp(86), marginHorizontal:pxToDp(20), flexDirection:'row', borderBottomColor:'#b6b6b6', borderBottomWidth: pxToDp(2), alignItems:'center', justifyContent:'space-between'}}>
						<Text style={{fontSize:pxToDp(34), color: '#8d8d8d'}}>添加到收藏</Text>
						
						<Switch
						onTintColor ='#6fc'
						onValueChange={(value) => this.setState({SwitchIsOn: value})}
						value={this.state.SwitchIsOn} />
					</View>
				</View>
			</View>
		);
	}
	}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	list:{
		flex: 1, 
		flexDirection:'row', 
		alignItems:'center', 
		justifyContent:'center'
	},
	listText:{
		paddingLeft:pxToDp(80), 
		color: 'white', 
		fontSize:pxToDp(28)
	},
});

module.exports = details;