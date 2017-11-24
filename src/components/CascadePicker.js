import React from "react";
import BaseComponent from './BaseComponent'
import PropTypes from 'prop-types'
import Picker from './Picker'

/**
 * CascadePicker
 * */
export default class CascadePicker extends BaseComponent {
	static propTypes = {
		option: PropTypes.shape({
			filter: PropTypes.shape({
				show: PropTypes.bool,
				onChange: PropTypes.func
			})
		})
	};

	static defaultProps = {};

	constructor(props) {
		super(props);
		this.state = {
			hover: false,
			focus: false,
		};
		this.pickerVisible = false;
	}

	clickItem(data) {
		if (this.props.onChange) {
			this.props.onChange('push', data);
		}
		const {picker}=this.refs;
		picker.focus();
	}


	render() {
		let inputProps = Object.assign({}, this.props, {
			onFocus: event=> {
				this.props.onFocus && this.props.onFocus(event);
				this.updateState({focus: {$set: true}})
			},
			onBlur: event=> {
				this.props.onBlur && this.props.onBlur(event);
				this.updateState({focus: {$set: false}})
			},
			onKeyDown: event=> {
				this.props.onKeyDown && this.props.onKeyDown(event);
				if (event.keyCode === 8) {
					this.props.onChange && this.props.onChange('pop');
				}
			}
		});
		delete inputProps.option;
		delete inputProps.children;
		delete inputProps.onChange;

		let pickerVisible = this.pickerVisible;
		if (this.pickerVisible) {
			if (!this.state.hover && !this.state.focus) {
				pickerVisible = false;
			}
		}
		else {
			if (this.state.focus) {
				pickerVisible = true;
			}
		}
		this.pickerVisible = pickerVisible;
		return (
			<Picker
				ref="picker"
				pickerVisible={this.pickerVisible}
				inputProps={inputProps}
				onMouseLeave={()=>this.updateState({hover:{$set:false}})}
				onMouseEnter={()=>this.updateState({hover:{$set:true}})}>
				<div
					className="cascade-picker">
					<div className="filter">
						<input type="text" placeholder="filter"/>
					</div>
					<div className="content">
						{this.props.children(this.clickItem.bind(this))}
					</div>
					<div className="buttons">
						<button
							type="button">确定
						</button>
					</div>
				</div>
			</Picker>
		);
	}

}
