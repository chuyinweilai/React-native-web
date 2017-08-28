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
// const deviceWidthDp = Dimensions.get('window').width;
// const deviceHeightDp = Dimensions.get('window').height;

export default class my_house extends Component {
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1 ,r2) => r1 !== r2})
		this.state={
			ds: ds,
			dataSource1:[],
			dataSource2:[],
			aChoosed:{}
		}
		this.left= 0;
		this.right = 0;
		this.arr = [];
	}
	
	componentWillMount(){
		appData._Storage('get','openId',(data) => {
			this._login(data)
		})
		appData._Storage('get','userMess',(data) => {
			this.setState({
				aChoosed: JSON.parse(data),
			})
		})

	}

	_login(openId){
		let afturi = '/api/wxuser/roomlist/'+ openId
		appData._dataGet(afturi, (data) => {
			this._subfield(data)
		});
	}

	//左右分栏
	_subfield(data){
		console.log(data)
		let arr1 = [];
		let arr2 = [];
		this.left= 0;
		this.right = 0;
		this.arr = data;
		data.forEach(function(element) {
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

	_render(rowData){
		let json = this.state.aChoosed
		let bgColor = '#69bdd000'
		if(json.apt_code == rowData.apt_code &&json.comm_code == rowData.comm_code &&json.unit_code == rowData.unit_code) {
			bgColor = '#69bdd0ff'
		}
		return (
			<View style={{margin: pxToDp(25),  flex: 1, }}>
				<View style={{backgroundColor: '#dbdbdb',height: pxToDp(486), borderRadius: pxToDp(20), padding:pxToDp(20), alignItems: 'center'}}>
						<Image style={{height: pxToDp(144), width: pxToDp(144), borderRadius: '50%', borderColor: '#939393', borderWidth: pxToDp(2)}}/>
						<Text style={{fontSize: pxToDp(36), lineHeight: pxToDp(68), marginBottom: pxToDp(22), color:'#939393'}}>{rowData.name}</Text>
						<Text style={{fontSize: pxToDp(26), height: pxToDp(80), lineHeight: pxToDp(38), color:'#939393'}}>{rowData.comm_name}</Text>
						<Text style={{fontSize: pxToDp(26), lineHeight: pxToDp(38), color:'#939393'}}>{rowData.apt_info}</Text>
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
		let data = {
			"wx_id": rowData.wx_id,
			"comm_code": rowData.comm_code,
			"apt_code": rowData.apt_code,
			"unit_code": rowData.unit_code,
		}
		appData._dataPost('/api/wxuser/roomswitch',data,(res)=>{
			if(res){
				this.setState({
					aChoosed: rowData
				})
				this._login(rowData.wx_id);
				appData._Storage('get','openId',(openId) =>{
					let afturi = '/api/wxuser/'+ openId
					appData._dataGet(afturi, (data) => {
						appData._Storage('set','userMess',data[0])
					});
				})
			}
		})
	}
	
	render() {
		return (
		<View style={{flex: 1}}>
			<View style={{height:pxToDp(86), flexDirection:'row', justifyContent:'space-between', backgroundColor:'#f2f2f2'}}>
				<TouchableOpacity style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center', flexDirection:'row'}} onPress={()=>this.props.backCtrl(false)}>
					<Image style={{height:pxToDp(48), width: pxToDp(48)}} source={require('./../../assets/arrow-left.png')} 	resizeMode="contain"/>
					<Text style={{fontSize:pxToDp(30)}}>返回</Text>
				</TouchableOpacity>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<Text style={{fontSize: pxToDp(32)}}>我的房屋</Text>
				</View>
				<View style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}}>
					<TouchableOpacity onPress={() => this.props.backCtrl('regist')}>
						<Text style={{fontSize: pxToDp(48)}}>+</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View>
				<View style={{height: pxToDp(176), backgroundColor: '#dbdbdb', paddingHorizontal: pxToDp(24), paddingTop:pxToDp(34)}}>
					<Text style={{fontSize: pxToDp(30),  height: pxToDp(106)}}>当前房屋位置：{this.state.aChoosed.comm_name}{this.state.aChoosed.apt_info}{this.state.aChoosed.unit_code}</Text>
					<Text style={{fontSize: pxToDp(18),  height: pxToDp(36), color: '#acacac'}}>点击勾选号进行位置切换</Text>
				</View>
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
		)
	}
}
module.exports = my_house;