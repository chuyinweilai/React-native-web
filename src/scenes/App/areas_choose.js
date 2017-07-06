import React,{Component} from 'react';
import {
	View,
	Text,
	Image,
	ListView,
	TouchableOpacity,
} from 'react-native';

const AppData = require('./../../components/Ajax');
const pxToDp = require('./../responsive/px');

export default class areas_choose extends Component{
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2})
		this.state={
			ds:ds,
			dataSource:[],
		};
	}

	componentWillMount(){
		this.setState({
			dataSource:this.state.ds.cloneWithRows(this.props.userMess)
		})

	}

	_render(rowData){
		console.log(rowData);
		let id = '';
		if(rowData.type == 'Z'){
			id = '租户'
		} else if(rowData.type == 'Y'){
			id = '业主'
		}
		return (
			<TouchableOpacity style={{height: pxToDp(300),margin:pxToDp(30), borderRadius:pxToDp(30), backgroundColor: '#ccc',padding: pxToDp(40), justifyContent:'center'}} onPress={{ }}>
				<View>
					<Text style={{fontSize:pxToDp(36)}}>{rowData.comm_name}</Text>
					<Text style={{fontSize:pxToDp(36)}}>{rowData.apt_info}</Text>
					<Text style={{marginTop:pxToDp(40), fontSize:pxToDp(30)}}>{id}</Text>
				</View>
			</TouchableOpacity>
		)
	}

	render(){
		return (
			<View>
				<View style={{height:pxToDp(86),backgroundColor:'#f2f2f2', alignItems: 'center', justifyContent: 'center'}}>
					<Text style={{fontSize: pxToDp(36)}}>请选择所在小区</Text>
				</View>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this._render.bind(this)}
				/>
			</View>
		)
	}
}
module.exports = areas_choose;