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

const pxToDp =require('../responsive/px');
const deviceWidthDp = Dimensions.get('window').width;

export default class Lifing extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			ds: ds.cloneWithRows([]),
			op1: 1,
			op2: 0.5,
			op3: 0.5,
			op4: 0.5,
			show: true,
		};
		this.AStars=['../../assets/stars.svg','../../assets/stars.svg','../../assets/stars.svg','../../assets/stars.svg','../../assets/stars.svg']
	}
	componentWillMount(){
		this.setState({
			ds:this.state.ds.cloneWithRows(this.AStars)
		})
	}

	starsShow(rowData,){
		// console.log(this.state.ds)
		return(
			<View>
				<Image style={{width: pxToDp(45), height: pxToDp(45), marginHorizontal:pxToDp(10)}} 
				source={require('../../assets/starsYellow.svg')}
				/>
			</View>
		)
	}


	//社区动态
	news(){
		return(
			<View style={{marginTop:pxToDp(20), marginHorizontal:pxToDp(10),}}>
				<View style={{paddingBottom:pxToDp(20), borderBottomColor: '#888', borderBottomWidth:1}}>
					<View style={{height: pxToDp(78),flexDirection:'row', alignItems: 'center', paddingLeft: pxToDp(8)}}>
						<Image style={{height: pxToDp(56),width: pxToDp(56), borderRadius:'50%',backgroundColor: 'gray'}}/>
						<Text style={{fontSize: pxToDp(24), color:'#464646',paddingLeft:pxToDp(15)}}>爱自拍美妞</Text>
					</View>
					<View style={{paddingLeft: pxToDp(13),paddingRight:pxToDp(10)}}>
						<Text style={{color:'#444444', fontSize:pxToDp(16), lineHeight:pxToDp(29), paddingLeft: pxToDp(4), paddingRight: pxToDp(17)}}>
						本周有老年人舞蹈和小学生安全教育志愿者活动，可以带上自己的家人和小伙伴一起为社区增添活力吧。详情咨询范小组，也就是我。号码是15655371512 微信号是1314zxt。报名成功后可免费领取社区纪念品一份，送完为止哦~~~
						</Text>
						<View style={{flexDirection: 'row', marginTop:pxToDp(8)}}>
							<Image style={{width:pxToDp(340), height:pxToDp(210), backgroundColor: '#66ffcc'}} resizeMode='stretch'/>
							<View style={{width:pxToDp(16)}}></View>
							<Image style={{width:pxToDp(340), height:pxToDp(210), backgroundColor: '#66ffcc'}} resizeMode='stretch'/>
						</View>
						<Text style={{paddingTop:pxToDp(10), fontSize:pxToDp(14), color: '#888',}}>1小时前</Text>
					</View>
				</View>
				
				<View style={{paddingBottom:pxToDp(20), borderBottomColor: '#888', borderBottomWidth:1}}>
					<View style={{height: pxToDp(78),flexDirection:'row', alignItems: 'center', paddingLeft: pxToDp(8)}}>
						<Image style={{height: pxToDp(56),width: pxToDp(56), borderRadius:'50%',backgroundColor: 'gray'}}/>
						<Text style={{fontSize: pxToDp(24), color:'#464646',paddingLeft:pxToDp(15)}}>爱自拍美妞</Text>
					</View>
					<View style={{paddingLeft: pxToDp(13),paddingRight:pxToDp(10)}}>
						<Text style={{color:'#444444', fontSize:pxToDp(16), lineHeight:pxToDp(29), paddingLeft: pxToDp(4), paddingRight: pxToDp(17)}}>
						本周有老年人舞蹈和小学生安全教育志愿者活动，可以带上自己的家人和小伙伴一起为社区增添活力吧。详情咨询范小组，也就是我。号码是15655371512 微信号是1314zxt。报名成功后可免费领取社区纪念品一份，送完为止哦~~~
						</Text>
						<View style={{flexDirection: 'row', marginTop:pxToDp(8)}}>
							<Image style={{width:pxToDp(340), height:pxToDp(210), backgroundColor: '#66ffcc'}} resizeMode='stretch'/>
							<View style={{width:pxToDp(16)}}></View>
							<Image style={{width:pxToDp(340), height:pxToDp(210), backgroundColor: '#66ffcc'}} resizeMode='stretch'/>
						</View>
						<Text style={{paddingTop:pxToDp(10), fontSize:pxToDp(14), color: '#888',}}>1小时前</Text>
					</View>
				</View>
			</View>
		
		)
	}
	
	render() {
		return (
			<ScrollView style={styles.container}>
				<View style={{height: pxToDp(80), alignItems: 'center', justifyContent:'center', backgroundColor:'#f2f2f2'}}>
					<Text style={{fontSize: pxToDp(36)}}>我的社区</Text>
				</View>

				<View style={{flexDirection:'row', justifyContent:'space-around'}} >
					<TouchableOpacity style={{height: pxToDp(80), justifyContent:'center', borderBottomColor:'#78bbcc', borderBottomWidth:pxToDp(4)}}>
						<Text style={{fontSize:pxToDp(26)}}>邻里分享</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{height: pxToDp(80), justifyContent:'center', borderBottomColor:'#78bbcc', borderBottomWidth:pxToDp(0)}}>
						<Text style={{fontSize:pxToDp(26)}}>预约活动</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{height: pxToDp(80), justifyContent:'center', borderBottomColor:'#78bbcc', borderBottomWidth:pxToDp(0)}}>
						<Text style={{fontSize:pxToDp(26)}}>好人好事</Text>
					</TouchableOpacity>
				</View>
			
				<View style={{borderTopWidth:2,borderTopColor:'black', paddingTop:pxToDp(10), paddingBottom:pxToDp(20), backgroundColor:'#dcdcdc'}}>
					<TouchableOpacity style={{height:pxToDp(160),marginBottom:pxToDp(10), backgroundColor:'pink', justifyContent: 'center'}}>
						<Text style={{fontSize:  pxToDp(32), color: 'white'}}>随手拍</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{height:pxToDp(160), backgroundColor:'pink', justifyContent: 'center'}}>
						<Text style={{fontSize: pxToDp(32), color: 'white'}}>问卷调查</Text>
					</TouchableOpacity>
				</View>
				{this.news()}
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