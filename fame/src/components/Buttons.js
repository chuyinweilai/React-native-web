import React,{Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TouchableHighlight,
} from 'react-native';

export default class Buttons extends Component {
	constructor(props){
		super(props);
		this.state = {
			color:'',
			text:'',
			textColor: '',
			check: true,
		}
		this.color1 = '';
		this.text1 = '';
		this.textColor1 = '';

		this.color2 = '';
		this.text2 = '';
		this.textColor2 = '';

		this.styleBtn={}
		this.styleText = {}
	}
	
	componentWillMount(){

		let a = this.props.onPress
		this.setState({
			check:this.props.checktest,
			color: this.props.btnColor,
			text: this.props.text,
			textColor: this.props.textColor
		})
		this.color1 =this.props.btnColor;
		this.text1 =this.props.text;
		this.textColor1 = this.props.textColor;

		this.color2 = this.props.cbtnColor
		this.text2 = this.props.ctext;
		this.textColor2 = this.props.ctextColor;

		this.styleBtn = this.props.btnStyle
		this.styleText = this.props.textStyle
		this.checBox()
	}

	//改变按钮背景颜色
	_changeBColor(){
		// if(this.state.color)
		return this.state.color
	}

	//改变按钮字体颜色
	_changeTColor(){
		return this.state.textColor
	}

	//改变按钮文字内容
	_textBack(){
		return this.state.text;
	}

	_callback(){
		let foo = this.props.onPress;
		foo()
		let color = this.state.color;
		if(color == this.color1){
			this.setState({
				color: this.color2,
				text: this.text2,
				textColor: this.textColor2
			})
		} else {
			this.setState({
				color: this.color1,
				text: this.text1,
				textColor: this.textColor1
			})
		}
	}

	checBox(){
		if(this.state.check){
			this.setState({
				color: this.color1,
				text: this.text1,
				textColor: this.textColor1
			})
		} else {
			this.setState({
				color: this.color2,
				text: this.text2,
				textColor: this.textColor2
			})
		}
	}
	//测试部分
	render(){
		return (
			<TouchableOpacity style={[this.styleBtn,{ backgroundColor:this._changeBColor()}]}  onPress={()=>this._callback()}>
				<Text style={[this.styleText,{color: this._changeTColor()}]}>{this._textBack()}</Text>
			</TouchableOpacity>
		)
	}
}
module.exports = Buttons;