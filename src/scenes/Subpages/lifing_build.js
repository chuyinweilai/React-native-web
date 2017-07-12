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

export default class lifing_build extends Component {
	constructor(props){
		const ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2})
		super(props);
		this.state={
			ds: ds,
			dataSource: '',
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
			"type": 4
		}
		appData._dataPost('/api/events/select',body,(data)=>{
			if(data.message){
				alert(data.message)
				// this._setPage(true)
			}else {
				this.setState({
					dataSource: data.data,
				})
			}
		})
	}

	_render(rowData){
		let type = '';
		let pic =  rowData.pic_path;
		let ss = pic.split(',');
		return (
			<View style={{ borderTopColor:'#9a9a9a', borderTopWidth:1, borderBottomWidth: pxToDp(2), borderBottomColor: '#9a9a9a'}}>
				<View style={{height: pxToDp(78),flexDirection:'row', alignItems: 'center', paddingLeft: pxToDp(18)}}>
					<Image style={{height: pxToDp(56),width: pxToDp(56), borderRadius: pxToDp(28),backgroundColor: 'gray', marginRight: pxToDp(20)}} source={{uri: peruri + rowData.pic_path_face}}/>
					<Text style={{fontSize: pxToDp(18), color:'#ffc575'}}>{rowData.title}</Text>
				</View>
				<View style={{alignItems:'center'}}>
					<Text style={{textAlign:'justify',width:pxToDp(684), fontSize:pxToDp(21), lineHeight:pxToDp(29)}}>
							{rowData.detail}
					</Text>
					<ListView
							contentContainerStyle={{flexDirection: 'row', marginVertical:pxToDp(8), }}
							dataSource={this.state.ds.cloneWithRows(ss)}
							enableEmptySections = {true}
							renderRow = {this._imageRow.bind(this)}
					/>
				</View>
				<View style={{paddingBottom:pxToDp(10), flexDirection:'row',justifyContent:'flex-end', paddingRight: pxToDp(18)}}>
					<Text style={{textAlign:'right',fontSize:pxToDp(14), color:'#9c9c9c'}}>上传时间：{rowData.vld_start}</Text>
				</View>
			</View>
		)
	}

	_imageRow(rowData){
		return (
			<Image style={{width:pxToDp(342), height:pxToDp(212), margin:pxToDp(8)}} resizeMode="stretch"  source={{uri:peruri+rowData}}/>
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
					<Text>党建天地</Text>
				</View>
				<View style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}}/>
			</View>
			<ListView
				dataSource={this.state.ds.cloneWithRows(this.state.dataSource)}
				enableEmptySections = { true}
				renderRow = {this._render.bind(this)}
			/>
		</View>
		)
	}
}
module.exports = lifing_build;