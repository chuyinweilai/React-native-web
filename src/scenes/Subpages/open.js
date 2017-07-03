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

export default class open extends Component {
	constructor(props){
		super(props);
		this.state={
			imageUri: ' ',
			Remain: '',
			address:'',
		}
	}
	
	componentWillMount(){
		this._pulldata()
		appData._Storage('get','userMess',(data)=>{
			let json = JSON.parse(data)
			this.setState({
				address:json.comm_name,
			})
		})
	}

	//提交用户数据
	_pulldata(){
		let uri = '/api/cards/take';
		let _data = {
			"wx_id": "18912342933",		//openId
			"card_type": '00',		  //00单次，01月卡，02季卡
			"user_type": '0',			//0本人，1租户，2访客
			"memo": '一键开门'				       //备注
		}

		appData._dataPost(uri,_data,(ref)=>{
			if(ref[1] < 0){
				this._fail(ref)
			} else {
				this._success(ref)
			}
		})
	}

	//成功返回
	_success(arry){
		this._turnNum(arry)
	}

	//失败返回
	_fail(mess){
		// console.log(mess)
	}

	//生成二维码
	_turnNum(cardMess){
		let num = cardMess[0].toString();
		let x = Number(num.substr(3,5));
		let y = Math.floor(Math.random()*400+100);
		let z = Number(num.substr(0,3))	
		
		let number = x+(y*256+z)*65536
		let uri = 'http://famesmart.com/phpqrcode/qrcode.php?size=78&data=' + number;
		// +4893828329;
		this.setState({
			imageUri:uri,
			Remain: cardMess[1],
			date: cardMess[2],
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
					<View style={{flex: 1, marginHorizontal:pxToDp(45), marginVertical:pxToDp(56), borderRadius: pxToDp(20),backgroundColor: 'white'}}>
						<Image  style={[{flex: 1, margin:pxToDp(40)},{backgroundColor: this.state.colors}]} resizeMode='contain' source={{uri: this.state.imageUri}}></Image>
						
						<View style={{borderBottomWidth:pxToDp(2),borderBottomColor:'black', height:pxToDp(50)}}>
							<Text style={{textAlign:'center', fontSize: pxToDp(26), color: '#595959', }}>
								{this.state.address}
							</Text>
						</View>

						<View style={{height:pxToDp(300)}}>
							<Image style={{height:pxToDp(56), margin:pxToDp(16)}}/>
							<View style={{flexDirection: 'row', alignItems:'baseline', justifyContent:'center', paddingHorizontal: pxToDp(24), paddingBottom:pxToDp(10)}}>
								<Text style={{fontSize:pxToDp(22), color: '#bbb'}}>有效期至</Text>
								<View style={{flex: 1}}></View>
								<Text style={{fontSize:pxToDp(22), color: '#bbb'}}>{this.state.date}</Text>
							</View>
							<View style={{flexDirection: 'row', alignItems:'baseline', justifyContent:'center', paddingHorizontal: pxToDp(24), paddingBottom:pxToDp(10), borderBottomWidth:pxToDp(2),borderBottomColor:'black'}}>
								<Text style={{fontSize:pxToDp(22), color: '#bbb'}}>剩余次卡</Text>
								<View style={{flex: 1}}></View>
								<Text style={{fontSize:pxToDp(22), color: '#bbb'}}>{this.state.Remain} 张</Text>
							</View>
							<View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
								<Text style={{fontSize:pxToDp(34), color:'#595959'}}>请在门禁处出示二维码并扫描</Text>
							</View>
						</View>
					</View>
			</View>
		</View>
		)
	}


}

// const styles = StyleSheet.create({

// })
module.exports = open;