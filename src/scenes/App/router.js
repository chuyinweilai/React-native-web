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
const appData = require('./../../components/Ajax')
const Regist  = require( './regist');

//首页 子页面
const Open = require('./../Subpages/open');
const Addvisitor = require('./../Subpages/addvisitor');
const Lifing_Convenient = require('./../Subpages/lifing_convenient');

//生活 子页面
const Lifing_Build = require('./../Subpages/lifing_build');
const Lifing_Ask = require('./../Subpages/lifing_ask');
const Lifing_Neighbourhood = require('./../Subpages/lifing_neighbourhood');

//积分 子页面
const Accumulate_Ruler = require('./../Subpages/accumulate_ruler');
const Accumulate_Join = require('./../Subpages/accumulate_join');
const Accumulate_Active = require('./../Subpages/accumulate_active');
const Accumulate_Exchange = require('./../Subpages/accumulate_exchange');
const Accumulate_Goods_Details = require('./../Subpages/accumulate_goods_details');
const Accumulate_Details = require('./../Subpages/accumulate_details');
const Accumulate_History = require('./../Subpages/accumulate_history');
const Accumulate_More_activity = require('./../Subpages/accumulate_more_activity');

//我的 子页面
const My_House = require('./../Subpages/my_house');
const My_Invite = require('./../Subpages/my_invite');
const My_Collect = require('./../Subpages/my_collect')
const My_Share = require('./../Subpages/my_share')


const pxToDp =require('../responsive/px');
// const _Wx = require('./../../wx/wx')

export default class routers extends Component {
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
		this.sendMess;
	}

	componentDidMount(){
		let data = new Date();
		this.setPage()

		wx.checkJsApi({
			jsApiList: ['downloadImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
			success: function(res) {
				wx.downloadImage({
					serverId: './../../assets/我的灰色.png', // 需要下载的图片的服务器端ID，由uploadImage接口获得
					isShowProgressTips: 1, // 默认为1，显示进度提示
					success: function (res) {
						console.log('success')
						console.log(res)
						var localId = res.localId; // 返回图片下载后的本地ID
					}
				});
				// 以键值对的形式返回，可用的api值true，不可用为false
				// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
			}
			//http://cloudapi.famesmart.com/pic/show/show_a_5.jpg

		});
	}

	//页面切换
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
			if(name == 'regist'){return <Regist mess={true} backCtrl = {(bol)=> this._RouterCtrl(bol)}/>} 
			//首页--一键开门
			if(name == 'open'){return <Open backCtrl = {(bol)=> this._RouterCtrl(bol)}/>} 
			//首页--访问邀请
			else if(name == 'addvisitor'){return <Addvisitor backCtrl = {(bol)=> this._RouterCtrl(bol)}/>}
			//首页--便民服务
			else if(name == 'lifing_convenient'){return <Lifing_Convenient backCtrl = {(bol)=> this._RouterCtrl(bol)}/>}
			
			//生活--党建天地
			else if(name == 'lifing_build') {return <Lifing_Build backCtrl={(bol) => this._RouterCtrl(bol)}/>}
			//生活--党建天地
			else if(name == 'lifing_ask') {return <Lifing_Ask backCtrl={(bol) => this._RouterCtrl(bol)}/>} 
			//生活--党建天地
			else if(name == 'lifing_neighbourhood') {return <Lifing_Neighbourhood backCtrl={(bol) => this._RouterCtrl(bol)}/>}  

			//志愿者--规则
			else if(name == 'accumulate_ruler') {return <Accumulate_Ruler backCtrl={(bol) => this._RouterCtrl(bol)}/>} 
			//志愿者--我的参与
			else if(name == 'accumulate_join') {return <Accumulate_Join backCtrl={(bol) => this._RouterCtrl(bol)}/>} 
			//志愿者--往期活动
			else if(name == 'accumulate_active') {return <Accumulate_Active backCtrl={(bol) => this._RouterCtrl(bol)}/>} 
			//志愿者--积分兑换
			else if(name == 'accumulate_exchange') {return <Accumulate_Exchange backCtrl={(bol) => this._RouterCtrl(bol)}/>} 
			//志愿者--兑换详情
			else if(name == 'accumulate_goods_details') {return <Accumulate_Goods_Details backCtrl={(bol) => this._RouterCtrl(bol)}/>}
			//志愿者--活动详情
			else if(name == 'accumulate_details'){return <Accumulate_Details backCtrl={(bol) => this._RouterCtrl(bol)} mess={this.sendMess}/>}
			//志愿者--活动详情
			else if(name == 'accumulate_history'){return <Accumulate_History backCtrl={(bol) => this._RouterCtrl(bol)}/>}
			//志愿者--最新活动
			else if(name == 'accumulate_more_activity'){return <Accumulate_More_activity backCtrl={(bol,message) => this._RouterCtrl(bol,message)}/>}
		
			//我的--访问记录
			else if(name == 'my_invite'){return <My_Invite backCtrl = {(bol)=> this._RouterCtrl(bol)}/>}
			//我的--房屋
			else if(name == 'my_house'){return <My_House backCtrl = {(bol)=> this._RouterCtrl(bol)}/>}
			//我的--分享
			else if(name == 'my_share'){return <My_Share backCtrl = {(bol)=> this._RouterCtrl(bol)}/>}
			//我的--收藏
			else if(name == 'my_collect'){return <My_Collect backCtrl = {(bol)=> this._RouterCtrl(bol)}/>}
		}
	}
	
	//路由控制
	_RouterCtrl(control, data){
		if(control){
			this.HomeRouterPage = control;
			this.setState({
				_Pctrl: false,
			})
			this.sendMess = data
		}else {
			this.setState({
				_Pctrl: true,
			})
			this.sendMess = data
		}
	}

	//底部控制条选中
	setPage(){
		let tagName = this.nowPage
		if(tagName == 'Home'){
			this.setState({
				tag: <Home backCtrl={(value)=>this._RouterCtrl(value)} mainRouter={(page) => this.pageChose(page)}/>,
				homePic: require('./../../assets/首页彩色.png'),
			})
		}else if(tagName == 'Accumulate'){
			this.setState({
				tag: <Accumulate  backCtrl={(bol, data) => this._RouterCtrl(bol, data)}/>,
				AccumulatePic:require('./../../assets/志愿者选中.png'),
			})
		}else if(tagName == 'Lifing'){
			this.setState({
				tag: <Lifing backCtrl={(value)=>this._RouterCtrl(value)} />,
				LifingPic: require('./../../assets/生活彩色.png'),
			})
		}else if(tagName == 'Community'){
			this.setState({
				tag: <Community/>,
				CommunityPic: require('./../../assets/社区彩色.png'),
			})
		}else if(tagName == 'Mypage'){
			this.setState({
				tag: <Mypage backCtrl={(value)=>this._RouterCtrl(value)} />,
				MypagePic: require('./../../assets/我的彩色.png'),
			})
		}
	}

	//底部控制条未选中
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

module.exports = routers;