import React,{ Component } from 'react';
import{
	Text,
	View,
	Image,
	ListView,
	Navigator,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

const peruri = "http://cloudapi.famesmart.com";
const appData = require('./../../components/Ajax')
const pxToDp =require('../responsive/px');
const Addvisitor =require('./addvisitor');

export default class my_invite extends Component{
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
		this.state = {
			ds: ds,
			_page: 'noRec',
			visitor: '',
		}
		this.userMess = '';
	}

	componentWillMount(){
		appData._Storage('get','userMess',(data)=>{
			let json = JSON.parse(data);
			this.userMess = json;
			this._getVisitor()
		})
	}

	//获取访客记录
	_getVisitor(){
		let json = this.userMess ;
		let body = {
			"comm_code": json.comm_code, 
			"apt_code": json.apt_code, 
			"unit_code":json.unit_code, 
			"mobile": json.mobile
		}

		appData._dataPost('/api/cards/list',body,(data)=>{
			if(data.message !== undefined){
				this._addvisitor(true)
			}else {
				let arr = data.cards;
				this.setState({
					visitor: arr,
				})
				this._addvisitor(false)
			}
		})
	}

	_render(rowData){
		let num = rowData.card_type;
		let userType = rowData.user_type;
		let type = '';
		let user = '';
		if(num < 89){
			if(num == '00'){
				type = '次卡'
			} else if(num == '01'){
				type = '月卡'
			} else if(num == '02'){
				type = '季卡'
			}
			if(userType == '0'){
				user = '业主'
			} else if(userType == '1'){
				user = '租客'
			} else if(userType == '2'){
				user = '访客'
			} 
			return (
				<View style={{ backgroundColor: 'white', height: pxToDp(170),paddingHorizontal: pxToDp(36), }}>
					<View style={{flex: 1, flexDirection:'row', borderBottomColor:'#bebebe', borderBottomWidth: pxToDp(2),}}>
						<View style={{flex: 1, justifyContent:'space-around'}}>
							<Text style={{fontSize: pxToDp(40), color: '#474747'}}>{rowData.memo ? rowData.memo:rowData.mobile}({user})</Text>
							<Text style={{fontSize: pxToDp(26), color: '#bbb'}}>申请时间： {rowData.vld_start}</Text>
							<Text style={{fontSize: pxToDp(26), color: '#bbb'}}>有效期至： {rowData.vld_end}</Text>
						</View>
						<View style={{width: pxToDp(120), alignItems:'center', justifyContent:'center'}}>
							<Text style={{fontSize: pxToDp(38), color:'#c3d94a'}}>
								{type}
							</Text>
						</View>
					</View>
				</View>
			)
		} else {
			return null
		}
	}

	//记录
	_recording(){
		return(
				<View style={{flex: 1, backgroundColor:'#efefef', paddingVertical:pxToDp(20)}}>
					<View style={{paddingBottom: pxToDp(14),paddingHorizontal: pxToDp(36), flexDirection:'row', alignItems:'center'}}>
						<Image style={{height:pxToDp(36), width: pxToDp(32)}} source={require('./../../assets/定位.png')} resizeMode="stretch"/>
						<Text style={{fontSize:pxToDp(28), color: '#5a5a5a'}}>{this.userMess.comm_name}{this.userMess.apt_info}</Text>
					</View>
					<ListView
						dataSource={this.state.ds.cloneWithRows(this.state.visitor)}
						enableEmptySections={true}
						renderRow={this._render.bind(this)}
					/>
				</View>
		)
	}

	//新增页面控制器
	_addvisitor(bol){
		if(bol){
			this.setState({
				_page: 'noRec'
			})
		}else {
			this.setState({
				_page: 'recording'
			})
		}
	}

	_choosePage(){
		if(this.state._page == 'recording'){
			let page = this._recording();
			return page;
		} else if(this.state._page == 'noRec'){
			return (
				<View style={{flex: 1, backgroundColor: '#dbdbdb', alignItems: 'center', justifyContent: 'center'}}>
					<Text style={{ fontSize: pxToDp(46), color: "#acacac"}}>暂无访问记录</Text>
				</View>
			)
		}
	}

	render(){
		return (
			<View style={{flex: 1}}>
				<View style={{height:pxToDp(86), flexDirection:'row', justifyContent:'space-between', borderBottomColor:'#bebebe', borderBottomWidth: pxToDp(2)}}>
					<TouchableOpacity style={{width:pxToDp(120), alignItems: 'center',  flexDirection:'row'}} onPress={()=>this.props.backCtrl(false)}>
						<Image style={{height:pxToDp(48), width: pxToDp(48)}} source={require('./../../assets/arrow-left.png')} 	resizeMode="contain"/>
						<Text style={{fontSize:pxToDp(30)}}>返回</Text>
					</TouchableOpacity>
					<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<Text>访问邀请</Text>
					</View>
					<View style={{width:pxToDp(120)}}></View>
				</View>
				{this._choosePage()}
			</View>
		)
	}
}
module.exports = my_invite;