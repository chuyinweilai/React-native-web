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

export default class join extends Component {
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
			<ScrollView style={styles.container}>
				<View style={{height:pxToDp(86), flexDirection:'row',backgroundColor:'#f2f2f2',  justifyContent:'space-between'}}>
					<TouchableOpacity style={{width:pxToDp(120), flexDirection:'row', alignItems: 'center', justifyContent: 'center'}} onPress={() => this.props.backCtrl(false)}>
						<Image style={{height:pxToDp(48), width: pxToDp(48)}} source={require('./../../assets/arrow-left.png')} 	resizeMode="contain"/>
						<Text style={{fontSize:pxToDp(30)}}>返回</Text>
					</TouchableOpacity>
					<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{fontSize: pxToDp(36)}}>积分记录</Text>
					</View>
					<View style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}}/>
				</View>
				<View>
					
				</View>
			</ScrollView>
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

module.exports = join;