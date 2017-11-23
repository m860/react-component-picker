import './sass/test.sass'
import './sass/picker.sass'
import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import HistoryTextInputPicker from './components/HistoryTextInputPicker'
import update from 'immutability-helper'

class Example extends Component {
	constructor(props) {
		super(props);
		this.state = {
			HistoryTextInputPicker: ''
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