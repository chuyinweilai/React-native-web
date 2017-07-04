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
	ListView,
	TouchableOpacity,
	Dimensions
} from 'react-native';

const peruri = "http://cloudapi.famesmart.com";
const appData = require('./../../components/Ajax')
const pxToDp = require('../responsive/px');

export default class Mypage extends Component {
	constructor() {
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		super();    

		this.state = {
			userMess:{},
			dataSource1:ds.cloneWithRows([]),
			dataSource2:ds.cloneWithRows([]),
		};
	}
	componentWillMount(){
		appData._Storage('get','userMess',(json)=>{
			let data = JSON.parse(json)
			this.setState({
				userMess: data,
			})
		})
		appData._dataGet('/api/func/E', this._getIcon.bind(this));
	}
	
  	//内容
	_getIcon(_data){		
		console.log(_data)
		let arr1 = [];
		let arr2 = [];
		_data.funcs.forEach((data,index)=>{
			if(index<4){
				arr1.push(data);
			} else {
				arr2.push(data)
			}
		})
		console.log(arr1,arr2)
		this.setState({
			dataSource1: this.state.dataSource1.cloneWithRows(arr1),
			dataSource2: this.state.dataSource2.cloneWithRows(arr2)
		})
	}

	//用户信息部分
	_userMess() {
		return(
			<View>
				<Image style={styles.userMess} resizeMode="stretch" source={require('./../../assets/我的背景.png')}>
					<Image style={{width:pxToDp(140), height:pxToDp(140), borderRadius:'50%', borderColor:'white', borderWidth:pxToDp(3)}} source={require('../../assets/main.png')}/>
					<Text style={{color: 'white',fontSize:pxToDp(26),marginTop:pxToDp(20)}}>{this.state.userMess.nickname}</Text>
					<Text style={{color: 'white',fontSize:pxToDp(26),marginTop:pxToDp(20)}}>{this.state.userMess.comm_name}</Text>
				</Image>
			</View>
		)
	}
	
	_renderRow(rowData){
		return (
				<TouchableOpacity style={{height:pxToDp(80), flexDirection:'row', alignItems:'center', borderBottomColor:'#bbb',borderBottomWidth: pxToDp(4)}}>
					<Image style={{width: pxToDp(50), height: pxToDp(50), marginHorizontal:pxToDp(20),}} resizeMode='stretch' source={{uri: peruri + rowData.icon}}/>
					<Text style={{fontSize:pxToDp(28)}}>{rowData.func_name}</Text>
				</TouchableOpacity>
		)
	}
	
	_listView(dataSources){
		return(
			<View>
				<ListView
					dataSource = {dataSources}
					enableEmptySections = {true}
					renderRow={this._renderRow.bind(this)}
					/>
			</View>
		)
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				{this._userMess()}
				<View style={{flexDirection: 'row', height:pxToDp(100),}}>
					<View style={{flex: 1,  borderRightColor:'#888', borderRightWidth:pxToDp(1), justifyContent: 'center', alignItems: 'center'}}>
						<Text style={styles.pointTitle}>身份</Text>
						<Text style={styles.IdPoint}>二手租户</Text>
					</View>
					<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
						<Text style={styles.pointTitle}>信誉</Text>
						<Text style={styles.IdPoint}>98分</Text>
					</View>
				</View>
				<View style={{borderTopColor:'#bbb', borderTopWidth: pxToDp(4)}}>
					<View style={styles.titleBox}>
						<Image style={styles.title} resizeMode='stretch' source={require('../../assets/与我相关.png')}/>
						<Text style={styles.titleText}>与我相关</Text>
					</View>
					{this._listView(this.state.dataSource1)}
				</View>

				
				<View style={{marginTop:pxToDp(10)}}>
					<View style={styles.titleBox}>
						<Image style={styles.title}  resizeMode='stretch' source={require('../../assets/系统设置.png')}/>
						<Text style={styles.titleText}>系统设置</Text>
					</View>
					{this._listView(this.state.dataSource2)}
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
		justifyContent:'center',
		alignItems:'center'
	},
	pointTitle:{
		fontSize:pxToDp(16),
		color:'#ccc'
	},
	IdPoint:{
		width: pxToDp(150), 
		textAlign: 'center', 
		fontSize:pxToDp(32),
		color:'#78b7c0'},
	titleBox:{
		height:pxToDp(80), 
		backgroundColor:'#ddd', 
		flexDirection: 'row', 
		alignItems:'center'
	},
	title:{
		width: pxToDp(60), 
		height: pxToDp(50), 
		marginHorizontal:pxToDp(20)
	},
	titleText:{
		color: '#f4f4f4' ,
		fontSize: pxToDp(36), 
		fontWeight:'600'
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

module.exports = Mypage;