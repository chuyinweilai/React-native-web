import React,{ Component } from 'react';
import{
	Text,
	View,
	Image,
	Navigator,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

const peruri = "http://cloudapi.famesmart.com";
const appData = require('./../../components/Ajax')

const pxToDp =require('../responsive/px');
// const deviceWidthDp = Dimensions.get('window').width;
// const deviceHeightDp = Dimensions.get('window').height;

export default class my_collect extends Component {
	constructor(props){
		super(props);
		this.state={
			pageChange: true,
			btnColor1 : '#249bd3ff',
			btnColor2 : '#249bd300'
		}
		this._nowpage = 'vol';
	}
	
	componentWillMount(){
	}

	_change(type){
		if(this._nowpage !== type){
			this._nowpage = type;
			if(type == 'vol' ){
				this.setState({
					pageChange: true,
					btnColor1: '#249bd3ff',
					btnColor2: '#249bd300',
				})
			}else if(type == 'comm'){
				this.setState({
					pageChange: false,
					btnColor1: '#249bd300',
					btnColor2: '#249bd3ff',
				})
			}
		}
	}

	_render_vol(){
		return (
			<View style={{flex: 1, paddingHorizontal: pxToDp(14)}}>
				<View style={{height: pxToDp(230),  paddingHorizontal: pxToDp(14), paddingVertical: pxToDp(20),borderBottomWidth: pxToDp(1), borderBottomColor: '#bebebe', flexDirection:'row', justifyContent: 'center'}}>
						<Image style={{width: pxToDp(200), height: pxToDp(180), backgroundColor: '#6fc'}}/>
						<View style={{flex: 1, marginLeft: pxToDp(28)}}>
							<Text style={{flex: 1, fontSize: pxToDp(34), color: "#989898"}}>上海闵行区马桥镇镇政府开展志愿服务者活动周</Text>
							<View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'flex-end'}}>
								<View  style={{flexDirection: 'row'}}>
									<Image style={{width: pxToDp(38), height: pxToDp(34),paddingHorizontal: pxToDp(10)}}/>
									<Text style={{fontSize: pxToDp(20), color: "#989898"}}>20</Text>
									<Image style={{width: pxToDp(38), height: pxToDp(34),paddingHorizontal: pxToDp(10)}}/>
									<Text style={{fontSize: pxToDp(20), color: "#989898"}}>50</Text>
								</View>
								<Text style={{fontSize: pxToDp(18), color: '#989898'}}>2017年7月9日 09:00</Text>
							</View>
						</View>
				</View>
			</View>
		)
	}

	_render_comm(){
		return (
			<View style={{flex: 1, paddingHorizontal: pxToDp(14)}}>
				<View style={{height: pxToDp(230),  paddingHorizontal: pxToDp(14), paddingVertical: pxToDp(20),borderBottomWidth: pxToDp(1), borderBottomColor: '#bebebe', flexDirection:'row', justifyContent: 'center'}}>
						<Image style={{width: pxToDp(200), height: pxToDp(180), backgroundColor: '#6fc'}}/>
						<View style={{flex: 1, marginLeft: pxToDp(28)}}>
							<Text style={{flex: 1, fontSize: pxToDp(34), color: "#989898"}}>上海闵行区马桥镇镇政府开展志愿服务者活动周</Text>
							<View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'flex-end'}}>
								<View  style={{flexDirection: 'row'}}>
									<Image style={{width: pxToDp(38), height: pxToDp(34),paddingHorizontal: pxToDp(10)}}/>
									<Text style={{fontSize: pxToDp(20), color: "#989898"}}>50</Text>
								</View>
								<Text style={{fontSize: pxToDp(18), color: '#989898'}}>2017年7月9日 09:00</Text>
							</View>
						</View>
				</View>
			</View>
		)
	}

	_render(){
		if(this.state.pageChange){
			return this._render_vol()
		} else {
			return this._render_comm()
		}
	}

	render() {
		return (
		<View style={{flex: 1}}>
			<View style={{height:pxToDp(86), flexDirection:'row', justifyContent:'space-between', backgroundColor:'#f2f2f2'}}>
				<TouchableOpacity style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center', flexDirection:'row'}} onPress={()=>this.props.backCtrl(false)}>
					<Image style={{height:pxToDp(48), width: pxToDp(48)}} source={require('./../../assets/arrow-left.png')} 	resizeMode="contain"/>
					<Text style={{fontSize:pxToDp(30)}}>返回</Text>
				</TouchableOpacity>
				<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
					<TouchableOpacity style={[{width: pxToDp(156), height:pxToDp(58), borderTopLeftRadius: pxToDp(10), borderBottomLeftRadius: pxToDp(10),borderWidth: pxToDp(1), borderColor: '#999', alignItems: 'center', justifyContent: 'center'},{backgroundColor: this.state.btnColor1}]} onPress={() => this._change('vol')}>
						<Text style={{fontSize: pxToDp(26)}}>志愿活动</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[{width: pxToDp(156), height:pxToDp(58), borderTopRightRadius: pxToDp(10), borderBottomRightRadius: pxToDp(10),borderWidth: pxToDp(1), borderColor: '#999', alignItems: 'center', justifyContent: 'center'},{backgroundColor: this.state.btnColor2}]}  onPress={() => this._change('comm')}>
						<Text style={{fontSize: pxToDp(26)}}>社区动态</Text>
					</TouchableOpacity>
				</View>
				<View style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}}/>
			</View>
			{this._render()}
		</View>
		)
	}
}
module.exports = my_collect;