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
	ListView,
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
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		super(props);
		this.state = {
			ds: ds,
			dataSource1: [],
		};
	}

	componentWillMount(){
		appData._Storage('get','userMess',(data)=>{
			let json = JSON.parse(data);
			let  body ={
				"wx_id": json.wx_id,
				"comm_code": json.comm_code
			}
			appData._dataPost('/api/gift/mine', body,this._getEvent.bind(this));
		});
	}

	_getEvent(json){
		this.setState({
			dataSource1: json
		})
	}

	_render(rowData){
		console.log(rowData)
		return(
			<View style={{flex: 1,}}>
				{/* <View style={{height: pxToDp(78),  justifyContent:'center', backgroundColor:'#999', paddingHorizontal: pxToDp(22)}}>
					<Text style={{fontSize: pxToDp(36), color: 'white'}}>2017/7/10</Text>
				</View> */}
				<View style={{flex: 1, paddingHorizontal: pxToDp(20)}}>
					<View style={{flexDirection: 'row' ,height: pxToDp(224),justifyContent:'center',  alignItems: 'center', borderBottomWidth: pxToDp(2)}}>
						<View style={{width: pxToDp(412), marginRight:pxToDp(30)}}>
							<Text style={{paddingBottom: pxToDp(42), fontSize: pxToDp(34), color:"#999"}}>
								维达薄荷味抽纸200抽系列一盒
							</Text>
							<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
								<Text style={{fontSize: pxToDp(44), color: '#999'}}>-10</Text>
								<Text style={{fontSize: pxToDp(20), color: '#999'}}>2017年7月10日 08:02</Text>
							</View>
						</View>
						<Image style={{width: pxToDp(232), height: pxToDp(190), backgroundColor: '#6fc'}}/>
						<View>
							
						</View>
					</View>
				</View>

			</View>
		)
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
						<Text style={{fontSize: pxToDp(36)}}>兑换历史</Text>
					</View>
					<View style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}}/>
				</View>
				<ListView
					dataSource = {this.state.ds.cloneWithRows(this.state.dataSource1)}
					enableEmptySections ={true}
					renderRow = {this._render.bind(this)}
				/>
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