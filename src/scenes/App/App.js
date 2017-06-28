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
			tag: <Home  router={(key) => this._HomeRouterCtrl(key)}/>,
		}
		this.nowPage = 'Home';
		this.HomeRouterPage = ''
	}


	componentDidMount(){
		this.setPage()
	}

	_HomeRouterCtrl(control){
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
				this.refs.HomeBtn.setNativeProps({
					style:{
						background:'#FFFFFF',
					}
				})
			}else if(this.nowPage == 'Accumulate'){
				this.refs.AccumulateBtn.setNativeProps({
					style:{
						background:'#FFFFFF',
					}
				})
			}else if(this.nowPage == 'Lifing'){
				this.refs.LifingBtn.setNativeProps({
					style:{
						background:'#FFFFFF',
					}
				})
			}else if(this.nowPage == 'Community'){
				this.refs.CommunityBtn.setNativeProps({
					style:{
						background:'#FFFFFF',
					}
				})
			}else if(this.nowPage == 'Mypage'){
				this.refs.MypageBtn.setNativeProps({
					style:{
						background:'#FFFFFF',
					}
				})
			}
			this.nowPage = tagName;
			this.setPage()
		}
	}

	setPage(){
		let tagName = this.nowPage
		if(tagName == 'Home'){
			this.refs.HomeBtn.setNativeProps({style:{background:'#599bab', }});
			this.setState({
				tag: <Home router={(test) => this._HomeRouterCtrl(test)}/>
			})
		}else if(tagName == 'Accumulate'){
			this.refs.AccumulateBtn.setNativeProps({style:{background:'#599bab', }});
			this.setState({
				tag: <Accumulate/>
			})
		}else if(tagName == 'Lifing'){
			this.refs.LifingBtn.setNativeProps({style:{background:'#599bab', }});
			this.setState({
				tag: <Lifing/>
			})
		}else if(tagName == 'Community'){
			this.refs.CommunityBtn.setNativeProps({style:{background:'#599bab', }});
			this.setState({
				tag: <Community/>
			})
		}else if(tagName == 'Mypage'){
			this.refs.MypageBtn.setNativeProps({style:{background:'#599bab', }});
			this.setState({
				tag: <Mypage/>
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

						<TouchableOpacity ref={'HomeBtn'} style={[styles.touchable,{backgroundColor:'#599BAB'}]} onPress={this.pageChose.bind(this,'Home')} >
							<Image style={{flex: 1}}/>
							<Text style= {styles.touchableText}>首页</Text>
						</TouchableOpacity>

						<TouchableOpacity ref={'AccumulateBtn'}  style={styles.touchable} onPress={this.pageChose.bind(this,'Accumulate')}>
							<Image style={{flex: 1}}/>
							<Text style= {styles.touchableText}>积分</Text>
						</TouchableOpacity>

						<TouchableOpacity ref={'LifingBtn'} style={styles.touchable} onPress={this.pageChose.bind(this,'Lifing')}>
							<Image style={{flex: 1}}/>
							<Text style= {styles.touchableText}>生活</Text>
						</TouchableOpacity>
						
						<TouchableOpacity ref={'CommunityBtn'} style={styles.touchable} onPress={this.pageChose.bind(this,'Community')}>
							<Image style={{flex: 1}}/>
							<Text style= {styles.touchableText}>社区</Text>
						</TouchableOpacity>

						<TouchableOpacity ref={'MypageBtn'}  style={styles.touchable} onPress={this.pageChose.bind(this,'Mypage')}>
							<Image style={{flex: 1}}/>
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
						<Open backCtrl = {(bol)=> this._HomeRouterCtrl(bol)}/>
				)
			} 
			else if(name == 'invite'){
				return (
						<Invite backCtrl = {(bol)=> this._HomeRouterCtrl(bol)}/>
				)
			} 
			// else if(name == 'serve'){
			// 	return (
			// 		<View>
			// 			<Open />
			// 		</View>
			// 	)
			// } else if(name == 'cemera'){
			// 	return (
			// 		<View>
			// 			<Open />
			// 		</View>
			// 	)
			// }
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
		height:pxToDp(116), 
		flexDirection: 'row',
		backgroundColor:'white'
	},
	touchable: {
		flex: 1, 
		alignItems:'center', 
		borderRightColor:'#4b4b4b',
		borderRightWidth:pxToDp(1), 
	},
	touchableText:{
		fontSize:pxToDp(26), 
		lineHeight:pxToDp(36)
	}
});

// module.exports = App;