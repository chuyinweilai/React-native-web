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
	ListView,
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
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			ds:ds,
			joinState:1,
			SwitchIsOn:false,
		};
		this.userMess = {}
	}

	componentWillMount(){
		this._joinState()
	}

	_joinState(){
		appData._Storage('get','userMess',(data)=>{
			let json = JSON.parse(data)
			this.userMess = json;
			let body = {
				"wx_id": json.wx_id,
				"comm_code": json.comm_code,
				"activity_no": this.props.mess.activity_no
			}
			appData._dataPost('/api/volunteer/status',body,(data) => {
				console.log(data)
				this.setState({
					joinState:data
				})
			})
		})
	}

	_imageRow(rowData){
		return (
			<Image style={{width:pxToDp(342), height:pxToDp(212), margin:pxToDp(8)}} resizeMode="stretch"  source={{uri:peruri+rowData}}/>
		)
	}

	_details(){
		let rowData = this.props.mess;
		let imgUri  = rowData.pic_path;
		let joinColor = '#d0d0d0';
		let ss = imgUri.split(',');
		let type='';
		let atext='报名';
		let adisable= false;
		let title='';
		if(rowData.type == 1) {
			type='社区服务'
		} else if(rowData.type == 2) {
			type='公益活动'
		} else if(rowData.type == 3) {
			type='其他'
		} 

		if(this.state.joinState == 0){
			atext = '取消';
			joinColor = 'red'
			adisable= false;
		} else if(this.state.joinState == 1){
			jsonColor =  '#d0d0d0';
			atext = '取消';
			adisable= true;
		} else if(this.state.joinState == 2){
			jsonColor =  '#69bdd0';
			atext = '报名';
			adisable= false;
		}else if(this.state.joinState == 9){
			jsonColor =  '#d0d0d0';
			atext = '报名';
			adisable= true;
		} 

		return (
			<View>
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
						<Text style={{color:'#fdac41'}}>#{type}#</Text>
						<Text style={{color:'#333', marginLeft: pxToDp(32), fontSize:pxToDp(32)}} numberOfLines={1}>{rowData.title}</Text>
					</View>

					<View style={{alignItems:'center'}}>
						<Text style={{ textAlign:'justify',width:pxToDp(684), fontSize:pxToDp(21), lineHeight:pxToDp(29)}}>
							{rowData.detail}
						</Text>
						<ListView
								contentContainerStyle={{flexDirection: 'row', marginVertical:pxToDp(8), }}
								dataSource={this.state.ds.cloneWithRows(ss)}
								enableEmptySections = {true}
								renderRow = {this._imageRow.bind(this)}
						/>
					</View>

					<View style={{paddingBottom:pxToDp(10), flexDirection:'row',justifyContent:'space-between', paddingHorizontal:pxToDp(30),borderBottomWidth:pxToDp(34), borderBottomColor:'#f2f2f2'}}>
						<View >
							<Text style={{ textAlign:'right',fontSize:pxToDp(14), color:'#9c9c9c',marginRight:pxToDp(20)}}>{rowData.pub_date}</Text>
						</View>
						<View style={{flexDirection:'row'}}>
							<Image style={{width: pxToDp(32), height:pxToDp(32),marginRight:pxToDp(10)}} resizeMode='contain' source={require('./../../assets/热度icon@2x.png')}/>
							<Text style={{ textAlign:'right',fontSize:pxToDp(14), color:'#9c9c9c',marginRight:pxToDp(20)}}>{rowData.score}</Text>
							<Image style={{width: pxToDp(32), height:pxToDp(32),marginRight:pxToDp(10)}} resizeMode='contain' source={require('./../../assets/加分icon@2x.png')}/>
							<Text style={{textAlign:'right',fontSize:pxToDp(14), color:'#9c9c9c'}}>{rowData.join_limit}</Text>
						</View>
					</View>
				</View>
				<View style={styles.container}>
					<View style={{height: pxToDp(86), marginHorizontal:pxToDp(20), flexDirection:'row', borderBottomColor:'#b6b6b6', borderBottomWidth: pxToDp(2), alignItems:'center', justifyContent:'space-between'}}>
						<Text style={{fontSize:pxToDp(32), color: '#69bdd0'}}>已有{rowData.join_cnt}人报名</Text>
						<TouchableOpacity style={[{width: pxToDp(164), height: pxToDp(64),borderRadius:pxToDp(20), alignItems:'center', justifyContent:'center'},{ backgroundColor: jsonColor, }]} onPress={()=> this._join(rowData,this.state.joinState)} disabled={adisable}>
							<Text style={{fontSize:pxToDp(40), color: 'white'}}>{atext}</Text>
						</TouchableOpacity>
					</View>
					<View style={{height: pxToDp(86), marginHorizontal:pxToDp(20), flexDirection:'row', borderBottomColor:'#b6b6b6', borderBottomWidth: pxToDp(2), alignItems:'center', justifyContent:'space-between'}}>
						<Text style={{fontSize:pxToDp(34), color: '#8d8d8d'}}>添加到收藏</Text>
						
						<Switch
						onTintColor ='#69bdd0'
						onValueChange={(value) => this.setState({SwitchIsOn: value})}
						value={this.state.SwitchIsOn} />
					</View>
				</View>
			</View>
		)
	}

	//报名参加
	_join(rowData,state){
		let	body={
			"wx_id": this.userMess.wx_id,
			"comm_code": this.userMess.comm_code,
			"activity_no":rowData.activity_no
		}
		let uri = ''
		console.log(body)
		if(state == 0){
			uri = '/api/volunteer/cancel'
		}  else if(state == 2){
			uri = '/api/volunteer/register'
		}
		appData._dataPost(uri,body,(data)=>{
			this._joinState()
		})
	}

	render() {
		return (
			<View>
				{this._details()}
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