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
	Dimensions,
	Navigator,
	TouchableOpacity,
} from 'react-native';

const peruri = "http://cloudapi.famesmart.com";
const appData = require('./../../components/Ajax')
const pxToDp = require('../responsive/px');
const deviceWidthDp = Dimensions.get('window').width;

export default class Home extends Component {
	constructor(props) {
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		super(props);
		this.state = {
			ds: ds,
			dataSource:([]),
			op1: 1,
			op2: 0.5,
			op3: 0.5,
			op4: 0.5,
			show: true,
			rotate: '0',
			funcData:[],
			eventData:{},
			bannerUri:' ',
		};
		this._data = [];
		this.oldPoint = 0;
	}

	componentWillMount(){
		appData._dataGet('/api/func/A', this._getIcon.bind(this));
		appData._dataPost('/api/events', {"comm_code":"M0001"},this._getEvent.bind(this));
		appData._Storage('get','userMess',(data)=>{
			let json  = JSON.parse(data)
			let abody = {
				"comm_code": json.comm_code,
				"page_id":"A",
				"type":1
			}
			appData._dataPost('/api/showpic/select',abody,this._getBannerImg.bind(this))
		})
	}

	_getIcon(json){
		this.setState({
			funcData:json.funcs
		})
	}

	_getEvent(json){
		this.setState({
    		dataSource: json.data
		})
	}

	_getBannerImg(json){
		let arr = json[0];
		this.setState({
    		bannerUri:  peruri + arr[0].pic_path
		})
	}
	
  //banner图部分
	bannerPart() {
		return(
			<View style={{height: pxToDp(336),}}>
				<Image style={{height: pxToDp(326), width:pxToDp(750),}} resizeMode='stretch' source={{uri: this.state.bannerUri}}/>
			</View>
		)
	}

  //快捷按钮功能
	buttonPart(){
		const  data = this.state.funcData;
		if(data.length){
			return(
				<View style={{ flexDirection: 'row',}}>
					<TouchableOpacity style={{height: pxToDp(240), marginRight:pxToDp(12), alignItems:'center'}} onPress={() => this._nimbleBtn('open')}>
							<Image style={{width: pxToDp(372), height: pxToDp(240),justifyContent: 'flex-end', alignItems:'center'}} resizeMode='stretch' source={{uri: peruri+ data[0].icon}}>
							</Image>
					</TouchableOpacity>

					<View style={{width: pxToDp(366)}}>
						<TouchableOpacity style={{marginBottom: pxToDp(10), backgroundColor:'#bb5966', alignItems:'center', justifyContent:'center', flexDirection:'row'}} onPress={() => this._nimbleBtn('addvisitor')}>
							<Image style={{height:pxToDp(120), width: pxToDp(366),justifyContent: 'center', alignItems:'flex-start'}} resizeMode='stretch' source={{uri: peruri+ data[1].icon}}>
							</Image>
						</TouchableOpacity>

						<View style={{height:pxToDp(110), flexDirection: 'row'}}>
							<TouchableOpacity style={{ backgroundColor:'#c7a76c',  flexDirection: 'row'}} onPress={()=>this.props.backCtrl('lifing_convenient')}>
								<Image style={{height:pxToDp(110), width: pxToDp(178), }} resizeMode='stretch' source={{uri: peruri+ data[2].icon}}>
								</Image>
							</TouchableOpacity>
							<View style={{width:pxToDp(10)}}></View>
							<TouchableOpacity style={{ backgroundColor:'#c7a76c', flexDirection: 'row'}} onPress={()=>{this.props.mainRouter('Accumulate')}}>
							<Image style={{height:pxToDp(110), width: pxToDp(178)}} resizeMode='stretch' source={{uri: peruri+ data[3].icon}}>
								</Image>
							</TouchableOpacity>
						</View>
						
					</View>
				</View>
			)
		}
	}

	_nimbleBtn(control){
		let foo = this.props.backCtrl;
		foo(control);
	}

  	//党建天地部分
	about(){
		return (
			<View style={{marginTop:pxToDp(18)}}>
				<View style={{height:pxToDp(30), backgroundColor: '#dcdcdc', flexDirection:'row'}}></View>
				<ListView
					contentContainerStyle = { styles.logo}
					dataSource = {this.state.ds.cloneWithRows(this.state.funcData)}
					enableEmptySections = {true}
					renderRow = {this._aboutContent.bind(this)}
					/>
				<View style={{height: pxToDp(30),backgroundColor:'#dcdcdc'}}></View>
			</View>
		)
	}

	//党建内容部分
	_aboutContent(rowData){
		let type = ''
		if(rowData.func_id == '5'){
			type = 'lifing_build'
		} else if(rowData.func_id == '6'){
			type = 'lifing_ask'
		} else if(rowData.func_id == '7'){
			type = 'lifing_neighbourhood'
		} 
		let func_id = rowData.func_id
		if(func_id == '5' || func_id == '6' || func_id == '7'){
			return (
				<TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.props.backCtrl(type)}>
					<View style={{width:pxToDp(164) ,height: pxToDp(142), borderRadius:pxToDp(22), alignItems:'center', justifyContent:'center'}}>
						<Image resizeMode='stretch' style={{width: pxToDp(164), height: pxToDp(142)}} source={{uri: peruri+ rowData.icon}}/>
					</View>
					<Text style={{textAlign:'center', fontSize:pxToDp(26), color: '#525252',paddingTop: pxToDp(10)}}>{rowData.func_name}</Text>
				</TouchableOpacity>
			) 
		} else return null
	}

  	//党建部门现隐控制
	retract(){
		let blo = this.state.show;
		this.setState({
			show: !blo,
		})
	}

	//社区动态
	news(){
		const aData = this.state.dataSource;
		let hei = pxToDp(aData.length*420);
		if(aData.length){
			return(
				<View style={{flex: 1, marginTop:pxToDp(20), marginBottom:pxToDp(118)}}>
					<View style={{paddingHorizontal:pxToDp(19), borderBottomColor:'#4b4b4b', borderBottomWidth:1, flexDirection:'row',     
					justifyContent:'space-between'}}>
						<Text style={{lineHeight:pxToDp(48), fontSize:pxToDp(32)}}>社区动态</Text>
						<TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{this.props.mainRouter('Community')}}>
							<Text style={{lineHeight:pxToDp(32), fontSize:pxToDp(26),paddingTop: pxToDp(8)}}>更多</Text>
							<Image style={{width:pxToDp(28), height:pxToDp(32), margin:0, marginTop: pxToDp(8)}} resizeMode='stretch'  source={require('../../assets/more.png')}/>
						</TouchableOpacity>
					</View>
					 <View style = {{height: hei}}> 
						<ListView
								dataSource={this.state.ds.cloneWithRows(aData)}
								enableEmptySections = {true}
								removeClippedSubviews={false}
								renderRow={this.newsText.bind(this)}
						/>
					 </View> 
				</View>
			)
		}
	}

	//社区动态 内容部分
	newsText(rowData){
		let type = '';
		let pic =  rowData.pic_path;
		let ss = pic.split(',');
		if(rowData.type == '1'){
			type = '邻里分享'
		} else if(rowData.type == '2'){
			type = '社区活动'
		} else if(rowData.type == '3'){
			type = '好人好事'
		} 
		return(
			<View style={{height: pxToDp(420), borderBottomColor:'#9a9a9a', borderBottomWidth:1,}}>
				<View style={{height: pxToDp(78),flexDirection:'row', alignItems: 'center', paddingLeft: pxToDp(18)}}>
					<Image style={{height: pxToDp(56),width: pxToDp(56), borderRadius: pxToDp(28),backgroundColor: 'gray'}} source={{uri: peruri + rowData.pic_path_face}}/>
					<Text style={{fontSize: pxToDp(17), color:'#464646',paddingLeft:pxToDp(15)}}>{rowData.provider_name}</Text>
					<Text style={{fontSize: pxToDp(14), color:'#9c9c9c', paddingLeft:pxToDp(10),paddingRight:pxToDp(6)}}>来自</Text>
					<Text style={{fontSize: pxToDp(18), color:'#ffc575'}}>{type}</Text>
				</View>
				<View style={{alignItems:'center'}}>
					<Text style={{textAlign:'justify',width:pxToDp(684), fontSize:pxToDp(21), lineHeight:pxToDp(29)}}>
							{rowData.detail}
					</Text>
					<View style={{height:pxToDp(240), flexDirection: 'row'}}>
						<Image style={{width:pxToDp(342), height:pxToDp(212), margin:pxToDp(8)}} resizeMode="stretch"  source={{uri:peruri+ss[0]}}/>
						<Image style={{width:pxToDp(342), height:pxToDp(212), margin:pxToDp(8)}} resizeMode="stretch"  source={{uri:peruri+ss[1]}}/>
					</View>
				</View>
				<View style={{paddingBottom:pxToDp(10), flexDirection:'row',justifyContent:'flex-end', paddingRight: pxToDp(18)}}>
					<Text style={{ textAlign:'right',fontSize:pxToDp(14), color:'#9c9c9c',marginRight:pxToDp(20)}}>热度：{rowData.point}</Text>
					<Text style={{textAlign:'right',fontSize:pxToDp(14), color:'#9c9c9c'}}>上传时间：{rowData.vld_start}</Text>
				</View>
			</View>
		)
	}

	// _imageRow(rowData){
	// 	return (
	// 	)
	// }

	render() {
		return (
				<ScrollView style={styles.container} removeClippedSubviews={false}>
					{this.bannerPart()}
					<View  style={{height: pxToDp(240),}}>	
						{this.buttonPart()}
					</View>
					{this.about()}
					{this.news()}
				</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
    // paddingHorizontal: pxToDp(1)
  },
  banners:{
		height:pxToDp(336),
    backgroundColor:'gray',
  },
  BScontrol:{
    width: pxToDp(16),
    height: pxToDp(16),
    borderRadius:'50%',
    marginHorizontal: pxToDp(3.5),
    backgroundColor: '#FFF',
  },
  logo: {
    flexDirection:'row',
    height: pxToDp(220),
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

module.exports = Home;