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

export default class card extends Component {
	constructor(props){
		super(props);
		this.state={
			cardId: "",
			number: "",
			imageUri:'',
			Remain:'',
		}
	}
	
	componentWillMount(){
		this._turnNum(this.props.cardMess)
	}

	/*
		维根算法
		x+(y*256+z)*65536	
		card = 25560000
		z:255
		x:60000
		y:100~500
	*/
	_turnNum(cardMess){
		let num = cardMess[0].toString();
		let x = Number(num.substr(3,5));
		let y = Math.floor(Math.random()*400+100);
		let z = Number(num.substr(0,3))	
		
		let number = x+(y*256+z)*65536
		let uri = 'http://famesmart.com/phpqrcode/qrcode.php?size=78&data='+number;
		this.setState({
			imageUri:uri,
			Remain: cardMess[1]
		})
	}
	//保存到相册
	savePhoto(){
		console.log('保存相册')
	}

	//分享到微信
	shareWex(){
		console.log('分享')
	}
	
	//作废
	dropCard(){
		console.log('作废')
	}

	render() {
		return (
		<View style={{flex: 1}}>
			<View style={{height:pxToDp(86), flexDirection:'row', justifyContent:'space-between'}}>
				<TouchableOpacity style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.props.backCtrl(false)}>
					<Text style={{fontSize:pxToDp(30)}}>返回</Text>
				</TouchableOpacity>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<Text>邀请码</Text>
				</View>
				<View style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}}/>
			</View>

			<View style={{flex: 1, backgroundColor: '#ddd',}}>
					<View style={{flex: 1, marginHorizontal:pxToDp(45), marginVertical:pxToDp(56), borderRadius: pxToDp(20), backgroundColor: 'white'}}>
						<Image  style={{flex: 1, margin:pxToDp(40)}} resizeMode='contain' source={{uri: this.state.imageUri}}></Image>

						<View style={{borderBottomWidth:pxToDp(2),borderBottomColor:'black', height:pxToDp(50)}}>
							<Text style={{textAlign:'center', fontSize: pxToDp(26), color: '#595959', }}>
								上海市闵行区马桥智慧社区34号1901室
							</Text>
						</View>

						<View style={{height:pxToDp(300)}}>
							<Image style={{height:pxToDp(56), margin:pxToDp(16)}}/>
							<View style={{flexDirection: 'row', alignItems:'baseline', justifyContent:'center', paddingHorizontal: pxToDp(24), paddingBottom:pxToDp(10)}}>
								<Text style={{fontSize:pxToDp(22), color: '#bbb'}}>有效期至</Text>
								<View style={{flex: 1}}></View>
								<Text style={{fontSize:pxToDp(22), color: '#bbb'}}>2017年04月01日 10:53</Text>
							</View>
							<View style={{flexDirection: 'row', alignItems:'baseline', justifyContent:'center', paddingHorizontal: pxToDp(24), paddingBottom:pxToDp(10), borderBottomWidth:pxToDp(2),borderBottomColor:'black'}}>
								<Text style={{fontSize:pxToDp(22), color: '#bbb'}}>剩余卡数</Text>
								<View style={{flex: 1}}></View>
								<Text style={{fontSize:pxToDp(22), color: '#bbb'}}>{this.state.Remain} 张</Text>
							</View>
							<View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
								<Text style={{fontSize:pxToDp(34), color:'#595959'}}>请在门禁处出示二维码并扫描</Text>
							</View>
						</View>
					</View>
			</View>

			<View style={{height: pxToDp(120), flexDirection:'row',}}>
				<TouchableOpacity style={{flex: 1,  justifyContent:'center', backgroundColor:'#69bdd0',alignItems:'center'}}>
					<Text style={{width: pxToDp(210), textAlign :'center', fontWeight:'600', color: 'white'}}>保存到相册</Text>
				</TouchableOpacity>
				<TouchableOpacity style={{flex: 1, backgroundColor:'#b1cd29', alignItems:'center', justifyContent:'center',}}>
					<Text style={{width: pxToDp(210), textAlign :'center', fontWeight:'600', color: 'white'}}>分享微信</Text>
				</TouchableOpacity>
			</View>
		</View>
		)
	}
}
module.exports = card;