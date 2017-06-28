/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var IndexPage = require('./indexPage')
var HttpRequest = require('./httpRequest')

var MainPage = require('./mainPage')
var AppPage = require('./appPage')
var LightPage = require('./lightPage')
var CurtainPage = require('./curtainPage')
var CurtainConPage = require('./curtainConPage')
var AirPage = require('./airPage')
var AirConPage = require('./airConPage')
var ModePage = require('./modePage')
var SensorPage = require('./sensorPage')
var AirQPage = require('./airQPage')
var AirQConPage = require('./airQConPage')
var RunningPage = require('./runningPage')
var PickerExample = require('./PickerIos')
var TimerPage = require('./timerPage')
var AddTimerPage = require('./addTimerPage')
var UserMaPage = require('./userMaPage')
var AboutFamePage = require('./aboutFame')
var UrlPage = require('./urlPage')
var Example = require('./Example')
var AmTimerPage = require('./amTimerPage')
var CheckBoxPage = require('./checkBox')
var CommFunPage = require('./commFun')
var SocketPage = require('./socket')
var VideoPage = require('./videoPage')
var PanelPage = require('./panelPage')
var CenAirPage = require('./cenAirPage')
var AddDevice = require('./addDevice')
var AddDeviceQR = require('./addDeviceQR')
var RegistPage = require('./registPage')
var scanQRCode = require('./scanQRCode')




var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  Navigator,
  PixelRatio,
  TouchableHighlight,
  TouchableOpacity,
  AsyncStorage,
  Text,
} = React;


var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          back
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return (
      <View/>
    );
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },



};

var ReactNativeWebExample = React.createClass({
  componentWillMount() {
    console.log('init');
    AsyncStorage.removeItem('@fameWebApp:lightsArr');
    AsyncStorage.removeItem('@fameWebApp:airsArr');
    AsyncStorage.removeItem('@fameWebApp:runArr');
  },
  renderScene: function(router, navigator){
      var Component = null;this._navigator = navigator;
      switch(router.name){
        case 'IndexPage':
          Component = IndexPage;
          break;
        case 'HttpRequest':
          Component = HttpRequest;
          break;
          
        case 'MainPage':
          Component = MainPage;
          break;
        case 'LightPage':
          Component = LightPage;
          break;
        case 'AppPage':
          Component = AppPage;
          break;
        case 'CurtainPage':
          Component = CurtainPage;
          break;
        case 'CurtainConPage':
          Component = CurtainConPage;
          break;
        case 'AirPage':
          Component = AirPage;
          break;
        case 'AirConPage':
          Component = AirConPage;
          break;
        case 'ModePage':
          Component = ModePage;
          break;
        case 'SensorPage':
          Component = SensorPage;
          break;
        case 'AirQPage':
          Component = AirQPage;
          break;
        case 'AirQConPage':
          Component = AirQConPage;
          break;
        case 'RunningPage':
          Component = RunningPage;
          break;
        case 'PickerExample':
          Component = PickerExample;
          break;
        case 'TimerPage':
          Component = TimerPage;
          break;
        case 'AddTimerPage':
          Component = AddTimerPage;
          break;
        case 'UserMaPage':
          Component = UserMaPage;
          break;
        case 'AboutFamePage':
          Component = AboutFamePage;
          break;
        case 'UrlPage':
          Component = UrlPage;
          break;
        case 'Example':
          Component = Example;
          break;
        case 'AmTimerPage':
          Component = AmTimerPage;
          break;
        case 'CheckBoxPage':
          Component = CheckBoxPage;
          break;
        case 'CommFunPage':
          Component = CommFunPage;
          break;
        case 'SocketPage':
          Component = SocketPage;
          break;
        case 'VideoPage':
          Component = VideoPage;
          break;
        case 'PanelPage':
          Component = PanelPage;
          break;
        case 'CenAirPage':
          Component = CenAirPage;          
          break;
        case 'AddDevice':
          Component = AddDevice;          
          break;
        case 'AddDeviceQR':
          Component = AddDeviceQR;          
          break; 
        case 'RegistPage':
          Component = RegistPage;          
          break; 
        case 'scanQRCode':
          Component = scanQRCode;          
          break; 
          
        default:
         Component = MainPage;
         break;
      }
      return <Component navigator={navigator} Gapp={router.Gapp} Cus={router.Cus}/>
    },
  render: function() {


    
    return (
      <View style={styles.container}>
        <Navigator
        style={styles.container}
        initialRoute={{name:'MainPage',title:'FAME',isHideNavBar:{true}}}
        renderScene={this.renderScene} 
          />
        
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navContainer: {
    paddingTop: 50,
    flex: 1,
  },
  navBar: {
    backgroundColor: '#efeff4',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    display: false,
  },
  navBarText: {
    fontSize: 16
  },
  navBarTitleText: {
    color: '#000',
    fontWeight: 700
  },
  navBarLeftButton: {
    color: '#007aff',
    paddingLeft: 10,
  },
  row: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#bbbbbb',
    marginLeft: 15,
  },
  rowNote: {
    fontSize: 17,
  },
  rowText: {
    fontSize: 17,
    fontWeight: '500',
  },
  emptyPage: {
    flex: 1,
    paddingTop: 64,
  },
  emptyPageText: {
    margin: 10,
  },
});

AppRegistry.registerComponent('ReactNativeWebExample', () => ReactNativeWebExample);







if(Platform.OS == 'web'){
  //document.write( "<style>*:focus { outline: none; } select{appearance:none;-moz-appearance:none;-webkit-appearance:none;border:none;} </style>" )
  var app = document.createElement('div');
  document.body.appendChild(app);

  document.write('<script src="http://famesmart.com/WebApp/public/jquery-1.8.0.min.js" type="text/JavaScript"></script>')
  document.write('<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>')

   







  AppRegistry.runApplication('ReactNativeWebExample', {
    rootTag: app
  })
}
