import {Dimensions} from 'react-native';

// 竖屏模式，所以可以只获取一次 width
const deviceWidthDp = Dimensions.get('window').width;
const deviceHeightDp = Dimensions.get('window').height;
// UI图大小
const uiWidthPx = 750;
const uiHeightPx = 1296;

//转换方式
function pxToDp(uiElementPx) {
		return uiElementPx *  deviceWidthDp / uiWidthPx;
}

module.exports = pxToDp;