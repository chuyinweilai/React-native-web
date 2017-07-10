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

export default class Lifing extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			ds: ds,
			subfield:0,
			type:'share',
			dataSource:([]),
			bottomColor1: '#78bbccff',
			bottomColor2: '#78bbcc00',
			bottomColor3: '#78bbcc00',
		};
		this.ajson = ''
	}

	//1.邻里分享，2社区活动，3好人好事，4党建天地{	"comm_code":"M0002",	"type":4}
	componentWillMount(){
		// appData._dataGet('/api/events/select', this._getEvent.bind(this));
		appData._Storage('get','userMess',(data) => {
			this.ajson =JSON.parse(data);
			this._pageChange('share')
		})

	}

	_pageChange(type){
		let code = this.ajson.comm_code;
		let body = {}
		if(type == 'share'){
			body = {
				"comm_code": code,	
				"type": 1
			}
			this.setState({
				bottomColor1: '#78bbccff',
				bottomColor2: '#78bbcc00',
				bottomColor3: '#78bbcc00',
			})
		} else if(type == 'active'){
			body = {
				"comm_code": code,	
				"type": 2
			}
			this.setState({
				bottomColor1: '#78bbcc00',
				bottomColor2: '#78bbccff',
				bottomColor3: '#78bbcc00',
			})
		}else if(type == 'good') {
			body = {
				"comm_code": code,	
				"type": 3
			}
			this.setState({
				bottomColor1: '#78bbcc00',
				bottomColor2: '#78bbcc00',
				bottomColor3: '#78bbccff',
			})
		}
		appData._dataPost('/api/events/select', body,this._getEvent.bind(this));
	}

	_getEvent(json){
		// console.log(json)
		this.setState({
    		dataSource: json.data
		})
	}

	//社区动态
	news(){
		const aData = this.state.dataSource;
		if(aData.length){
			return(
					<ListView
							dataSource={this.state.ds.cloneWithRows(this.state.dataSource)}
							enableEmptySections = {true}
							renderRow={this.newsText.bind(this)}
					/>
			)
		}
	}

	//社区动态 内容部分
	newsText(rowData){
		let pic =  rowData.pic_path
		let ss = pic.split(',')
		return(
			<View style={{ borderBottomColor:'#9a9a9a', borderBottomWidth:1,}}>
				<View style={{height: pxToDp(78),flexDirection:'row', alignItems: 'center', paddingLeft: pxToDp(18)}}>
					<Image style={{height: pxToDp(56),width: pxToDp(56), borderRadius: pxToDp(28),backgroundColor: 'gray'}} source={{uri: peruri + rowData.pic_path_face}}/>
					<Text style={{fontSize: pxToDp(17), color:'#464646',paddingLeft:pxToDp(15)}}>{rowData.provider_name}</Text>
				</View>
				<View style={{paddingLeft: pxToDp(23),paddingRight:pxToDp(20)}}>
					<Text style={{fontSize:pxToDp(21), lineHeight:pxToDp(29), paddingLeft: pxToDp(4), paddingRight: pxToDp(17)}}>
							{rowData.detail}
					</Text>
					<View style={{flexDirection: 'row', marginVertical:pxToDp(16)}}>
						<Image style={{width:pxToDp(342), height:pxToDp(212)}} resizeMode="stretch" source={{uri:peruri+ ss[0]}}/>
						<View style={{width:pxToDp(16)}}></View>
						<Image style={{width:pxToDp(342), height:pxToDp(212)}} resizeMode="stretch" source={{uri:peruri+ ss[1]}}/>
					</View>
					<View style={{paddingBottom:pxToDp(10), flexDirection:'row',justifyContent:'flex-end'}}>
					<Text style={{ textAlign:'right',fontSize:pxToDp(14), color:'#9c9c9c',marginRight:pxToDp(20)}}>热度：{rowData.point}</Text>
					<Text style={{textAlign:'right',fontSize:pxToDp(14), color:'#9c9c9c'}}>上传时间：{rowData.vld_start}</Text>
					</View>
				</View>
			</View>
		)
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<View style={{height: pxToDp(80), alignItems: 'center', justifyContent:'center', backgroundColor:'#f2f2f2'}}>
					<Text style={{fontSize: pxToDp(36)}}>我的社区</Text>
				</View>
				<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

					<View style={{flexDirection:'row', justifyContent:'space-around'}} >
						<TouchableOpacity style={[{height: pxToDp(80), justifyContent:'center', },{borderBottomColor:this.state.bottomColor1, borderBottomWidth:pxToDp(4)}]} onPress={this._pageChange.bind(this,'share')}>
							<Text style={{fontSize:pxToDp(26)}}>邻里分享</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[{height: pxToDp(80), justifyContent:'center'},{borderBottomColor:this.state.bottomColor2, borderBottomWidth:pxToDp(4)}]}  onPress={this._pageChange.bind(this,'active')}>
							<Text style={{fontSize:pxToDp(26)}}>社区活动</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[{height: pxToDp(80), justifyContent:'center'},{borderBottomColor:this.state.bottomColor3, borderBottomWidth:pxToDp(4)}]} onPress={this._pageChange.bind(this,'good')}>
							<Text style={{fontSize:pxToDp(26)}}>好人好事</Text>
						</TouchableOpacity>
					</View>
				
					<View style={{borderTopWidth:2,borderTopColor:'black', paddingTop:pxToDp(10), paddingBottom:pxToDp(20), backgroundColor:'#dcdcdc'}}>
						<TouchableOpacity style={{height:pxToDp(160),marginBottom:pxToDp(10), backgroundColor:'pink', justifyContent: 'center'}} disabled>
							<Image style={{flex: 1}} resizeMode="stretch" source={require('./../../assets/随手拍.png')}></Image>
						</TouchableOpacity>
						<TouchableOpacity style={{height:pxToDp(160), backgroundColor:'pink', justifyContent: 'center'}} disabled>
							<Image style={{flex: 1}} resizeMode="stretch" source={require('./../../assets/问卷调查bg.png')}></Image>
						</TouchableOpacity>
					</View>
					{this.news()}
				</ScrollView>
			</View>
		);
	}
}
const styles = StyleSheet.create({
    container: {
      	flex: 1,
    },
    banners:{
		height:pxToDp(387),
		backgroundColor:'gray',
    },
    BScontrol:{
		width: pxToDp(14),
		height: pxToDp(14),
		borderRadius:50,
		marginHorizontal: pxToDp(3.5),
		backgroundColor: '#FFF',
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

module.exports = Lifing;