import React from "react";
import BaseComponent from './BaseComponent'
import PropTypes from 'prop-types'

export default class Picker extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			showData: false,
			width: null,
			height: null
		};
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
			<div className="picker" style={pickerStyle}>
				<div className="picker-wrapper">
					<div className="picker-input">
						<input
							ref="input"
							onBlur={event=>{
								this.updateState({
									showData:{$set:false}
								})
							}}
							onFocus={event=>{
								this.updateState({
									showData:{$set:true}
								})
							}}/>
					</div>
					<div className="picker-data" style={{display:this.state.showData?'':'none'}}>
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
