/**
 * NetUitl 网络请求的实现
 * https://github.com/facebook/react-native
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
 
class scanQRCode extends React.Component{
    
    static getScan(callback){
        callback('123456')
        wx.scanQRCode({
                needResult: 1,
                desc: 'scanQRCode desc',
                success: function (res) {
                      //扫码后获取结果参数:htpp://xxx.com/c/?6123，截取到url中的防伪码后，赋值给Input
                      var url = res.resultStr;
                      callback('123456')
                      
                }
              });
    }


    
 
 
}
 
module.exports = scanQRCode;