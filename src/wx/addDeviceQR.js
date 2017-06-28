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
  PickerIOS,
  TextInput,
  Dimensions,
  ToastAndroid,
  TouchableWithoutFeedback,
} = React;

var W =  Dimensions.get('window').width
var H = Dimensions.get('window').height 

var PickerItemIOS = PickerIOS.Item;

var rooms = []

var runArr = []


var Gthis;
function setThis(obj){
  Gthis = obj;
}
function testAlert(res){
 // alert("hahahahahah");
  console.log(res.indexOf('VERIFY'))
  console.log(res.indexOf('IEEE'))
  if ((res.indexOf('IEEE'))>=0 && (res.indexOf('VERIFY'))>=0){
    var deviceID = res.substr(5,23)
    var deviceCK = res.substr(35,32)
    
    console.log(deviceID);
    console.log(deviceCK);
    Gthis.setState({deviceID:deviceID})
    Gthis.setState({deviceCK:deviceCK})

    Gthis._isRightDevice(deviceID)

  }else{
    ToastAndroid.show('扫描的不是凡米设备的二维码', ToastAndroid.SHORT)
  }
  
}




var AddDeviceQR = React.createClass({


  getInitialState: function() {

    return {
      deviceName:'',
      deviceID:'',
      deviceCK:'',
      roomName:'客厅',
      tip:'',
      model_id:'',

    };


  },

  componentDidMount(){
    setThis(this);


  },
  componentWillMount() {
    console.log('ENTER MAINPAGE');
    console.log(this.props.Cus.runArr)
    runArr = this.props.Cus.runArr
    rooms = this.props.Gapp.deviceTabel.rooms

    console.log(rooms)

    this._weixinRegist()

    
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
          alert('微信接口调用失败');
        });

      })
      .catch((error) => {
        console.log(error);
        //console.warn(error);
      });
  },

  componentWillUnmount() {
    console.log('Leave MAINPAGE');
  },
  _genLightObj(roomID){

    var obj = {
      name:this.state.deviceName,
      hvaddr:this.state.deviceID,
      ckId:this.state.deviceCK,
      modelID:this.state.model_id,
      room:this.state.roomName,
      roomId:roomID,

    }
    return obj;
  },
 
  _QRRequest:function(){
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
                      testAlert(url);
                      //this._alert();
                      
                }
            });
   

},

  _isRightDevice:function(ieee){
    var Gapp = this.props.Gapp;
    fetch(Gapp.cmdUrl, {
    method: 'post',
    body: '{"cmd":23,"ieee_addr":"'+ieee+'"}'})
    .then((response) => response.json())
    .then((json) => {
        this.setState({model_id:json.model_id})
        this.setState({deviceName:json.model_name})
        
        
    })
   .catch((error) => {
      console.warn(error);
    });
  },
  
  _sureRequest:function(){
    console.log(this.state.deviceName)
    console.log(this.state.deviceID)
    console.log(this.state.deviceCK)
    console.log(this.state.roomName)

    this.isSureDevice()
    
  },
  isSureDevice:function(){
    if (this.state.model_id == 2 || this.state.model_id == 3){
          return(
              ToastAndroid.show('不能添加中控', ToastAndroid.SHORT)
            )
        }
    else{
          var roomId = 0
          for (var i = 0; i < rooms.length; i++) {
            if (rooms[i] == this.state.roomName){
              roomId = i
            }
          };
          var ckBool = true
          var dic = this._genLightObj(roomId)
          for (var i = 0; i < runArr.length; i++) {
            if (this.state.deviceID == runArr[i].hvaddr){
              ckBool = false 
            }
          };

          var Arr = this.props.Gapp.deviceTabel.lights
          for (var i = 0; i < Arr.length; i++) {
            if (this.state.deviceID == Arr[i].ieee){
              if (Arr[i].flag == 1){}
              else{
                ckBool = false
              } 
            }
          };

          var Arr1 = this.props.Gapp.deviceTabel.curtains
          for (var i = 0; i < Arr1.length; i++) {
            if (this.state.deviceID == Arr1[i].ieee){
              if (Arr1[i].flag == 1){}
              else{
                ckBool = false
              } 
            }
          };

          var Arr2 = this.props.Gapp.deviceTabel.sensors
          for (var i = 0; i < Arr2.length; i++) {
            if (this.state.deviceID == Arr2[i].ieee){
              if (Arr2[i].flag == 1){}
              else{
                ckBool = false
              } 
            }
          };

          var Arr3 = this.props.Gapp.deviceTabel.appls
          for (var i = 0; i < Arr3.length; i++) {
            if (this.state.deviceID == Arr3[i].ieee){
              if (Arr3[i].flag == 1){}
              else{
                ckBool = false
              } 
            }
          };

        if (ckBool){
          runArr.push(dic)
          console.log(runArr)
          this.props.Cus.this._getData(runArr)
          
          this.props.navigator.pop()
        }
        else{
          return(
        ToastAndroid.show('该设备已存在', ToastAndroid.SHORT)
        )
        }
        }
},
  
  render: function() {
    
    return (
      <View style={styles.contentContainer}>
        <Image
           source={{uri:'./appImg/loginpanel.jpg'}}
           style={styles.imgFull}>

          <View style={{flex:2,}}>
            <View style={{flex:5,marginTop:H*0.1}}>
              <View style={{flexDirection: 'row',marginLeft:20,width:W-40,}}>
                <Text style={styles.text1}>
                  设 备 名:
                </Text>
                <TextInput
                    style={{height:25,margin:4,width:W-110,}}
                    value={this.state.deviceName}
                    onChangeText={(text) => this.setState({deviceName: text})}
                    selectionColor={'blue'} />
              </View>
              <View style={{marginLeft:20,width:W-40,backgroundColor:'white',height:1,marginTop:5}} />
              <View style={{flexDirection: 'row',marginLeft:20,width:W-40,marginTop:10,}}>
                <Text style={styles.text1}>
                  设 备 ID:
                </Text>
                <TextInput
                    style={{height:25,margin:4,width:W-110,}}
                    value={this.state.deviceID}
                    onChangeText={(text) => this.setState({deviceID: text})}
                    selectionColor={'blue'} />
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
              <View style={{flexDirection: 'row',marginLeft:20,width:W-40,marginTop:10,}}>
                <Text style={styles.text1}>
                  房 间:
                </Text>
                <PickerIOS style = {{color: 'white',width:55,fontSize:15,height:20}}
                      selectedValue={this.state.roomName}
                      onValueChange={(roomName)=> this.setState({roomName})}>
                      {rooms.map((roomName) => (
                      <PickerItemIOS
                        key={roomName}
                        value={roomName}
                        label={roomName}
                      />
                  ))}
                  </PickerIOS>
                <Image source={{uri:'./appImg/air/spinner_list_down.png'}}
                        style={{width:25,height:15,marginTop:10,}} />
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
              <View style={{flexDirection: 'row',marginLeft:20,width:W-40,}}>
                <Text style={{color:'red',fontSize:15}}>
                  {this.state.tip}
                </Text>
              </View>
            </View>

         	<View>
            	<TouchableOpacity
              	style={[styles.buttonStyle,{marginBottom:H*0.3,}]}
              	underlayColor='gray'
              	onPress={() => this._sureRequest()}
            	>
           	   <Text style={styles.text2}>
            	确 定
            	</Text>
            	</TouchableOpacity>
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
  text1: {
    fontSize: 15,
    color:'white',
    marginTop:10

  },
  buttonStyle1: {
    flex:1,
    backgroundColor:'#1AE6E6',
    marginLeft:50,
    marginRight:0,
    marginBottom:15,
    marginTop:5,
  },

});

module.exports = AddDeviceQR;
