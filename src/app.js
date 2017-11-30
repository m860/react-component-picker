import './sass/picker.sass'
import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import HistoryTextInputPicker from './components/HistoryTextInputPicker'
import update from 'immutability-helper'
import DataPicker from './components/DataPicker'

class Example extends Component {
	constructor(props) {
		super(props);
		this.originalCascadePickerData = [{
			text: "level-1",
			children: [{
				text: 'level-1-1',
				children: [{
					text: 'level-1-1-1',
				}, {
					text: 'level-1-1-2',
				}, {
					text: 'level-1-1-3',
				}, {
					text: 'level-1-1-4',
				}]
			}, {
				text: 'level-1-2',
			}]
		}, {
			text: "level-2"
		}, {
			text: "level-3"
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
						<label>DataPicker</label>
						<DataPicker
							style={{width:200}}
							value={this.state.selectedCascadeData.map(f=>f.text).join(' -> ')}
							onKeyDown={event=>{
								if (event.keyCode === 8) {
									this.setState(
										update(this.state,{
											selectedCascadeData:{$set:this.state.selectedCascadeData.slice(0,this.state.selectedCascadeData.length-1)},
											CascadePickerData:{$set:[...this.originalCascadePickerData]}
										})
									);
								}
							}}>
							<ul>
								{this.state.CascadePickerData.map((item, index)=> {
									return (
										<li
											key={index}
											onClick={()=>{
												let lastSelected;
												if(this.state.selectedCascadeData.length>0){
													lastSelected=this.state.selectedCascadeData[this.state.selectedCascadeData.length-1];
												}
												let newState=Object.assign({},this.state);
												if(!lastSelected || lastSelected.text!==item.text){
													newState=update(newState,{
													selectedCascadeData:{$push:[item]},
												});
												}
												if(item.children){
													newState=update(newState,{
														CascadePickerData:{$set:item.children}
													});
												}
												this.setState(newState);
											}}>{item.text}</li>
									);
								})}
							</ul>
						</DataPicker>
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