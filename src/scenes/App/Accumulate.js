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
	

	render() {
		return (
			<ScrollView style={styles.container}>
				<View style={{height:pxToDp(86), flexDirection:'row', justifyContent:'space-between'}}>
					<View style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}}>
					</View>
					<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<Text>志愿者</Text>
					</View>
					<TouchableOpacity style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{fontSize:pxToDp(30)}}></Text>
					</TouchableOpacity>
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