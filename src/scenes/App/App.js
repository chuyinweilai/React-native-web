/**
 * React Native for Web Starter App
 * https://github.com/grabcode/react-native-web-starter
 * Follow me https://twitter.com/grabthecode
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	Modal,
	TouchableOpacity
} from 'react-native';

//主页面
const Home =require('./Home');
const Accumulate =require('./Accumulate');
const Lifing =require('./Lifing');
const Community =require('./Community');
const Mypage =require('./Mypage');

//子页面
const Open = require('./../Subpages/open');
const Invite = require('./../Subpages/invite');



const pxToDp =require('../responsive/px');
// const _Wx = require('./../../wx/wx')

export default class App extends Component {
	constructor() {
		super();
		this.state={
			_Pctrl: true,
			tag: <Home  router={(key) => this._RouterCtrl(key)}/>,
			homePic:require('./../../assets/首页-2.png'),
			LifingPic:require('./../../assets/生活2.png'),
			CommunityPic:require('./../../assets/社区2.png'),
			MypagePic:require('./../../assets/我的2.png')
		}
		this.nowPage = 'Home';
		this.HomeRouterPage = ''
	}


	componentDidMount(){
		this.setPage()
	}

	_RouterCtrl(control){
		if(control){
			this.HomeRouterPage = control;
			this.setState({
				_Pctrl: false,
			})
		}else {
			this.setState({
				_Pctrl: true,
			})
		}
	}

	//简单页面跳转
	pageChose(tagName){ 
		if(tagName != this.nowPage){
			if(this.nowPage == 'Home'){
				this.setState({
					homePic: require('./../../assets/首页-2.png')
				})
			}else if(this.nowPage == 'Lifing'){
				this.setState({
					LifingPic: require('./../../assets/生活2.png')
				})
			}else if(this.nowPage == 'Community'){
				this.setState({
					CommunityPic: require('./../../assets/社区2.png')
				})
			}else if(this.nowPage == 'Mypage'){
				this.setState({
					MypagePic: require('./../../assets/我的2.png')
				})
			}
			this.nowPage = tagName;
			this.setPage()
		}
	}

	setPage(){
		let tagName = this.nowPage
		if(tagName == 'Home'){
			this.setState({
				tag: <Home router={(value)=>this._RouterCtrl(value)}/>,
				homePic: require('./../../assets/首页-1.png'),
			})
		}else if(tagName == 'Accumulate'){
			this.setState({
				tag: <Accumulate router={(value)=>this._RouterCtrl(value)}/>,
			})
		}else if(tagName == 'Lifing'){
			this.setState({
				tag: <Lifing router={(value)=>this._RouterCtrl(value)}/>,
				LifingPic: require('./../../assets/生活1.png'),
			})
		}else if(tagName == 'Community'){
			this.setState({
				tag: <Community router={(value)=>this._RouterCtrl(value)}/>,
				CommunityPic: require('./../../assets/社区1.png'),
			})
		}else if(tagName == 'Mypage'){
			this.setState({
				tag: <Mypage router={(value)=>this._RouterCtrl(value)}/>,
				MypagePic: require('./../../assets/我的1.png'),
			})
		}
	}
	
	showPage(){
		if(this.state._Pctrl){
			return(
				<View style={{flex: 1}}>
					<View style={styles.content}>
					{this.state.tag}
					</View>
					<View style={styles.touchableBox}>

						<TouchableOpacity ref={'HomeBtn'} style={styles.touchable} onPress={this.pageChose.bind(this,'Home')} >
							<Image style={{width:pxToDp(80), height: pxToDp(80),}} resizeMode="contain" source={this.state.homePic}/>
							<Text style= {styles.touchableText}>首页</Text>
						</TouchableOpacity>

						<TouchableOpacity ref={'LifingBtn'} style={styles.touchable} onPress={this.pageChose.bind(this,'Lifing')}>
							
							<Image style={{width:pxToDp(80), height: pxToDp(80),}} resizeMode="contain" source={this.state.LifingPic}/>
							<Text style= {styles.touchableText}>生活</Text>
						</TouchableOpacity>

						<TouchableOpacity ref={'AccumulateBtn'}  style={styles.touchable} onPress={this.pageChose.bind(this,'Accumulate')}>
							<Image style={{width:pxToDp(110), height: pxToDp(110), borderRadius:pxToDp(20), alignItems:'center', justifyContent:'center'}} resizeMode="cover" source={require('./../../assets/志愿者背景.png')}>
								<Image style={{width:pxToDp(80), height: pxToDp(80)}} resizeMode="contain" source={require('./../../assets/志愿者.png')}/>
							</Image>
						</TouchableOpacity>

						
						<TouchableOpacity ref={'CommunityBtn'} style={styles.touchable} onPress={this.pageChose.bind(this,'Community')}>
							<Image style={{width:pxToDp(80), height: pxToDp(80),}} resizeMode="contain" source={this.state.CommunityPic}/>
							<Text style= {styles.touchableText}>社区</Text>
						</TouchableOpacity>

						<TouchableOpacity ref={'MypageBtn'}  style={styles.touchable} onPress={this.pageChose.bind(this,'Mypage')}>
							<Image style={{width:pxToDp(80), height: pxToDp(80),}} resizeMode="contain" source={this.state.MypagePic}/>
							<Text style= {styles.touchableText}>我的</Text>
						</TouchableOpacity>
					</View>
				</View>
			)
		} else {
			const name = this.HomeRouterPage;
			console.log(name)
			if(name == 'open'){
				return (
						<Open backCtrl = {(bol)=> this._RouterCtrl(bol)}/>
				)
			} 
			else if(name == 'invite'){
				return (
						<Invite backCtrl = {(bol)=> this._RouterCtrl(bol)}/>
				)
			} 
		}
	}


	render() {
		return (
		<View style={styles.container}>
			{this.showPage()}
		</View>
		);
	}	
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: '#F5FCFF'
	},
	logo: {
		alignSelf: 'center',
		marginBottom: 10
	},
	content: {
		flex:1, 
		borderBottomColor:'#4b4b4b', 
		borderBottomWidth:1
	},
	touchableBox:{
		borderTopColor:'#9a9a9a', 
		borderTopWidth:1, 
		height:pxToDp(130), 
		flexDirection: 'row',
		backgroundColor:'white',
	},
	touchable: {
		flex: 1, 
		alignItems:'center', 
		borderRightColor:'#4b4b4b',
		borderRightWidth:pxToDp(1), 
		paddingTop:pxToDp(10)
	},
	touchableText:{
		fontSize:pxToDp(26), 
		lineHeight:pxToDp(36)
	}
});

// module.exports = App;