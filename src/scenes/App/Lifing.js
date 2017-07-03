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
		funcData:[],
		dataSource1: ds.cloneWithRows([]),                      // 星级
		dataSource2: ds.cloneWithRows([]),                      // 生活服务分栏
		dataSource3: ds.cloneWithRows([]),                      // 生活服务内容
    };
    this.star = require('./../../assets/形状-5.png');
    this.starY = require('./../../assets/形状-7.png');
    // this.servePic = require('')
  }
  componentWillMount(){
    this._rankStar()
    appData._dataGet('/api/func/B', this._getIcon.bind(this));
  }

  	//内容
	_getIcon(_data){		
		let json = _data.funcs

		let arr = [];
		let obj = {
			lineNum: 0 ,
			lineData: []
		};
		//分割标签
		let i = json.length;
		json.forEach((data,index)=>{
			if(index!=0 && index%3 == 0){
				console.log(obj.lineData)
				arr.push(obj);
				obj = {
					lineNum: 0 ,
					lineData: []
				};
				obj.lineData.push(data)
			} else {
				obj.lineData.push(data)
			}
		})
		let j = 3 - obj.lineData.length;
		if(j > 0){
			for(; j >0;  j -- ){
				let arr = {};
				obj.lineData.push(arr)
			}
			arr.push(obj);
		}
		this.setState({
			dataSource2: this.state.dataSource2.cloneWithRows(arr)
		})
	}

  //星级排序
  _rankStar(){
    let arr =[];
    arr.push(this.starY);
    let i = arr.length;
    for(;i< 5; i++ ){
      arr.push(this.star)
    }
    this.setState({
      dataSource1:this.state.dataSource1.cloneWithRows(arr)
    })
  }

  //插入星级
  starsShow(rowData,){
    return(
      <View>
        <Image style={{width: pxToDp(45), height: pxToDp(45), marginHorizontal:pxToDp(10)}} 
        source={rowData}
        />
      </View>
    )
  }

  //服务列表
  _serveList(rowData){
	  return (
		<View style={{ flexDirection: 'row', alignItems:'center', justifyContent:'center'}}>
			<ListView 
				contentContainerStyle = {{paddingVertical:pxToDp(10),flexDirection:'row', alignItems:'center', justifyContent: 'center'}}
				enableEmptySections = {true} 
				dataSource={this.state.dataSource3.cloneWithRows(rowData.lineData)}
				renderRow={this._serveData.bind(this)}
				/>
		</View>
	  )
  }

  //服务数据
  _serveData(rowData){
	  console.log( peruri + rowData.icon)
	  return(
		<TouchableOpacity style={{flex: 1, alignItems:'center', justifyContent:'center', padding:pxToDp(20)}}>
			<Image style={{width:pxToDp(120), height:pxToDp(120), borderRadius:pxToDp(20), alignItems:'center', justifyContent:'center'}} source={{uri: peruri + rowData.background}}>
				<Image style={{width:pxToDp(100), height:pxToDp(100)}} resizeMode='stretch' source={{uri: peruri + rowData.icon}}/>
			</Image>
			<Text style={{fontSize: pxToDp(20)}}>{rowData.func_name}</Text>
		</TouchableOpacity>)
  }

  render() {
	return (
	<ScrollView style={styles.container}>
		<View style={{height: pxToDp(80), alignItems: 'center', justifyContent:'center', backgroundColor:'#f2f2f2'}}>
			<Text style={{fontSize: pxToDp(36)}}>我的生活</Text>
		</View>

		<View>
			<Image style={{height: pxToDp(300),alignItems:'center', justifyContent:'center', flexDirection:'row'}} resizeMode='stretch' source={require('./../../assets/管家背景.png')}>
				<View style={{flex :1, paddingHorizontal:pxToDp(20), flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
					<TouchableOpacity style={{width: pxToDp(120), alignItems:'flex-end'}}>
						<Image style={{width: pxToDp(60), height: pxToDp(60), transform:[{rotate:'180deg'}]}} source={require('../../assets/more-white.png')}/>
					</TouchableOpacity>
					
					<Image style={styles.headIcon} resizeMode='stretch' source={require('./../../assets/headIcon/headIcon1.jpg')}/>
					<Image style={styles.headIcon} resizeMode='stretch' source={require('./../../assets/headIcon/headIcon2.jpg')}/>
					<Image style={[styles.headIcon,{height:pxToDp(140), width:pxToDp(140)}]} resizeMode='stretch' source={require('./../../assets/headIcon/SheadIcon.jpg')}/>
					<Image style={styles.headIcon} resizeMode='stretch' source={require('./../../assets/headIcon/headIcon3.jpg')}/>
					<Image style={styles.headIcon} resizeMode='stretch' source={require('./../../assets/headIcon/headIcon4.jpg')}/>

					<TouchableOpacity style={{width: pxToDp(120), }}>
						<Image style={{width:pxToDp(60), height:pxToDp(60)}} source={require('../../assets/more-white.png')}/>
					</TouchableOpacity>
				</View>
			</Image>
			<View style={{alignItems:'center'}}>
				<ListView
					dataSource={this.state.dataSource1} 
					enableEmptySections = {true} 
					contentContainerStyle = {{paddingVertical:pxToDp(15),flexDirection:'row', alignItems:'center', justifyContent: 'center'}}
					renderRow = {this.starsShow.bind(this)}/>
				<Text style={{paddingHorizontal: pxToDp(10), fontSize:pxToDp(14),color: '#9a9a9a'}}>4月份物业服务质量评价</Text>
			</View>
		</View>

		<View style={{height:pxToDp(70), backgroundColor:'#dcdcdc',flexDirection:'row', alignItems:'center'}}>
				<View style={{flex: 1, paddingRight:pxToDp(30)}}>
					<Image style={{height:pxToDp(32), width:pxToDp(30)}} resizeMode='stretch' />
				</View>
				<View style={{flex: 1,alignItems:'center'}}>
				<Text style={{fontSize:pxToDp(32), color:'white'}}>生活服务</Text>
				</View>
				<View style={{flex: 1}}>
				<TouchableOpacity style={{paddingRight:pxToDp(30),alignItems: 'flex-end'}}>
					<Image style={{height:pxToDp(32), width:pxToDp(30),}} resizeMode='stretch' source={require('../../assets/Add.svg')}/>
				</TouchableOpacity>
				</View>
		</View>

		<View>
			<ListView 
				enableEmptySections = {true} 
				dataSource={this.state.dataSource2}
				renderRow={this._serveList.bind(this)}
				/>
		</View>
		<View style={{flex: 1}}></View>
	</ScrollView>
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
  headIcon:{
	  height:pxToDp(80), 
	  width:pxToDp(80),
	  borderRadius:'50%',
	  borderWidth:pxToDp(4), 
	  borderColor:'white', 
	  marginHorizontal:pxToDp(15)},
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