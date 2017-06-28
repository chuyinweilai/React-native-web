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

const pxToDp =require('../responsive/px');

export default class Accumulate extends Component {
  constructor() {
    super();
    this.state = {
      op1: 1,
      op2: 0.5,
      op3: 0.5,
      op4: 0.5,
      show: true
    };
  }
  componentWillMount(){
  }

	//用户信息部分
	bannerPart() {
		return(
			<View>
				<View style={styles.userMess} >
					<Image style={{width:pxToDp(140), height:pxToDp(140), marginHorizontal:pxToDp(30), borderRadius:'50%', borderColor:'white', borderWidth:pxToDp(3)}} source={require('../../assets/main.png')}/>
					<View style={{}}>
						<Text style={{color: 'white',fontSize:pxToDp(26),marginTop:pxToDp(20)}}>路飞lufei</Text>
						<Text style={{color: 'white',fontSize:pxToDp(26),marginTop:pxToDp(20)}}>闵行区马桥智慧社区34号楼5单元1902室</Text>
					</View>
				</View>
			</View>
		)
	}
	
	//与我相关
	aboutMe(){
		return(
			<View>
				<View style={{height:pxToDp(80), flexDirection:'row', alignItems:'center', borderBottomColor:'#bbb',borderBottomWidth: pxToDp(4)}}>
					<Image style={{width: pxToDp(50), height: pxToDp(50), marginHorizontal:pxToDp(20), backgroundColor:'#6fc',}} />
					<Text style={{fontSize:pxToDp(28)}}>我的房屋</Text>
				</View>
				
				<View style={{height:pxToDp(80), flexDirection:'row', alignItems:'center', borderBottomColor:'#bbb',borderBottomWidth: pxToDp(4)}}>
					<Image style={{width: pxToDp(50), height: pxToDp(50), marginHorizontal:pxToDp(20), backgroundColor:'#6fc',}} />
					<Text style={{fontSize:pxToDp(28)}}>我的订单</Text>
				</View>
				
				<View style={{height:pxToDp(80), flexDirection:'row', alignItems:'center', borderBottomColor:'#bbb',borderBottomWidth: pxToDp(4)}}>
					<Image style={{width: pxToDp(50), height: pxToDp(50), marginHorizontal:pxToDp(20), backgroundColor:'#6fc',}} />
					<Text style={{fontSize:pxToDp(28)}}>我的活动</Text>
				</View>
				
				<View style={{height:pxToDp(80), flexDirection:'row', alignItems:'center', borderBottomColor:'#bbb',borderBottomWidth: pxToDp(4)}}>
					<Image style={{width: pxToDp(50), height: pxToDp(50), marginHorizontal:pxToDp(20), backgroundColor:'#6fc',}} />
					<Text style={{fontSize:pxToDp(28)}}>我的主题</Text>
				</View>
			</View>
		)
	}

	//系统设置
	setting(){
		return(
			<View>
				<View style={{height:pxToDp(80), flexDirection:'row', alignItems:'center', borderBottomColor:'#bbb',borderBottomWidth: pxToDp(4)}}>
					<Image style={{width: pxToDp(50), height: pxToDp(50), marginHorizontal:pxToDp(20), backgroundColor:'#6fc',}} />
					<Text style={{fontSize:pxToDp(28)}}>通知设置</Text>
				</View>
				
				<View style={{height:pxToDp(80), flexDirection:'row', alignItems:'center', borderBottomColor:'#bbb',borderBottomWidth: pxToDp(4)}}>
					<Image style={{width: pxToDp(50), height: pxToDp(50), marginHorizontal:pxToDp(20), backgroundColor:'#6fc',}} />
					<Text style={{fontSize:pxToDp(28)}}>意见反馈</Text>
				</View>
				
				<View style={{height:pxToDp(80), flexDirection:'row', alignItems:'center', borderBottomColor:'#bbb',borderBottomWidth: pxToDp(4)}}>
					<Image style={{width: pxToDp(50), height: pxToDp(50), marginHorizontal:pxToDp(20), backgroundColor:'#6fc',}} />
					<Text style={{fontSize:pxToDp(28)}}>关于我们</Text>
				</View>
			</View>
		)
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				{this.bannerPart()}
				<View style={{flexDirection: 'row', height:pxToDp(100),}}>
					<View style={{flex: 1,  borderRightColor:'#888', borderRightWidth:pxToDp(1), justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{fontSize:pxToDp(16),color:'#ccc'}}>身份</Text>
						<Text style={{width: pxToDp(150), textAlign: 'center', fontSize:pxToDp(32),color:'#78b7c0'}}>二手租户</Text>
					</View>
					<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{fontSize:pxToDp(16),color:'#ccc'}}>信誉</Text>
						<Text style={{width: pxToDp(150), textAlign: 'center', fontSize:pxToDp(32),color:'#78b7c0'}}>98分</Text>
					</View>
				</View>
				<View style={{borderTopColor:'#bbb', borderTopWidth: pxToDp(4)}}>
					<View style={{height:pxToDp(80), backgroundColor:'#ddd', flexDirection: 'row', alignItems:'center'}}>
						<Image style={{width: pxToDp(60), height: pxToDp(60), marginHorizontal:pxToDp(20)}} source={require('../../assets/user.svg')}/>
						<Text style={{color: '#f4f4f4' ,fontSize: pxToDp(36), fontWeight:'600'}}>与我相关</Text>
					</View>
					{this.aboutMe()}
				</View>

				
				<View style={{marginTop:pxToDp(10)}}>
					<View style={{height:pxToDp(80), backgroundColor:'#ddd', flexDirection: 'row', alignItems:'center'}}>
						<Image style={{width: pxToDp(60), height: pxToDp(60), marginHorizontal:pxToDp(20)}} source={require('../../assets/setting.svg')}/>
						<Text style={{color: '#f4f4f4' ,fontSize: pxToDp(36), fontWeight:'600'}}>系统设置</Text>
					</View>
					{this.setting()}
				</View>
			</ScrollView>
		);
	}
	}

const styles = StyleSheet.create({
	container: {
			flex: 1,
	},
	userMess:{
		height:pxToDp(320),
		flexDirection: 'row',
		backgroundColor:'rgba(237,221,161,0.8)',
		justifyContent:'center',
		alignItems:'center'
	},
	logo: {
		flex: 1,
		flexDirection:'row',
		height: pxToDp(232),
		paddingVertical: pxToDp(22)
	},
	welcome: {
		fontSize: pxToDp(20),
		textAlign: 'center',
		margin: pxToDp(10)
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	},
	touchable: {
		backgroundColor: '#CAE6FE'
	}
});

module.exports = Accumulate;