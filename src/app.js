import './sass/test.sass'
import './sass/picker.sass'
import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import HistoryTextInputPicker from './components/HistoryTextInputPicker'
import update from 'immutability-helper'
import CascadePicker from './components/CascadePicker'

class Example extends Component {
	constructor(props) {
		super(props);
		this.originalCascadePickerData = [{
			text: "四川省",
			value: 1,
			children: [{
				text: '成都市',
				value: 1,
				children: [{
					text: '高新区',
					value: 1
				}, {
					text: '靖江区',
					value: 2
				}]
			}, {
				text: '绵阳市',
				value: 2
			}]
		}]
		this.state = {
			HistoryTextInputPicker: '',
			CascadePickerData: [...this.originalCascadePickerData],
			selectedCascadeData: []
		};
	}

	render() {
		return (
			<div>
				<form>
					<div>
						<label>Name</label>
						<input/>
					</div>
					<div>
						<label>HistoryTextInputPicker</label>
						<HistoryTextInputPicker
							name="abc"
							value={this.state.HistoryTextInputPicker}
							onChange={event=>{
								this.setState(update(this.state,{HistoryTextInputPicker:{$set:event.target.value}}));
							}}/>
					</div>
					<div>
						<label>CascadePicker</label>
						<CascadePicker
							value={this.state.selectedCascadeData.map(f=>f.text).join(' -> ')}
							onChange={(action,dataItem)=>{
								if(action==='push'){
									let lastSelected;
									if(this.state.selectedCascadeData.length>0){
										lastSelected=this.state.selectedCascadeData[this.state.selectedCascadeData.length-1];
									}
									let newState=Object.assign({},this.state);
									if(!lastSelected || lastSelected.text!==dataItem.text){
										newState=update(newState,{
										selectedCascadeData:{$push:[dataItem]},
									});
									}
									if(dataItem.children){
										newState=update(newState,{
											CascadePickerData:{$set:dataItem.children}
										});
									}
									this.setState(newState);
								}
								if(action==='pop'){
									this.setState(
										update(this.state,{
											selectedCascadeData:{$set:this.state.selectedCascadeData.slice(0,this.state.selectedCascadeData.length-1)},
											CascadePickerData:{$set:[...this.originalCascadePickerData]}
										})
									);
								}
							}}>
							{(next)=> {
								return (
									<ul>
										{this.state.CascadePickerData.map((item, index)=> {
											return (
												<li key={index} onClick={()=>{
													next(item);
												}}>{item.text}</li>
											);
										})}
									</ul>
								);
							}}
						</CascadePicker>
					</div>
					<div>
						<label>Name</label>
						<input/>
					</div>
				</form>
				<span>{JSON.stringify(this.state)}</span>
			</div>
		);
	}
}

ReactDOM.render(
	<Example></Example>
	, document.getElementById("view"));