import React from "react";
import BaseComponent from './BaseComponent'
import PropTypes from 'prop-types'
import triggerChange from 'react-trigger-change'

export default class Picker extends BaseComponent {

	constructor(props) {
		super(props);
		this.state = {
			width: null,
			height: null,
			focus: false,
			hover: false
		};
		this.visible = false;
	}

	change(value) {
		const {input} =this.refs;
		input.value = value;
		triggerChange(input)
	}

	focus() {
		const {input} =this.refs;
		input.focus();
	}

	render() {
		let pickerStyle = {};
		if (this.state.width) {
			pickerStyle.width = this.state.width;
		}
		if (this.state.height) {
			pickerStyle.minHeight = this.state.height;
		}
		let inputProps = Object.assign({}, this.props, {
			onFocus: event=> {
				this.props.onFocus && this.props.onFocus(event);
				this.updateState({focus: {$set: true}})
			},
			onBlur: event=> {
				this.props.onBlur && this.props.onBlur(event);
				this.updateState({focus: {$set: false}})
			}
		});
		delete inputProps.children;

		let visible = this.visible;
		if (this.visible) {
			if (!this.state.hover && !this.state.focus) {
				visible = false;
			}
		}
		else {
			if (this.state.focus) {
				visible = true;
			}
		}
		this.visible = visible;

		return (
			<div
				onMouseLeave={()=>this.updateState({hover:{$set:false}})}
				onMouseEnter={()=>this.updateState({hover:{$set:true}})}
				className="react-component-picker"
				style={pickerStyle}>
				<div className="react-component-picker-wrapper" style={{zIndex:visible?999:'auto'}}>
					<div className="react-component-picker-input">
						<input ref="input" {...inputProps}/>
					</div>
					<div className="react-component-picker-data" style={{display:visible?'':'none'}}>
						{React.Children.only(this.props.children)}
					</div>
				</div>
			</div>
		);
	}

	componentDidMount() {
		super.componentDidMount();
		const {input}=this.refs;
		if (input) {
			const computedStyle = window.getComputedStyle(input);
			const width = parseFloat(computedStyle.width);
			const height = parseFloat(computedStyle.height);
			let newState = {};
			if (!isNaN(width)) {
				newState.width = {$set: width};
			}
			if (!isNaN(height)) {
				newState.height = {$set: height};
			}
			this.updateState(newState);
		}
	}
}
