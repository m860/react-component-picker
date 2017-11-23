import './sass/test.sass'
import './sass/picker.sass'
import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import TestComponent from './components/TestComponent'
import Picker from './components/Picker'

class Example extends Component {
	render() {
		return (
			<div>
				<form>
					<div>
						<label>Name</label>
						<input/>
					</div>
					<div>
						<label>Picker</label>
						<Picker>
							<div>abc</div>
						</Picker>
					</div>
					<div>
						<label>Name</label>
						<input/>
					</div>
				</form>

			</div>
		);
	}
}

ReactDOM.render(
	<Example></Example>
	, document.getElementById("view"));