/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ToastAndroid,
  AlertIOS,
  TouchableWithoutFeedback,
} = React;

var Gthis;
function setThis(obj){
  Gthis = obj;
}
function testAlert(res){

  if ((res.indexOf('IEEE'))>=0 && (res.indexOf('VERIFY'))>=0){
    
    

    var tempArr = res.split(' ')

    var deviceID = res.substr(5,23)
    var deviceCK = res.substr(36,33)
    //alert('deviceID'+deviceID + 'deviceCK'+deviceCK + '11111111111' + res);

    console.log(deviceID);
    console.log(deviceCK);

    Gthis.setState({deviceID:deviceID})
    Gthis.setState({deviceCK:deviceCK})

  }else{
    alert("else");
    ToastAndroid.show('扫描的不是凡米设备的二维码', ToastAndroid.SHORT)
  }
  
  
}

var W =  Dimensions.get('window').width
var H = Dimensions.get('window').height 

var scan = require('./scanQRCode.js')

var RegistPage = React.createClass({


  getInitialState: function() {

    return {
      deviceID:'',
      deviceCK:'',
      model_id:'',
    };


  },

  componentDidMount(){
    console.log('Did')
    setThis(this);


  },
   _weixinRegist:function(){
    var str = ''

    fetch("http://famesmart.com/WebApp/public/sample.php",{
    method: 'post',
    body: location.href.split('#')[0]
})
      .then((response) => response.json())
      .then((json) => {
        //http success
        console.log("winxin");
        console.log(json.appId)

        wx.config({
          debug: false,
          appId: json.appId,
          timestamp: json.timestamp,
          nonceStr: json.nonceStr,
          signature: json.signature,
          jsApiList: [
          'checkJsApi',
          'scanQRCode',
          'getNetworkType'
          ]
        });

        wx.error(function(res){   
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          //alert('微信接口调用失败');
        });

      })
      .catch((error) => {
        console.log(error);
        //console.warn(error);
      });
  },

  _QRRequest:function(){
    // this.setState({deviceID:'AF-B6-EA-04-00-4B-12-00'})
    // this.setState({deviceCK:'CF275EE72C0803DEC142E85B00D3F3F9'})
    //testAlert('IEEE:B8')
  //testAlert('IEEE:B8-BB-C2-03-00-4B-12-00 VERIFY:A7B7331E3E4D2BE45086DC80E86C9C4F TYPE:19 HVER:V1.6 SVER:V2.0.0');
  // 9.1.2 扫描二维码并返回结果
   wx.scanQRCode({
                // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
                needResult : 1,
                desc : 'scanQRCode desc',
                success : function(res) {
                    //扫码后获取结果参数赋值给Input
                    //$("body").attr('QRvalue','ssss');
                     //alert($("body").attr('QRvalue'));
                    var url = res.resultStr;
                    //alert(url)
                    testAlert(url);

                      //this._alert();
                      
                }
            });
   

},
  componentWillMount() {
    console.log('ENTER MAINPAGE');
    var name = this.props.Gapp.user.user_name
    console.log(name)
    //alert(location.href.split('#')[0])
    this._weixinRegist()

 
  },
  
  componentWillUnmount() {
    console.log('Leave MAINPAGE');
  },
  
  _isRightDevice:function(devidIeee){

    console.log(devidIeee)
    var Gapp = this.props.Gapp;
    fetch(Gapp.cmdUrl, {
    method: 'post',
    body: '{"cmd":23,"ieee_addr":"'+devidIeee+'"}'})
    .then((response) => response.json())
    .then((json) => {
        var model_id = json.model_id
        if (model_id == 2 || model_id == 3){

          this._registName(devidIeee,this.state.deviceCK)
        }
        else{
          return(
              ToastAndroid.show('扫描的不是中控', ToastAndroid.SHORT)
            )
        }
        console.log()
    })
   .catch((error) => {
      console.warn(error);
    });
  },
  _sureRequest:function(){
    

    console.log(this.state.deviceID)
    console.log(this.state.deviceCK)
    if (this.state.deviceID == '' || this.state.deviceCK == ''){
      return(
              ToastAndroid.show('请先扫一扫或者填写设备ID和校验码进行注册', ToastAndroid.SHORT)
            )
    }
    else{
      this._isRightDevice(this.state.deviceID)
    }

  },
  _registName:function(deviceID,deviceCK){


    var Gapp = this.props.Gapp;
    fetch(Gapp.cmdUrl, {
    method: 'post',
    body: '{"cmd":3,"user_name":"'+Gapp.user.user_name+'","user_pwd":"'+Gapp.user.user_pwd+'","user_pwd1":"'+Gapp.user.user_pwd+'","user_email":"web@lyzic.com"}'})
    .then((response) => response.json())
    .then((json) => {
      //alert(json.result)
      
        if (json.result == 0){
          //alert('123444')
          this.shipDevice(deviceID,deviceCK)
          
        }else{
          AlertIOS.alert(
                 '3'+ json.info +'',
                  null,
                [
                   {text: '确认'},
                 ]
              )
        }

    })
   .catch((error) => {
      console.warn(error);
      fa = false
    });
  },
  shipDevice:function(deviceID,deviceCK){
    var Gapp = this.props.Gapp;
    fetch(Gapp.cmdUrl, {
          method: 'post',
          body: '{"cmd":13,"user_name":"'+Gapp.user.user_name+'","user_pwd":"'+Gapp.user.user_pwd+'","ieee_addr":"'+deviceID+'","verify_code":"'+deviceCK+'","dname":"My SmartHome"}'})
          .then((response) => response.json())
         .then((json) => {
          alert('{"cmd":13,"user_name":"'+Gapp.user.user_name+'","user_pwd":"'+Gapp.user.user_pwd+'","ieee_addr":"'+deviceID+'","verify_code":"'+deviceCK+'","dname":"My SmartHome"}')
          if (json.result == 0){
            Gapp.did = json.did
            this.props.Cus.this._loadDeviceTable()
            this.props.navigator.pop()
            return(
              ToastAndroid.show('用户注册成功', ToastAndroid.SHORT)
            )
          
           }else{
            AlertIOS.alert(
                 '13'+ json.info +'',
                  null,
                [
                   {text: '确认'},
                 ]
              )
          }

        })
        .catch((error) => {
          console.warn(error);
      
        });
      },
  render: function() {
    
    return (
      <View style={styles.contentContainer}>
        <Image
           source={{uri:'./appImg/loginpanel.jpg'}}
           style={styles.imgFull}>

          <View style={{flex:2,}}>
            <View style={{flex:3}}>
              <View>
                <Text style={[styles.text3,{marginTop:H*0.1,marginBottom:H*0.1}]}>
                  中控设备二维码扫描
                </Text>
              </View>
              <View style={{flexDirection: 'row',marginLeft:20,width:W-40,marginTop:10,}}>
                <Text style={styles.text1}>
                  设 备 ID:
                </Text>
                <TextInput
                    style={{height:25,margin:4,width:W-110,}}
                    value={this.state.deviceID}
                    onChangeText={(text) => this.setState({deviceID: text})}
                    selectionColor={'blue'} 
                    id='id_securityCode_input' />
              </View>
              <View style={{marginLeft:20,width:W-40,backgroundColor:'white',height:1,marginTop:5}} />
              <View style={{flexDirection: 'row',marginLeft:20,width:W-40,marginTop:10,}}>
                <Text style={styles.text1}>
                  校 验 码:
                </Text>
                <TextInput
                    style={{height:25,margin:4,width:W-110,}}
                    value={this.state.deviceCK}
                    onChangeText={(text) => this.setState({deviceCK: text})}
                    selectionColor={'blue'} />
              </View>
              <View style={{marginLeft:20,width:W-40,backgroundColor:'white',height:1,marginTop:5}} />
            </View>

          <View style={{flex:2,marginTop:H*0.3,}} >
            <View style={{marginLeft:W*0.6}}>
              <TouchableOpacity
                  style={styles.buttonStyle1}
                  underlayColor='gray'
                  onPress={() => this._QRRequest()}
                >
                <Text style={styles.text2}>
                扫 一 扫
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={[styles.buttonStyle,{marginBottom:10,}]}
                underlayColor='gray'
                onPress={() => this._sureRequest()}
              >
               <Text style={styles.text2}>
              完 成
              </Text>
              </TouchableOpacity>
            </View>
            </View>
          </View>

        </Image>
      </View>


    );
  },
});

var styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection:'column',
  },
  imgFull:{
    flex: 1,
    resizeMode:'stretch',
  },
  buttonStyle: {
    flex:1,
    backgroundColor:'#1AE6E6',
    marginLeft:30,
    marginRight:30,
    marginTop:5,
  },
  text2: {
    fontSize: 18,
    color:'white',
    marginBottom:5,
    marginTop:5,
    textAlign: 'center',
  },
  text3: {
    fontSize: 22,
    color:'white',
    textAlign: 'center',

  },
  text1: {
    fontSize: 15,
    color:'white',
    marginTop:10

  },
  buttonStyle1: {
    flex:1,
    backgroundColor:'#1AE6E6',
    marginBottom:20,
    marginTop:5,
    marginRight:30,
  },

});

module.exports = RegistPage;






