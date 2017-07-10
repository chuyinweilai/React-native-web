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
const appData = require('./../../components/Ajax');
const pxToDp =require('../responsive/px');

/*
const Join = require('./../Subpages/join');
const Active = require('./../Subpages/active');
const Exchange = require('./../Subpages/exchange');
const Details = require('./../Subpages/active_details');
*/
export default class Accumulate extends Component {
	constructor() {
		super();
		const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2})
		this.state = {
			ds : ds,
			changePage: 'home',
			eventsData: [],
		};
	}
	
	componentWillMount(){
		appData._Storage('get','userMess',(data)=>{
			let json = JSON.parse(data);
			this.userMess = json;
			this._getData()
		})
	}

	_getData(){
		let json = this.userMess ;
		let body = {
			"comm_code": json.comm_code, 
			"flag": 0,
			"type": 0
		}

		appData._dataPost('/api/volunteer',body,(data)=>{
			if(data.message){
				Alert('暂无活动')
			}else {
				this.setState({
					eventsData: data,
				})
			}
		})
	}

	_RouterCtrl(ctrl){
		this.setState({
			changePage:ctrl
		})
	}

	_nowPage() {
		return (
			<View style={{flex: 1}}>
					<View style={{height: pxToDp(80),flexDirection:'row', alignItems: 'center', justifyContent:'center', backgroundColor:'#f2f2f2', borderBottomColor:'#B4B4B4', borderBottomWidth:pxToDp(2)}}>
						<View style={{width:pxToDp(50)}}>
						</View>
						<View style={{flex: 1, alignItems:'center', justifyContent:'center',}}>
							<Text style={{fontSize: pxToDp(36)}}>志愿者</Text>
						</View>
						<TouchableOpacity style={{width:pxToDp(50),marginRight: pxToDp(40)}} onPress={()=>this.props.backCtrl('accumulate_ruler')}>
							<Image style={{width: pxToDp(50), height: pxToDp(50)}} source={require('./../../assets/积分细则icon.png')}></Image>
						</TouchableOpacity>
					</View>
					
					<ScrollView style={styles.container}>
						<View style={{flexDirection:'row', height: pxToDp(264),marginVertical:pxToDp(22)}}>
							<View>
								<Image style={{height: pxToDp(216), width: pxToDp(216), marginHorizontal:pxToDp(62), paddingTop: pxToDp(90), justifyContent:'center', alignItems:'center'}} resizeMode='contain' source={require('./../../assets/icon.png')}>	
									<Text style={{fontSize:pxToDp(20), color: 'white'}}>
										当前积分
									</Text>
									<Text style={{fontSize:pxToDp(48), fontWeight:'600', color: 'white'}}>
										260
									</Text>
								</Image>
								<View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
									<Text style={{fontSize: pxToDp(36), fontWeight:'600', color:'#69dbcf'}}>
										LV3
									</Text>
									<View>
										<Image></Image>
									</View>
								</View>
							</View>

							<View>
								<View style={{justifyContent:'center'}}>
									<Text style={{width: pxToDp(380), fontSize: pxToDp(32),marginVertical:pxToDp(10)}}>
										还差10积分可领取自行车
									</Text>
								</View>
								<View style={{justifyContent:'center'}}>
									<Text style={{width: pxToDp(380), fontSize: pxToDp(32),marginVertical:pxToDp(10)}}>
										当前积分可领取食用油一瓶
									</Text>
								</View>
								<View style={{ justifyContent:'center'}}>
									<Text style={{width: pxToDp(380), fontSize: pxToDp(32),marginVertical:pxToDp(10)}}>
										……
									</Text>
								</View>
								<View style={{flex: 1, flexDirection:'row', alignItems:'center'}}>
									<View style={{flex: 1}}></View>
									<TouchableOpacity onPress={() => this.props.backCtrl('accumulate_history')}>
										<Text style={{fontSize: pxToDp(24), color:'#ccc'}}>查看更多>></Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>

						<View style={{height: pxToDp(118), flexDirection:'row', backgroundColor:'#e6e6e6',paddingBottom:pxToDp(26)}}>
							<Image style={styles.list} source={require('./../../assets/我参与的@2x.png')}>
								<TouchableOpacity style={{flex: 1}} onPress={()=>this.props.backCtrl('accumulate_join')}>
									<Text style={styles.listText}>我参与的</Text>
								</TouchableOpacity>
							</Image>
							<Image style={styles.list} source={require('./../../assets/往期活动@2x.png')} >
								<TouchableOpacity style={{flex: 1}} onPress={()=>this.props.backCtrl('accumulate_active')}>
									<Text style={styles.listText}>往期活动</Text>
								</TouchableOpacity>
							</Image>
							<Image style={{flex: 1, flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#d96475'}} source={require('./../../assets/积分兑换@2x.png')} >
								<TouchableOpacity style={{flex: 1}} onPress={()=>this.props.backCtrl('accumulate_exchange')}>
									<Text style={styles.listText}>积分兑换</Text>
								</TouchableOpacity>
							</Image>
						</View>
						{this._newActivity()}
					</ScrollView>
			</View>
		);
	}
	
	// 最新活动列表
	_newActivity(){
		return (
				<View>
					<View style={{paddingHorizontal:pxToDp(18), borderBottomColor:'#4b4b4b', borderBottomWidth:1, flexDirection:'row',justifyContent:'space-between'}}>
						<Text style={{lineHeight:pxToDp(58), fontSize:pxToDp(32)}}>最新活动</Text>
						<TouchableOpacity style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}  onPress={()=>this.props.backCtrl('accumulate_more_activity')}>
							<Text style={{lineHeight:pxToDp(32), fontSize:pxToDp(26),paddingTop: pxToDp(8)}}>更多</Text>
							<Image style={{width:pxToDp(28), height:pxToDp(32), margin:0, marginTop: pxToDp(8)}} resizeMode='stretch'  source={require('../../assets/more.png')}/>
						</TouchableOpacity>
					</View>
					<ListView
							dataSource = {this.state.ds.cloneWithRows(this.state.eventsData)}
							enableEmptySections = {true}
							renderRow = {this._render.bind(this)}
					/>
				</View>
		)
	}

	_render(rowData,rowId,sectionId){
			let imgUri  = rowData.pic_path;
			let ss = imgUri.split(',');
			let type='';
			let title='';
			if(rowData.type == 1) {
				type='社区服务'
			} else if(rowData.type == 2) {
				type='公益活动'
			} else if(rowData.type == 3) {
				type='其他'
			} 
			return (
					<View>
						<View style={{flexDirection:'row', alignItems:'center'}}>
							<Image style={{width: pxToDp(41), height:pxToDp(41), margin:pxToDp(16)}} source={require('./../../assets/公益活动icon@2x.png')}/>
							<Text style={{color:'#fdac41'}}>#{type}#</Text>
						</View>

						<TouchableOpacity style={{alignItems:'center'}} onPress={() => this.props.backCtrl('accumulate_details',rowData )}>
							<Text style={{ textAlign:'justify',width:pxToDp(684), fontSize:pxToDp(21), lineHeight:pxToDp(29)}}>
								{rowData.detail}
							</Text>
							<ListView
									contentContainerStyle={{flexDirection: 'row', marginVertical:pxToDp(8), }}
									dataSource={this.state.ds.cloneWithRows(ss)}
									enableEmptySections = {true}
									renderRow = {this._imageRow.bind(this)}
							/>
						</TouchableOpacity>
						<View style={{paddingBottom:pxToDp(10), flexDirection:'row',justifyContent:'space-between', paddingHorizontal:pxToDp(30),borderBottomWidth:pxToDp(14), borderBottomColor:'#f2f2f2'}}>
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
			)
	}

	_goodsDetails(){
		this.props.backCtrl('accumulate_goods_details')
	}

	_imageRow(rowData){
		console.log(peruri+rowData)
		return (
			<Image style={{width:pxToDp(342), height:pxToDp(212), margin:pxToDp(8)}} resizeMode="stretch"  source={{uri:peruri+rowData}}/>
		)
	}
	/*
	_choosePage(name){
		if(this.state.changePage == 'home'){
			appData._dataGet('/api/events', this._getEvent.bind(this));
			return this._nowPage()
		} else if(this.state.changePage == 'join') {
			return <Join backCtrl={(ctrl) => this._RouterCtrl(ctrl)}/>
		} else if(this.state.changePage == 'active') {
			return <Active backCtrl={(ctrl) => this._RouterCtrl(ctrl)}/>
		} else if(this.state.changePage == 'exchange') {
			return <Exchange backCtrl={(ctrl) => this._RouterCtrl(ctrl)}/>
		} else if(this.state.changePage == 'details') {
			return <Details backCtrl={(ctrl) => this._RouterCtrl(ctrl)}/>
		}
	}
	*/

	render(){
		return this._nowPage()
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
		paddingLeft:pxToDp(110), 
		color: 'white', 
		fontSize:pxToDp(28)
	},
});

module.exports = Accumulate;