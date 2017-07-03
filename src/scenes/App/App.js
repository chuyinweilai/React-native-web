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
			//导航图标
			homePic:require('./../../assets/首页灰色.png'),
			LifingPic:require('./../../assets/生活灰色.png'),
			AccumulatePic:require('./../../assets/志愿者灰.png'),
			CommunityPic:require('./../../assets/社区灰色.png'),
			MypagePic:require('./../../assets/我的灰色.png'),
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

	//未选中
	pageChose(tagName){ 
		if(tagName != this.nowPage){
			if(this.nowPage == 'Home'){
				this.setState({
					homePic: require('./../../assets/首页灰色.png'),
				})
			}else if(this.nowPage == 'Lifing'){
				this.setState({
					LifingPic: require('./../../assets/生活灰色.png'),
				})
			}else if(this.nowPage == 'Accumulate'){
				this.setState({
					AccumulatePic:require('./../../assets/志愿者灰.png'),
				})
			}else if(this.nowPage == 'Community'){
				this.setState({
					CommunityPic: require('./../../assets/社区灰色.png'),
				})
			}else if(this.nowPage == 'Mypage'){
				this.setState({
					MypagePic: require('./../../assets/我的灰色.png'),
				})
			}
			this.nowPage = tagName;
			this.setPage()
		}
	}

	//选中
	setPage(){
		let tagName = this.nowPage
		if(tagName == 'Home'){
			this.setState({
				tag: <Home router={(value)=>this._RouterCtrl(value)} mainRouter={(page) => this.pageChose(page)}/>,
				homePic: require('./../../assets/首页彩色.png'),
			})
		}else if(tagName == 'Accumulate'){
			this.setState({
				tag: <Accumulate/>,
				AccumulatePic:require('./../../assets/志愿者选中.png'),
			})
		}else if(tagName == 'Lifing'){
			this.setState({
				tag: <Lifing/>,
				LifingPic: require('./../../assets/生活彩色.png'),
			})
		}else if(tagName == 'Community'){
			this.setState({
				tag: <Community/>,
				CommunityPic: require('./../../assets/社区彩色.png'),
			})
		}else if(tagName == 'Mypage'){
			this.setState({
				tag: <Mypage/>,
				MypagePic: require('./../../assets/我的彩色.png'),
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
							<Image style={[styles.Icon,{width:pxToDp(77),height:pxToDp(112)}]} resizeMode="stretch" source={this.state.homePic}/>
						</TouchableOpacity>

						<TouchableOpacity ref={'LifingBtn'} style={styles.touchable} onPress={this.pageChose.bind(this,'Lifing')}>
							
							<Image style={[styles.Icon,{width: pxToDp(75)}]} resizeMode="stretch" source={this.state.LifingPic}/>
						</TouchableOpacity>

						<TouchableOpacity ref={'AccumulateBtn'}  style={styles.touchable} onPress={this.pageChose.bind(this,'Accumulate')}>
								<Image style={[styles.Icon, {width: pxToDp(100), height: pxToDp(100)}]} resizeMode="stretch" source={this.state.AccumulatePic}/>
						</TouchableOpacity>
						
						<TouchableOpacity ref={'CommunityBtn'} style={styles.touchable} onPress={this.pageChose.bind(this,'Community')}>
							<Image style={styles.Icon} resizeMode="stretch" source={this.state.CommunityPic}/>
						</TouchableOpacity>

						<TouchableOpacity ref={'MypageBtn'}  style={styles.touchable} onPress={this.pageChose.bind(this,'Mypage')}>
							<Image style={[styles.Icon,{width: pxToDp(65)}]} resizeMode="stretch" source={this.state.MypagePic}/>
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
	Icon: {
		width:pxToDp(70), 
		height: pxToDp(110),
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
		overflow:'hidden',
	},
	touchable: {
		flex: 1, 
		alignItems:'center', 
		justifyContent:'center',
		borderRightColor:'#4b4b4b',
		borderRightWidth:pxToDp(1), 
		paddingTop:pxToDp(10)
	},
	touchableText:{
		width: pxToDp(75),
		height: pxToDp(26),
		marginTop:pxToDp(10)
	}
});

module.exports = App;