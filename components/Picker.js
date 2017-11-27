'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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
			height: null,
			focus: false,
			hover: false
		};
		_this.visible = false;
		return _this;
	}

	(0, _createClass3.default)(Picker, [{
		key: 'change',
		value: function change(value) {
			var input = this.refs.input;

			input.value = value;
			(0, _reactTriggerChange2.default)(input);
		}
	}, {
		key: 'focus',
		value: function focus() {
			var input = this.refs.input;

			input.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var pickerStyle = {};
			if (this.state.width) {
				pickerStyle.width = this.state.width;
			}
			if (this.state.height) {
				pickerStyle.minHeight = this.state.height;
			}
			var inputProps = (0, _assign2.default)({}, this.props, {
				onFocus: function onFocus(event) {
					_this2.props.onFocus && _this2.props.onFocus(event);
					_this2.updateState({ focus: { $set: true } });
				},
				onBlur: function onBlur(event) {
					_this2.props.onBlur && _this2.props.onBlur(event);
					_this2.updateState({ focus: { $set: false } });
				}
			});
			delete inputProps.children;

			var visible = this.visible;
			if (this.visible) {
				if (!this.state.hover && !this.state.focus) {
					visible = false;
				}
			} else {
				if (this.state.focus) {
					visible = true;
				}
			}
			this.visible = visible;

			return _react2.default.createElement(
				'div',
				{
					onMouseLeave: function onMouseLeave() {
						return _this2.updateState({ hover: { $set: false } });
					},
					onMouseEnter: function onMouseEnter() {
						return _this2.updateState({ hover: { $set: true } });
					},
					className: 'picker',
					style: pickerStyle },
				_react2.default.createElement(
					'div',
					{ className: 'picker-wrapper', style: { zIndex: visible ? 999 : 'auto' } },
					_react2.default.createElement(
						'div',
						{ className: 'picker-input' },
						_react2.default.createElement('input', (0, _extends3.default)({ ref: 'input' }, inputProps))
					),
					_react2.default.createElement(
						'div',
						{ className: 'picker-data', style: { display: visible ? '' : 'none' } },
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

exports.default = Picker;