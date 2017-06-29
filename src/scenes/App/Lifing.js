/**
 * React Native for Web Starter App
 * https://github.com/grabcode/react-native-web-starter
 * Follow me https://twitter.com/grabthecode
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Button,
	ScrollView,
  StyleSheet,
  ListView,
	TouchableOpacity,
	Dimensions
} from 'react-native';

const pxToDp =require('../responsive/px');

export default class Lifing extends Component {
  constructor(props) {

    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds: ds.cloneWithRows([]),
      op1: 1,
      op2: 0.5,
      op3: 0.5,
      op4: 0.5,
      show: true,
    };
  }
  componentWillMount(){
    this.setState({
      ds:this.state.ds.cloneWithRows(this.AStars)
    })
  }

  starsShow(rowData,){
    console.log(rowData)
    // console.log(this.state.ds)
    return(
      <View>
        <Image style={{width: pxToDp(45), height: pxToDp(45), marginHorizontal:pxToDp(10)}} 
        source={require('../../assets/starsYellow.svg')}
        />
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{height: pxToDp(80), alignItems: 'center', justifyContent:'center', backgroundColor:'#f2f2f2'}}>
          <Text style={{fontSize: pxToDp(36)}}>我的生活</Text>
        </View>

        <View>
          <View style={{height: pxToDp(260),backgroundColor:'#5498a5', alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
            <TouchableOpacity style={{width: pxToDp(120), alignItems:'flex-end'}}>
              <Image style={{width: pxToDp(60), height: pxToDp(60), transform:[{rotate:'180deg'}]}} source={require('../../assets/moreWhite.svg')}/>
            </TouchableOpacity>
            <View style={{flex :1, flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
              <Image style={{height:pxToDp(60), width:pxToDp(60),borderRadius:'50%',backgroundColor:'#fefefe', marginHorizontal:pxToDp(20)}}/>
              <Image style={{height:pxToDp(60), width:pxToDp(60),borderRadius:'50%',backgroundColor:'#fefefe', marginHorizontal:pxToDp(20)}}/>
              <Image style={{height:pxToDp(90), width:pxToDp(90),borderRadius:'50%',backgroundColor:'#fefefe', marginHorizontal:pxToDp(20)}}/>
              <Image style={{height:pxToDp(60), width:pxToDp(60),borderRadius:'50%',backgroundColor:'#fefefe', marginHorizontal:pxToDp(20)}}/>
              <Image style={{height:pxToDp(60), width:pxToDp(60),borderRadius:'50%',backgroundColor:'#fefefe', marginHorizontal:pxToDp(20)}}/>
            </View>
            <TouchableOpacity style={{width: pxToDp(120), }}>
              <Image style={{width:pxToDp(60), height:pxToDp(60)}} source={require('../../assets/moreWhite.svg')}/>
            </TouchableOpacity>
          </View>
          <View style={{alignItems:'center'}}>
              <ListView
                dataSource={this.state.ds} 
                enableEmptySections = {true} 
                contentContainerStyle = {{paddingVertical:pxToDp(20),flexDirection:'row', alignItems:'center', justifyContent: 'center'}}
                renderRow = {this.starsShow.bind(this)}/>
              <Text style={{lineHeight: pxToDp(24), fontSize:pxToDp(14),color: '#9a9a9a'}}>4月份物业服务质量评价</Text>
          </View>
        </View>

          <View style={{height:pxToDp(70), backgroundColor:'#dcdcdc',flexDirection:'row', alignItems:'center'}}>
            <View style={{flex: 1, paddingRight:pxToDp(30)}}>
                <Image style={{height:pxToDp(32), width:pxToDp(30)}} resizeMode='stretch' />
            </View>
            <View style={{flex: 1,alignItems:'center'}}>
              <Text style={{fontSize:pxToDp(32), color:'white'}}>生活服务</Text>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity style={{paddingRight:pxToDp(30),alignItems: 'flex-end'}}>
                <Image style={{height:pxToDp(32), width:pxToDp(30),}} resizeMode='stretch' source={require('../../assets/Add.svg')}/>
              </TouchableOpacity>
            </View>
          </View>

          <View>
              <View style={{ flexDirection: 'row', alignItems:'center', justifyContent:'center'}}>
                  <TouchableOpacity style={{flex: 1, alignItems:'center', justifyContent:'center', padding:pxToDp(20)}}>
                    <Image style={{width:pxToDp(120), height:pxToDp(120), backgroundColor:'#f9c', borderRadius:'10%'}} />
                    <Text style={{fontSize: pxToDp(20)}}>物业缴费</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex: 1, alignItems:'center', justifyContent:'center', padding:pxToDp(20)}}>
                    <Image style={{width:pxToDp(120), height:pxToDp(120), backgroundColor:'#f9c', borderRadius:'10%'}} />
                    <Text style={{fontSize: pxToDp(20)}}>邮包管理</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex: 1, alignItems:'center', justifyContent:'center', padding:pxToDp(20)}}>
                    <Image style={{width:pxToDp(120), height:pxToDp(120), backgroundColor:'#f9c', borderRadius:'10%'}} />
                    <Text style={{fontSize: pxToDp(20)}}>投诉专栏</Text>
                  </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignItems:'center', justifyContent:'center'}}>
                  <TouchableOpacity style={{flex: 1, alignItems:'center', justifyContent:'center', padding:pxToDp(20)}}>
                    <Image style={{width:pxToDp(120), height:pxToDp(120), backgroundColor:'#f9c', borderRadius:'10%'}} />
                    <Text style={{fontSize: pxToDp(20)}}>故障报修</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex: 1, alignItems:'center', justifyContent:'center', padding:pxToDp(20)}}>
                    <Image style={{width:pxToDp(120), height:pxToDp(120), backgroundColor:'#f9c', borderRadius:'10%'}} />
                    <Text style={{fontSize: pxToDp(20)}}>党建天地</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex: 1, alignItems:'center', justifyContent:'center', padding:pxToDp(20)}}>
                    <Image style={{width:pxToDp(120), height:pxToDp(120), backgroundColor:'#f9c', borderRadius:'10%'}} />
                    <Text style={{fontSize: pxToDp(20)}}>问卷调查</Text>
                  </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignItems:'center', justifyContent:'center'}}>
                  <TouchableOpacity style={{flex: 1, alignItems:'center', justifyContent:'center', padding:pxToDp(20)}}>
                    <Image style={{width:pxToDp(120), height:pxToDp(120), backgroundColor:'#f9c', borderRadius:'10%'}} />
                    <Text style={{fontSize: pxToDp(20)}}>周边商圈</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex: 1, alignItems:'center', justifyContent:'center', padding:pxToDp(20)}} disabled={true}>
                    <Image style={{width:pxToDp(120), height:pxToDp(120), borderRadius:'10%'}} />
                    <Text style={{fontSize: pxToDp(20)}}></Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex: 1, alignItems:'center', justifyContent:'center', padding:pxToDp(20)}} disabled={true}>
                    <Image style={{width:pxToDp(120), height:pxToDp(120), borderRadius:'10%'}} />
                    <Text style={{fontSize: pxToDp(20)}}></Text>
                  </TouchableOpacity>
              </View>
          </View>
          <View style={{flex: 1}}></View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
		flex: 1,
  },
  banners:{
		height:pxToDp(387),
    backgroundColor:'gray',
  },
  BScontrol:{
    width: pxToDp(14),
    height: pxToDp(14),
    borderRadius:50,
    marginHorizontal: pxToDp(3.5),
    backgroundColor: '#FFF',
  },
  logo: {
    flex: 1,
    flexDirection:'row',
    height: pxToDp(232),
    paddingVertical: pxToDp(22)
  },
  welcome: {
    fontSize: pxToDp(20),
    textAlign: 'center',
    margin: pxToDp(10)
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  touchable: {
    backgroundColor: '#CAE6FE'
  }
});

module.exports = Lifing;