import React,{Component} from 'react';
import {
	View,
	Text,
	Image,
	ListView,
	TextInput,
	TouchableOpacity,
} from 'react-native';

const peruri = "http://cloudapi.famesmart.com";
const appData = require('./../../components/Ajax');
const pxToDp =require('../responsive/px');
const Areas_Choose =require('./areas_choose');

export default class regist extends Component{
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1 ,r2) => r1 !== r2})
		this.state={
			ds: ds,
			dataSource1:[],
			dataSource2:[],
			headIcon: '',
			changep: true,
			add: '',
			arr: [],
			warningText: ''
		};
		this.left= 0;
		this.right = 0;
		this.openId = '';
		this.userMess = {};					//用户信息
	}

	componentWillMount(){
		appData._Storage('get', 'openId',(res)=>{
			this.userMess.openId = res;
		})
	}

	_login(){
		let mobile = '18912342933'
		let afturi = '/api/residents/list/'+ mobile
		appData._dataGet(afturi, (data) => {
			this._subfield(data)
		});
	}

	_pickImg(){
		wx.chooseImage({
			count: 1, // 默认9,上传数量的限制
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
				var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
				console.log(res)
				this._uploadImg(localIds)
			}
		})
	}

	_uploadImg(localIds){
		wx.uploadImage({
    		localId: '', // 需要上传的图片的本地ID，由chooseImage接口获得
			isShowProgressTips: 1, // 默认为1，显示进度提示
			success: function (res) {
				var serverId = res.serverId; // 返回图片的服务器端ID
				console.log(serverId)
			}
		});
	}

	_header(){
		if(this.props.mess){
		return (	
			<View style={{height:pxToDp(86), flexDirection:'row', justifyContent:'space-between', backgroundColor:'#f2f2f2'}}>
				<TouchableOpacity style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center', flexDirection:'row'}} onPress={()=>this.props.backCtrl('my_house')}>
					<Image style={{height:pxToDp(48), width: pxToDp(48)}} source={require('./../../assets/arrow-left.png')} 	resizeMode="contain"/>
					<Text style={{fontSize:pxToDp(30)}}>返回</Text>
				</TouchableOpacity>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<Text style={{fontSize: pxToDp(32)}}>添加房屋信息</Text>
				</View>
				<View style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}}>
				</View>
				</View>
				)
		} else{
			return(
				<View style={{height:pxToDp(86), flexDirection:'row',backgroundColor:'#f2f2f2',  justifyContent:'space-between'}}>
					<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{fontSize: pxToDp(36)}}>用户注册</Text>
					</View>
				</View>
			)
		}
	}


	//注册页面
	_regist(){
		return (
			<View style={{flex: 1, backgroundColor: '#dbdbdb'}}>
				{this._header()}
				<View style={{flex: 1, padding: pxToDp(40)}}>
					{/* <View style={{alignItems: 'center'}}>
						<TouchableOpacity style={{padding: pxToDp(40), justifyContent: 'center'}} onPress={()=> this._pickImg()}>
							<Image style={{width: pxToDp(200), height: pxToDp(200), borderRadius: '50%', backgroundColor: '#6fc'}} resizeMode="stretch"  source={{uri: this.state.headIcon}}/>
						</TouchableOpacity>
					</View> */}
					<View style={{flexDirection: 'row', height: pxToDp(100), padding: pxToDp(20), alignItems: 'center'}}>
						<Text style={{width: pxToDp(100), textAlign:'right', paddingRight: pxToDp(30)}}>昵称</Text>
						<TextInput 
									style={{height: pxToDp(50),borderColor: '#ccc', borderWidth: pxToDp(1), fontSize: pxToDp(32), padding:pxToDp(10) }} 
									selectTextOnFocus ={true} 
									maxLength = {6} 
									defaultValue = {this.userMess.nickname}
									placeholder='长度不超过6个字符' 
									onChangeText={this._userMess.bind(this,'nickname')}/>
					</View>
					<View style={{flexDirection: 'row',  height:pxToDp(24), alignItems: 'center', paddingLeft: pxToDp(150)}}>
						<Text style={{color:'red', fontSize: pxToDp(24)}}></Text>
					</View>
					<View style={{flexDirection: 'row', height: pxToDp(100), padding: pxToDp(20), alignItems: 'center'}}>
						<Text style={{width: pxToDp(100), textAlign:'right', paddingRight: pxToDp(30)}}>手机号</Text>
						<TextInput 
									style={{height: pxToDp(50),borderColor: '#ccc', borderWidth: pxToDp(1), fontSize: pxToDp(32), padding:pxToDp(10) }} 
									defaultValue = {this.userMess.tel}
									selectTextOnFocus ={true} 
									maxLength = {11} 
									onChangeText={this._userMess.bind(this,'tel')}/>
						<Text style={{paddingHorizontal: pxToDp(20),color:'red', fontSize: pxToDp(24)}}>*必填</Text>
					</View>
					<View style={{flexDirection: 'row',  height:pxToDp(24), alignItems: 'center', paddingLeft: pxToDp(150)}}>
						<Text style={{color:'red', fontSize: pxToDp(24)}}>{this.state.warningText}</Text>
					</View>
					{/* <View style={{flexDirection: 'row', height: pxToDp(100), padding: pxToDp(20), alignItems: 'center'}}>
						<Text style={{width: pxToDp(100), textAlign:'right', paddingRight: pxToDp(30)}}>手机号</Text>
						<TextInput style={{height: pxToDp(50),borderColor: '#ccc', borderWidth: pxToDp(1), fontSize: pxToDp(32), padding:pxToDp(10) }} selectTextOnFocus ={true} maxLength = {6} placeholder='长度不超过6个字符'></TextInput>
					</View> */}
					
				</View>
				<TouchableOpacity style={{height: pxToDp(100), margin: pxToDp(10), backgroundColor: '#69bdd0', borderRadius:pxToDp(20), alignItems:'center', justifyContent: 'center'}}  onPress={this._changePage.bind(this,false)}>
					<Text style={{fontSize: pxToDp(42), color: 'white'}}>下一步</Text>
				</TouchableOpacity>
			</View>
		)
	}

	_userMess(id,mess){
		if(id == 'nickname'){
			this.userMess.nickname = mess			
		} 
		else if(id == 'tel'){
			this.userMess.mobile = mess
			if(/^1(3|4|5|7|8)\d{9}$/.test(mess)){
				this.setState({
					warningText: ''
				})
				this.userMess.bol = true;
			} else {
				this.userMess.bol = false;
				this.setState({
					warningText: '请填入正确的手机号'
				})
			}
		} 
		// console.log(this.userMess)
	}

	_changePage(bol){
		if(this.userMess.bol){
			this._login();
			this.setState({
				changep: bol
			})
		} else{
			alert('您输入的信息有误')
		}
	}


	//左右分栏
	_subfield(data){
		console.log(data)
		let arr1 = [];
		let arr2 = [];
		this.left= 0;
		this.right = 0;
		this.setState({
			arr: data
		})
		data.forEach(function(element,index) {
			if(this.left <= this.right){
				arr1.push(element)
				this.left++;
			}else {
				arr2.push(element)
				this.right++;
			}
		}, this);
		this.setState({
			dataSource1: arr1,
			dataSource2: arr2,
		})
	}

	//选择地址
	_address(){
		return (
			<View style={{flex: 1}}>
				<View style={{height:pxToDp(86), flexDirection:'row',backgroundColor:'#f2f2f2',  justifyContent:'space-between'}}>
					<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{fontSize: pxToDp(36)}}>地址选择</Text>
					</View>
				</View>
				<View style={{flex: 1,}}>
					<View style={{ paddingHorizontal: pxToDp(24), }}>
						<Text style={{fontSize: pxToDp(18),  height: pxToDp(36), color: '#acacac'}}>点击勾选号进行位置切换</Text>
					</View>
					<View style={{paddingHorizontal: pxToDp(25), paddingVertical : pxToDp(5), flexDirection: 'row'}}>
						<ListView 
							dataSource={this.state.ds.cloneWithRows(this.state.dataSource1)}
							enableEmptySections ={ true}
							renderRow = {this._render.bind(this)}
							/><ListView 
							dataSource={this.state.ds.cloneWithRows(this.state.dataSource2)}
							enableEmptySections ={ true}
							renderRow = {this._render.bind(this)}
							/>
					</View>
				</View>
				<View style={{flexDirection: 'row', height: pxToDp(120),padding: pxToDp(10)}}>
					<TouchableOpacity style={{flex: 1, margin: pxToDp(5), backgroundColor: '#fa4760', borderRadius:pxToDp(20), alignItems:'center', justifyContent: 'center'}} onPress={this._changePage.bind(this,true)}>
						<Text style={{fontSize: pxToDp(42), color: 'white'}}>上一步</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{flex: 1, margin: pxToDp(5), backgroundColor: '#69bdd0', borderRadius:pxToDp(20), alignItems:'center', justifyContent: 'center'}} onPress={this._updata.bind(this)}>
						<Text style={{fontSize: pxToDp(42), color: 'white'}}>确认选择</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}

	_render(rowData){
		let bgColor = '#69bdd000'
		if(rowData.choosed){
			bgColor = '#69bdd0ff'
		}
		return (
			<View style={{margin: pxToDp(25),  flex: 1, }}>
				<View style={{backgroundColor: '#dbdbdb',height: pxToDp(486), borderRadius: pxToDp(20), padding:pxToDp(20)}}>
					<View style={{flex: 1, alignItems: 'center'}}>
						{/* <Image style={{height: pxToDp(144), width: pxToDp(144), borderRadius: '50%', borderColor: '#939393', borderWidth: pxToDp(2)}}/> */}
						<Text style={{fontSize: pxToDp(36), lineHeight: pxToDp(68), marginBottom: pxToDp(22), color:'#939393'}}>{rowData.name}</Text>
						<Text style={{fontSize: pxToDp(26), height: pxToDp(80), lineHeight: pxToDp(38), color:'#939393'}}>{rowData.comm_name}</Text>
						<Text style={{fontSize: pxToDp(26), lineHeight: pxToDp(38), color:'#939393'}}>{rowData.apt_info}</Text>
					</View>
					<View style={{width: pxToDp(248), height: pxToDp(72), marginTop: pxToDp(24),alignItems: 'flex-end', justifyContent: 'flex-end'}}>
						<TouchableOpacity onPress={this._choseAddress.bind(this, rowData)}>
							<Image style={[{width: pxToDp(72), height: pxToDp(72), borderRadius:'50%', borderColor:'#acacac', borderWidth: pxToDp(2)}, {backgroundColor: bgColor}]}/>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}

	//勾选地址操作
	_choseAddress(rowData){
		let arr =  this.state.arr.concat()
		arr.forEach((json,index)=>{
			if(json.apt_code == rowData.apt_code &&json.comm_code == rowData.comm_code &&json.unit_code == rowData.unit_code) {
				if(json.choosed !== 1){
					json.choosed = 1
					this.setState({
						aChoosed:rowData
					})
				}
			} else{
				json.choosed = 0
			}
		})
		this._subfield(arr)
	}

	_choosePage(){
		if(this.state.changep){
			return this._regist()
		} else {
			return this._address()
		}
	}

	//提交数据
	_updata(){
		let userMess = this.userMess;
		let arr=  this.state.arr;
		let address = {};
		arr.forEach((index) => {
			if(index.choosed){
				address = index;
			}
		})

		let data = {
			"wx_id": userMess.openId,
			"nickname":  userMess.nickname,
			"name": address.name,
			"gender": address.gender,
			"mobile": userMess.mobile,
			"comm_code": address.comm_code,
			"apt_code": address.apt_code,
			"unit_code": address.unit_code,
			"floor": address.floor,
			"room": address.room,
			"type": address.type,
			"comm_name": address.name,
			"apt_info": address.apt_info,
		}
		appData._dataPost('/api/wxuser/add',data,(res)=>{
			if(res){
				alert ('该手机号未在物业处登记')
			}
		})
	}

	render(){
		return (
			<View style={{flex: 1}}>
				{this._choosePage()}
			</View>
		)
	}
}
module.exports = regist;