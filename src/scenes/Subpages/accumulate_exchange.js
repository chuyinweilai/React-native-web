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

const deviceWidthDp = Dimensions.get('window').width;

export default class accumulate_exchange extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
		this.state = {
			dataSourceL:[],
			dataSourceR:[],
		};
		this.leftLefgth = 0;
		this.rightLefgth = 0;
	}

	componentWillMount(){
		appData._dataGet('/api/events', this._getEvent.bind(this));
	}

	_getEvent(json){
		// this.setState({
    	// 	dataSource: json.data
		// })
	}

	_waterFall(uri){
		let arrLeft = [];
		let arrRight = [];
		Image.getSize(uri, (width, height) => {
			console.log('Image')
			console.log(width,height)
			if(this.leftLefgth >= this.rightLefgth){
				
			}
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={{height:pxToDp(86), flexDirection:'row',backgroundColor:'#f2f2f2',  justifyContent:'space-between', alignItems:'center'}}>
					<TouchableOpacity style={{width:pxToDp(120), flexDirection:'row', alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.props.backCtrl(false)}>
						<Image style={{height:pxToDp(48), width: pxToDp(48)}} source={require('./../../assets/arrow-left.png')} 	resizeMode="contain"/>
						<Text style={{fontSize:pxToDp(30)}}>返回</Text>
					</TouchableOpacity>
					<View style={{flex:1, flexDirection:'row', alignItems: 'center', justifyContent: 'center', }}>
						{/*<TouchableOpacity style={{borderTopLeftRadius:pxToDp(20), borderBottomLeftRadius:pxToDp(20), paddingHorizontal:pxToDp(20), paddingVertical:pxToDp(10), backgroundColor:'#69bdcf',borderRightWidth:pxToDp(1)}}>
							<Text style={{width:pxToDp(120), fontSize:pxToDp(30), textAlign:'center'}}>可兑换</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{borderTopRightRadius:pxToDp(20), borderBottomRightRadius:pxToDp(20), paddingHorizontal:pxToDp(20), paddingVertical:pxToDp(10), backgroundColor:'white'}}>
							<Text style={{width:pxToDp(120),fontSize:pxToDp(30), textAlign:'center'}}>不可兑换</Text>
						</TouchableOpacity>*/}
						<Text style={{fontSize: pxToDp(36)}}>兑换列表</Text>

					</View>
					<View style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}}/>
				</View>

				<ScrollView style={{backgroundColor:'#dbdbdb',}} horizontal={true}>
					<TouchableOpacity style={{width: deviceWidthDp/2, padding:pxToDp(20), paddingRight:pxToDp(10), backgroundColor:'#6fc'}} onPress={()=>this.props.backCtrl('accumulate_goods_details')}>
						<View style={{borderRadius:pxToDp(20),backgroundColor:'white'}}>
							<View style={{padding:pxToDp(24), paddingBottom:0,borderBottomWidth:pxToDp(1), }}>
								<Image style={{height:pxToDp(400), backgroundColor:'gray', borderRadius:pxToDp(20)}}/>
								<Text style={{fontSize:pxToDp(34), marginBottom:pxToDp(10)}} numberOfLines={1}>
									海尔智能冰箱 双柜门使用 平均耗电仅……平均耗电仅平均耗电仅平均耗电仅
								</Text>
								<View style={{flexDirection:'row', alignItems:'flex-end', justifyContent:'space-between', paddingBottom:pxToDp(10)}}>
									<Text style={{fontSize:pxToDp(18), color:'#c9c9c9'}}>
										截止时间： 17/7/1
									</Text>
									<View>
										<Text style={{fontSize:pxToDp(18), color:'#c9c9c9'}}>20</Text>
									</View>
								</View>
							</View>
							<View style={{height:pxToDp(80), alignItems:'center', justifyContent:'center'}}>
								<Text style={{fontSize:pxToDp(32), color:'#fd9840'}}>300积分可兑换</Text>
							</View>
						</View>
					</TouchableOpacity>

					<TouchableOpacity style={{width: deviceWidthDp/2, padding:pxToDp(20), paddingLeft:pxToDp(10), backgroundColor:'#6fc'}} onPress={()=>this.props.backCtrl('accumulate_goods_details')}>
						<View style={{borderRadius:pxToDp(20),backgroundColor:'white'}}>
							<View style={{padding:pxToDp(24), paddingBottom:0,borderBottomWidth:pxToDp(1), }}>
								<Image style={{height:pxToDp(400), backgroundColor:'gray', borderRadius:pxToDp(20)}}/>
								<Text style={{fontSize:pxToDp(34), marginBottom:pxToDp(10)}} numberOfLines={1}>
									海尔智能冰箱 双柜门使用 平均耗电仅……平均耗电仅平均耗电仅平均耗电仅
								</Text>
								<View style={{flexDirection:'row', alignItems:'flex-end', justifyContent:'space-between', paddingBottom:pxToDp(10)}}>
									<Text style={{fontSize:pxToDp(18), color:'#c9c9c9'}}>
										截止时间： 17/7/1
									</Text>
									<View>
										<Text style={{fontSize:pxToDp(18), color:'#c9c9c9'}}>20</Text>
									</View>
								</View>
							</View>
							<View style={{height:pxToDp(80), alignItems:'center', justifyContent:'center'}}>
								<Text style={{fontSize:pxToDp(32), color:'#fd9840'}}>300积分可兑换</Text>
							</View>
						</View>
					</TouchableOpacity>
				</ScrollView>
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

module.exports = accumulate_exchange;