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
 *	 style={{width:200}}
 *	 value={this.state.selectedCascadeData.map(f=>f.text).join(' -> ')}
 *	 onKeyDown={event=>{
 *		if (event.keyCode === 8) {
 *			this.setState(
 *				update(this.state,{
 *					selectedCascadeData:{$set:this.state.selectedCascadeData.slice(0,this.state.selectedCascadeData.length-1)},
 *					CascadePickerData:{$set:[...this.originalCascadePickerData]}
 *				})
 *			);
 *		}
 *	}}>
 *	 <ul>
 *	 {this.state.CascadePickerData.map((item, index)=> {
 *		 return (
 *			 <li
 *				 key={index}
 *				 onClick={()=>{
 *					 let lastSelected;
 *					 if(this.state.selectedCascadeData.length>0){
 *						 lastSelected=this.state.selectedCascadeData[this.state.selectedCascadeData.length-1];
 *					 }
 *					 let newState=Object.assign({},this.state);
 *					 if(!lastSelected || lastSelected.text!==item.text){
 *						 newState=update(newState,{
 *						 selectedCascadeData:{$push:[item]},
 *					 });
 *					 }
 *					 if(item.children){
 *						 newState=update(newState,{
 *							 CascadePickerData:{$set:item.children}
 *						 });
 *					 }
 *					 this.setState(newState);
 *				 }}>{item.text}</li>
 *		 );
 *	 })}
 *	 </ul>
 *	 </DataPicker>
 *
 * */
export default class DataPicker extends BaseComponent {
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
		delete inputProps.children;

		return (
			<Picker ref="picker" {...inputProps}>
				<div>
					{React.Children.only(this.props.children)}
				</div>
			</Picker>
		);
	}
}
