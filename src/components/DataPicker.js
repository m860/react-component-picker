import React from "react";
import BaseComponent from './BaseComponent'
import PropTypes from 'prop-types'
import Picker from './Picker'

/**
 * DataPicker
 *
 * 可以实现各种复杂的Picker
 *
 * @example
 *
 * <DataPicker
 *    value={this.state.selectedCascadeData.map(f=>f.text).join(' -> ')}
 *    onChange={(action,dataItem)=>{
 *		if(action==='select'){
 *			let lastSelected;
 *			if(this.state.selectedCascadeData.length>0){
 *				lastSelected=this.state.selectedCascadeData[this.state.selectedCascadeData.length-1];
 *			}
 *			let newState=Object.assign({},this.state);
 *			if(!lastSelected || lastSelected.text!==dataItem.text){
 *				newState=update(newState,{
 *				selectedCascadeData:{$push:[dataItem]},
 *			});
 *			}
 *			if(dataItem.children){
 *				newState=update(newState,{
 *					CascadePickerData:{$set:dataItem.children}
 *				});
 *			}
 *			this.setState(newState);
 *		}
 *		if(action==='delete'){
 *			this.setState(
 *				update(this.state,{
 *					selectedCascadeData:{$set:this.state.selectedCascadeData.slice(0,this.state.selectedCascadeData.length-1)},
 *					CascadePickerData:{$set:[...this.originalCascadePickerData]}
 *				})
 *			);
 *		}
 *	}}>
 *     {(select)=> {
 *		 return (
 *			 <ul>
 *				 {this.state.CascadePickerData.map((item, index)=> {
 *					 return (
 *						 <li key={index} onClick={()=>{
 *							 select(item);
 *						 }}>{item.text}</li>
 *					 );
 *				 })}
 *			 </ul>
 *		 );
 *	 }}
 *     </DataPicker>
 *
 * */
export default class DataPicker extends BaseComponent {
	/**
	 * @property {Object} option
	 * @property {Object} option.filter
	 * @property {Boolean} option.filter.show [false]
	 * @property {Function} option.filter.onChange [()=>null]
	 * @property {Function} children - (select)=>null
	 * */
	static propTypes = {
		option: PropTypes.shape({
			filter: PropTypes.shape({
				show: PropTypes.bool,
				onChange: PropTypes.func
			})
		}),
		children: PropTypes.func.isRequired
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
	 * @private
	 * */
	select(data) {
		if (this.props.onChange) {
			this.props.onChange('select', data);
		}
		const {picker}=this.refs;
		picker.focus();
	}


	render() {
		let inputProps = Object.assign({}, this.props, {
			onKeyDown: event=> {
				this.props.onKeyDown && this.props.onKeyDown(event);
				if (event.keyCode === 8) {
					this.props.onChange && this.props.onChange('delete');
				}
			}
		});
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
				<div
					className="cascade-picker">
					<div className="filter" style={{display:filterOption.show?'':'none'}}>
						<input type="text" placeholder="filter" onChange={filterOption.onChange}/>
					</div>
					<div className="content">
						{this.props.children(this.select.bind(this))}
					</div>
				</div>
			</Picker>
		);
	}

}
