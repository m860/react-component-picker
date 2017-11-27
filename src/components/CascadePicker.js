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
		this.state = {};
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

		return (
			<Picker ref="picker" {...inputProps}>
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
