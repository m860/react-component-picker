import React from "react";
import BaseComponent from './BaseComponent'
import PropTypes from 'prop-types'
import Picker from './Picker'

/**
 * HistoryTextInputPicker
 *
 * 把用户输入过的值进行保存,下次输入的时候可以使用历史记录进行输入.历史数据会保存在localStorage中,key和props.name对应
 *
 * @example
 *
 * <HistoryTextInputPicker
 *    name="abc"
 *    value={this.state.HistoryTextInputPicker}
 *    onChange={event=>{
 *		this.setState(update(this.state,{HistoryTextInputPicker:{$set:event.target.value}}));
 *	}}/>
 *
 * */
export default class HistoryTextInputPicker extends BaseComponent {
	/**
	 * @property {Number} maxHistory [5] - 最多可以保存的历史数据的数量
	 * @property {String} name - 用于保存历史数据的key值
	 * */
	static propTypes = {
		maxHistory: PropTypes.number,
		name: PropTypes.string.isRequired,
	};

	static defaultProps = {
		maxHistory: 5,
	};

	constructor(props) {
		super(props);
		let initialData = [];
		const oldDataValue = window.localStorage.getItem(this.key);
		if (oldDataValue) {
			try {
				initialData = JSON.parse(oldDataValue);
			}
			catch (ex) {
				console.log(`parse history data error . key=${this.key}`, ex.message);
			}
		}
		this.state = {
			data: initialData,
		};
	}

	get key() {
		return `historytextinputpick:${this.props.name}`;
	}

	buildNewData(value) {
		const index = this.state.data.findIndex(f=>f === value);
		let data;
		if (index < 0) {
			if (value !== '') {
				data = [value, ...this.state.data];
			}
		}
		else {
			data = [value, ...this.state.data];
			data.splice(index + 1, 1);
		}
		if (data) {
			this.updateState({
				data: {$set: data.slice(0, this.props.maxHistory)}
			}, ()=> {
				window.localStorage.setItem(this.key, JSON.stringify(this.state.data));
			});
		}
	}

	render() {
		let inputProps = Object.assign({}, this.props, {
			onBlur: (event)=> {
				this.props.onBlur && this.props.onBlur(event);
				this.buildNewData(event.target.value);
			}
		});
		delete inputProps.maxHistory;
		return (
			<Picker ref="picker" {...inputProps}>
				<div
					className="history-text-input-picker">
					{this.state.data.map((item, index)=> {
						return (
							<a
								onClick={(event)=>{
									//emit onChange
									const {picker}=this.refs;
									picker.change(item);
									picker.focus();
								}}
								href="javascript:void(0)"
								key={index}>{item}</a>
						);
					})}
				</div>
			</Picker>
		);
	}

}
