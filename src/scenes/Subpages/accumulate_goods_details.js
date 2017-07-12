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
						<Text style={{fontSize: pxToDp(36)}}>兑换详情</Text>
					</View>
					<View style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}}/>
				</View>
				<View>
					<Image style={{height:pxToDp(330)}}/>
					<View style={{height:pxToDp(206), padding: pxToDp(20)}}>
						<View style={{flexDirection:'row',flex: 1}}>
							<View style={{flex: 1}}>
								<Text style={{fontSize:pxToDp(48)}}>海尔智能冰箱</Text>
							</View>
							<TouchableOpacity style={{width: pxToDp(34),height:pxToDp(34), backgroundColor:'#f9c'}}>
								<Image/>
							</TouchableOpacity>
						</View>
						<View style={{flexDirection:'row',justifyContent:'space-between'}}>
							<Text style={{fontSize:pxToDp(28), color:'#999'}}>兑换积分： 300</Text>
							<Text style={{fontSize:pxToDp(28), color:'#fd9840'}}>所需积分： 120</Text>
						</View>
					</View>
					<View style={{height:pxToDp(56), backgroundColor:'#ededed', paddingHorizontal: pxToDp(20), flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
						<Text style={{fontSize:pxToDp(20), color:'#a9a9a9'}}>当前已兑换：12人</Text>
						<Text style={{fontSize:pxToDp(20), color:'#a9a9a9'}}>兑换截止日期：2017/6/31</Text>
					</View>
				</View>
				<View>
					<View style={{height: pxToDp(68), flexDirection:'row', justifyContent:'space-between', paddingHorizontal:pxToDp(20), paddingVertical:pxToDp(16),borderBottomWidth:pxToDp(1)}}>
						<View>
							<Text style={{fontSize: pxToDp(30), color:'#69bdd0'}}>推荐活动</Text>
						</View>
						<TouchableOpacity>
							<Text style={{fontSize: pxToDp(30), color:'#69bdd0'}}>更多</Text>
						</TouchableOpacity>
					</View>
					<View style={{height: pxToDp(70), flexDirection:'row', justifyContent:'space-between', paddingHorizontal:pxToDp(20), paddingVertical:pxToDp(16),borderBottomWidth:pxToDp(1)}}>
						<TouchableOpacity>
							<Text style={{fontSize: pxToDp(32)}}>社区养老院周末公益清洁志愿活动征集 >></Text>
						</TouchableOpacity>
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