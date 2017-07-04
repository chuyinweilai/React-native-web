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

/*
const Join = require('./../Subpages/join');
const Active = require('./../Subpages/active');
const Exchange = require('./../Subpages/exchange');
const Details = require('./../Subpages/active_details');
*/
export default class Accumulate extends Component {
	constructor() {
		super();
		this.state = {
			changePage: 'home',
		};
	}
	
	componentWillMount(){
		appData._dataGet('/api/events', this._getEvent.bind(this));
	}

	_getEvent(json){
		// console.log(json.data)
	}

	_RouterCtrl(ctrl){
		this.setState({
			changePage:ctrl
		})
	}

	_nowPage() {
		return (
			<ScrollView style={styles.container}>
				<View style={{height: pxToDp(80),flexDirection:'row', alignItems: 'center', justifyContent:'center', backgroundColor:'#f2f2f2', borderBottomColor:'#B4B4B4', borderBottomWidth:pxToDp(2)}}>
					<View style={{width:pxToDp(50)}}>
					</View>
					<View style={{flex: 1, alignItems:'center', justifyContent:'center',}}>
						<Text style={{fontSize: pxToDp(36)}}>志愿者</Text>
					</View>
					<TouchableOpacity style={{width:pxToDp(50),marginRight: pxToDp(40)}}>
						<Image style={{width: pxToDp(50), height: pxToDp(50)}} source={require('./../../assets/积分细则icon.png')}></Image>
					</TouchableOpacity>
				</View>
				
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
							<Text style={{fontSize: pxToDp(24), color:'#ccc'}}>查看更多>></Text>
						</View>
					</View>
				</View>

				<View style={{height: pxToDp(118), flexDirection:'row', backgroundColor:'#e6e6e6',paddingBottom:pxToDp(26)}}>
					<Image style={styles.list} source={require('./../../assets/我参与的@2x.png')}>
						<TouchableOpacity style={{flex: 1}} onPress={()=>this.props.backCtrl('join')}>
							<Text style={styles.listText}>我参与的</Text>
						</TouchableOpacity>
					</Image>
					<Image style={styles.list} source={require('./../../assets/往期活动@2x.png')} >
						<TouchableOpacity style={{flex: 1}} onPress={()=>this.props.backCtrl('active')}>
							<Text style={styles.listText}>往期活动</Text>
						</TouchableOpacity>
					</Image>
					<Image style={{flex: 1, flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#d96475'}} source={require('./../../assets/积分兑换@2x.png')} >
						<TouchableOpacity style={{flex: 1}} onPress={()=>this.props.backCtrl('exchange')}>
							<Text style={styles.listText}>积分兑换</Text>
						</TouchableOpacity>
					</Image>
				</View>
				<View>
					<View style={{paddingHorizontal:pxToDp(18), borderBottomColor:'#4b4b4b', borderBottomWidth:1, flexDirection:'row',justifyContent:'space-between'}}>
						<Text style={{lineHeight:pxToDp(58), fontSize:pxToDp(32)}}>最新活动</Text>
						{/*<TouchableOpacity style={{flexDirection:'row'}}>
							<Text style={{lineHeight:pxToDp(32), fontSize:pxToDp(26),paddingTop: pxToDp(8)}}>更多</Text>
							<Image style={{width:pxToDp(28), height:pxToDp(32), margin:0, marginTop: pxToDp(8)}} resizeMode='stretch'  source={require('../../assets/more.png')}/>
						</TouchableOpacity>*/}
					</View>
					
					<View>
						<View style={{flexDirection:'row', alignItems:'center'}}>
							<Image style={{width: pxToDp(41), height:pxToDp(41), margin:pxToDp(16)}} source={require('./../../assets/社区服务icon@2x.png')}/>
							<Text style={{color:'#fdac41'}}>#社区服务#</Text>
						</View>

						<TouchableOpacity style={{alignItems:'center'}} onPress={()=>this.props.backCtrl('accumulate_details')}>
							<Text style={{ textAlign:'justify',width:pxToDp(684), fontSize:pxToDp(21), lineHeight:pxToDp(29)}}>
								闵行区马桥镇开展以“社区共建共享”为主题的志愿服务活动，项目有义务维修、专家义诊、清洁社区、社区读书日、日用品派送等系列活动，倡导居民我爱人人，人人爱我的奉献精神；社区居民积极响应，活动取得圆满成功。
							</Text>
							<View style={{flexDirection: 'row', marginVertical:pxToDp(16), justifyContent:'center'}}>
								<Image style={{width:pxToDp(342), height:pxToDp(212), backgroundColor:'#6fc'}} resizeMode="stretch" />
								<View style={{width:pxToDp(16)}}></View>
								<Image style={{width:pxToDp(342), height:pxToDp(212), backgroundColor:'#6fc'}} resizeMode="stretch" />
							</View>
						</TouchableOpacity>

						<View style={{paddingBottom:pxToDp(10), flexDirection:'row',justifyContent:'space-between', marginHorizontal:pxToDp(26),borderBottomWidth:pxToDp(1), borderBottomColor:'#9c9c9c'}}>
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

						<View style={{paddingBottom:pxToDp(10), flexDirection:'row',justifyContent:'space-between', paddingHorizontal:pxToDp(30),borderBottomWidth:pxToDp(1), borderBottomColor:'#9c9c9c'}}>
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

				</View>
			</ScrollView>
		);
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