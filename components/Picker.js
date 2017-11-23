'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BaseComponent2 = require('./BaseComponent');

var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTriggerChange = require('react-trigger-change');

var _reactTriggerChange2 = _interopRequireDefault(_reactTriggerChange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Picker = function (_BaseComponent) {
	(0, _inherits3.default)(Picker, _BaseComponent);

	function Picker(props) {
		(0, _classCallCheck3.default)(this, Picker);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Picker.__proto__ || (0, _getPrototypeOf2.default)(Picker)).call(this, props));

		_this.state = {
			width: null,
			height: null
		};
		return _this;
	}

	(0, _createClass3.default)(Picker, [{
		key: 'triggerChange',
		value: function triggerChange(value) {
			var input = this.refs.input;

			input.value = value;
			(0, _reactTriggerChange2.default)(input);
		}
	}, {
		key: 'render',
		value: function render() {
			var pickerStyle = {};
			if (this.state.width) {
				pickerStyle.width = this.state.width;
			}
			if (this.state.height) {
				pickerStyle.minHeight = this.state.height;
			}
			return _react2.default.createElement(
				'div',
				{
					onMouseLeave: this.props.onMouseLeave,
					onMouseEnter: this.props.onMouseEnter,
					className: 'picker',
					style: pickerStyle },
				_react2.default.createElement(
					'div',
					{ className: 'picker-wrapper', style: { zIndex: this.state.showData ? 999 : 'auto' } },
					_react2.default.createElement(
						'div',
						{ className: 'picker-input' },
						_react2.default.createElement('input', (0, _extends3.default)({ ref: 'input' }, this.props.inputProps))
					),
					_react2.default.createElement(
						'div',
						{ className: 'picker-data', style: { display: this.props.pickerVisible ? '' : 'none' } },
						_react2.default.Children.only(this.props.children)
					)
				)
			);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			(0, _get3.default)(Picker.prototype.__proto__ || (0, _getPrototypeOf2.default)(Picker.prototype), 'componentDidMount', this).call(this);
			var input = this.refs.input;

			if (input) {
				var computedStyle = window.getComputedStyle(input);
				var width = parseFloat(computedStyle.width);
				var height = parseFloat(computedStyle.height);
				var newState = {};
				if (!isNaN(width)) {
					newState.width = { $set: width };
				}
				if (!isNaN(height)) {
					newState.height = { $set: height };
				}
				this.updateState(newState);
			}
		}
	}]);
	return Picker;
}(_BaseComponent3.default);

Picker.propTypes = {
	pickerVisible: _propTypes2.default.bool,
	inputProps: _propTypes2.default.object,
	onMouseEnter: _propTypes2.default.func,
	onMouseLeave: _propTypes2.default.func
};
Picker.defaultProps = {
	pickerVisible: false,
	inputProps: {}
};
exports.default = Picker;