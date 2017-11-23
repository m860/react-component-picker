import React from "react";
import BaseComponent from './BaseComponent'
import PropTypes from 'prop-types'
import triggerChange from 'react-trigger-change'

export default class Picker extends BaseComponent {
	static propTypes = {
		pickerVisible: PropTypes.bool,
		inputProps: PropTypes.object,
		onMouseEnter: PropTypes.func,
		onMouseLeave: PropTypes.func
	};

	static defaultProps = {
		pickerVisible: false,
		inputProps: {}
	};

	constructor(props) {
		super(props);
		this.state = {
			width: null,
			height: null
		};
	}

	triggerChange(value) {
		const {input} =this.refs;
		input.value = value;
		triggerChange(input)
	}

	render() {
		let pickerStyle = {};
		if (this.state.width) {
			pickerStyle.width = this.state.width;
		}
		if (this.state.height) {
			pickerStyle.minHeight = this.state.height;
		}
		return (
			<div
				onMouseLeave={this.props.onMouseLeave}
				onMouseEnter={this.props.onMouseEnter}
				className="picker"
				style={pickerStyle}>
				<div className="picker-wrapper" style={{zIndex:this.state.showData?999:'auto'}}>
					<div className="picker-input">
						<input ref="input" {...this.props.inputProps}/>
					</div>
					<div className="picker-data" style={{display:this.props.pickerVisible?'':'none'}}>
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
