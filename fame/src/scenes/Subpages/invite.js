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

export default class invite extends Component{
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
		this.state = {
			ds: ds,
			_page: 'recording',
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
	_getVisitor(num){
		let afteruri = '/api/cards/list/' + this.userMess.mobile;
		appData._dataPost(afteruri,'',(data)=>{
			let arr = data.cards;
			this.setState({
				visitor: arr,
			})
		})
	}

	_render(rowData){
		// console.log(rowData)
		let num = rowData.card_type;
		let type = '';
		if(num == '00'){
			type = '次卡'
		} else if(num == '01'){
			type = '月卡'
		} else if(num == '02'){
			type = '季卡'
		} 
		return (
			<View style={{ backgroundColor: 'white', height: pxToDp(170),paddingHorizontal: pxToDp(36), }}>
				<View style={{flex: 1, flexDirection:'row', borderBottomColor:'#bebebe', borderBottomWidth: pxToDp(2),}}>
					<View style={{flex: 1, justifyContent:'space-around'}}>
						<Text style={{fontSize: pxToDp(40), color: '#474747'}}>{rowData.memo ? rowData.memo:rowData.mobile}</Text>
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
	}

	//记录
	recording(){
		return(
			<View style={{flex: 1}}>
				<View style={{height:pxToDp(86), flexDirection:'row', justifyContent:'space-between', borderBottomColor:'#bebebe', borderBottomWidth: pxToDp(2)}}>
					<TouchableOpacity style={{width:pxToDp(120), alignItems: 'center',  flexDirection:'row'}} onPress={()=>this.props.backCtrl(false)}>
						<Image style={{height:pxToDp(48), width: pxToDp(48)}} source={require('./../../assets/arrow-left.png')} 	resizeMode="contain"/>
						<Text style={{fontSize:pxToDp(30)}}>返回</Text>
					</TouchableOpacity>
					<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<Text>访客邀请</Text>
					</View>
					<View style={{width:pxToDp(120)}}></View>
				</View>
				<View style={{flex: 1, backgroundColor:'#efefef', paddingVertical:pxToDp(20)}}>
					<View style={{paddingBottom: pxToDp(14),paddingHorizontal: pxToDp(36), flexDirection:'row', alignItems:'center'}}>
						<Text style={{fontSize:pxToDp(28), color: '#5a5a5a'}}>{this.userMess.comm_name}</Text>
						<Image style={{height:pxToDp(48), width: pxToDp(48)}} source={require('./../../assets/wxb定位.png')} resizeMode="contain"/>
					</View>
					<ListView
						dataSource={this.state.ds.cloneWithRows(this.state.visitor)}
						enableEmptySections={true}
						renderRow={this._render.bind(this)}
					/>
				</View>
				<View>
					<TouchableOpacity style={{height:pxToDp(86), backgroundColor: '#69bdd0', alignItems:'center', justifyContent:'center'}} onPress={()=> this._addvisitor(true)}>
						<Text style={{fontSize: pxToDp(38), color: 'white'}}>+添加新邀请</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}

	//新增页面控制器
	_addvisitor(bol){
		if(bol){
			this.setState({
				_page: 'addVisitor'
			})
		}else {
			this._getVisitor()
			this.setState({
				_page: 'recording'
			})
		}
	}

	_choosePage(){
		if(this.state._page == 'recording'){
			let page = this.recording();
			return page;
		} else if(this.state._page == 'addVisitor'){
			return <Addvisitor address={this.userMess.comm_name} backCtrl={()=>this._addvisitor(false)}/>
		}
	}

	render(){
		return (
			<View style={{flex: 1}}>
				{this._choosePage()}
			</View>
		)
	}
}
module.exports = invite;