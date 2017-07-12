import React,{ Component } from 'react';
import{
	Text,
	View,
	Image,
	ListView,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

const peruri = "http://cloudapi.famesmart.com";
const appData = require('./../../components/Ajax')

const pxToDp =require('../responsive/px');
// const deviceWidthDp = Dimensions.get('window').width;
// const deviceHeightDp = Dimensions.get('window').height;

export default class lifing_neighbourhood extends Component {
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1 , r2) => r1 !== r2})
		this.state={
			ds: ds,
			choose: false,
			dataSource:'',
		}
		this.userMess;
	}
	
	componentWillMount(){
		appData._Storage('get','userMess',(data)=>{
			let json = JSON.parse(data);
			this.userMess = json;
			this._getData()
		})
	}

	_getData(){
		let json = this.userMess ;
		let body = {
			"comm_code": json.comm_code, 
			"type": 9
		}
		appData._dataPost('/api/service',body,(data)=>{
			if(data.message){
				this._setPage(true)
			}else {
				this.setState({
					dataSource: data,
				})
			}
		})
	}

	_render(rowData){
		return (
			<View style={{height:pxToDp(824), paddingHorizontal: pxToDp(32), borderBottomColor:'#cecece', borderBottomWidth: pxToDp(1)}}>
				<View style={{paddingVertical:pxToDp(21)}}>
					<Image style={{flex: 1, height: pxToDp(386), }} source={{uri: peruri + rowData.pic_path}}/>
					<View style={{height: pxToDp(84), alignItems:'center', justifyContent:'center', borderBottomWidth: pxToDp(1), borderBottomColor: '#cecece'}}>
						<Text style={{fontSize: pxToDp(36), fontWeight: '600'}}>{rowData.name}</Text>
					</View>
				</View>
				<View>
					<Text style={{paddingVertical:pxToDp(21), fontSize: pxToDp(30)}}>地址： {rowData.address}</Text>
					<Text style={{paddingVertical:pxToDp(21), fontSize: pxToDp(30)}}>电话： {rowData.tel_no}</Text>
					<View style={{flexDirection:'row',paddingVertical:pxToDp(21)}}>
						<Text style={{fontSize:pxToDp(30)}}>服务时间：{rowData.comment}</Text>
						{/*<View>
							<Text style={{fontSize:pxToDp(30)}}>周一至周五		9：00—17：00</Text>
							<Text style={{fontSize:pxToDp(30)}}>周六/周日		10：00—12：00</Text>
						</View>*/}
					</View>
				</View>
			</View>
		)
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
						<Text>邻里中心</Text>
					</View>
					<View style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}}/>
				</View>
				<ListView
					dataSource ={this.state.ds.cloneWithRows(this.state.dataSource)}
					enableEmptySections = {true}
					renderRow = {this._render.bind(this)}
				/>
			</View>
		)
	}
}
module.exports = lifing_neighbourhood;