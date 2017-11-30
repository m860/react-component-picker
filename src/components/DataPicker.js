import React from "react";
import BaseComponent from './BaseComponent'
import PropTypes from 'prop-types'
import Picker from './Picker'

/**
 * DataPicker
 *
 * 可以实现各种复杂的Picker
 *
 * */
export default class DataPicker extends BaseComponent {
	/**
	 * @property {Object} option
	 * @property {Object} option.filter
	 * @property {Boolean} option.filter.show [false]
	 * @property {Function} option.filter.onChange [()=>null]
	 * */
	static propTypes = {
		option: PropTypes.shape({
			filter: PropTypes.shape({
				show: PropTypes.bool,
				onChange: PropTypes.func
			})
		})
	};

	static defaultProps = {
		option: {
			filter: {
				show: false,
				onChange: ()=>null
			}
		}
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	/**
	 * @method
	 * get picker instance
	 * */
	getPickerInstance() {
		return this.refs['picker']
	}

	render() {
		let inputProps = Object.assign({}, this.props);
		delete inputProps.option;
		delete inputProps.children;
		delete inputProps.onChange;

		let filterOption = {
			show: false,
			onChange: ()=> null
		};
		if (this.props.option) {
			if (this.props.option.filter) {
				filterOption = Object.assign(filterOption, this.props.option.filter);
			}
		}
		return (
			<Picker ref="picker" {...inputProps}>
				<div>
					<div style={{display:filterOption.show?'':'none'}}>
						<input type="text" placeholder="filter" onChange={filterOption.onChange}/>
					</div>
					<div>
						{React.Children.only(this.props.children)}
					</div>
				</div>
			</Picker>
		);
	}
}
