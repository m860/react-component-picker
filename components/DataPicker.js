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

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BaseComponent2 = require('./BaseComponent');

var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Picker = require('./Picker');

var _Picker2 = _interopRequireDefault(_Picker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * DataPicker
 *
 * 可以实现各种复杂的Picker
 *
 * */
var DataPicker = function (_BaseComponent) {
	(0, _inherits3.default)(DataPicker, _BaseComponent);

	/**
  * @property {Object} option
  * @property {Object} option.filter
  * @property {Boolean} option.filter.show [false]
  * @property {Function} option.filter.onChange [()=>null]
  * */
	function DataPicker(props) {
		(0, _classCallCheck3.default)(this, DataPicker);

		var _this = (0, _possibleConstructorReturn3.default)(this, (DataPicker.__proto__ || (0, _getPrototypeOf2.default)(DataPicker)).call(this, props));

		_this.state = {};
		return _this;
	}

	/**
  * @method
  * get picker instance
  * */


	(0, _createClass3.default)(DataPicker, [{
		key: 'getPickerInstance',
		value: function getPickerInstance() {
			return this.refs['picker'];
		}
	}, {
		key: 'render',
		value: function render() {
			var inputProps = (0, _assign2.default)({}, this.props);
			delete inputProps.option;
			delete inputProps.children;
			delete inputProps.onChange;

			var filterOption = {
				show: false,
				onChange: function onChange() {
					return null;
				}
			};
			if (this.props.option) {
				if (this.props.option.filter) {
					filterOption = (0, _assign2.default)(filterOption, this.props.option.filter);
				}
			}
			return _react2.default.createElement(
				_Picker2.default,
				(0, _extends3.default)({ ref: 'picker' }, inputProps),
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'div',
						{ style: { display: filterOption.show ? '' : 'none' } },
						_react2.default.createElement('input', { type: 'text', placeholder: 'filter', onChange: filterOption.onChange })
					),
					_react2.default.createElement(
						'div',
						null,
						_react2.default.Children.only(this.props.children)
					)
				)
			);
		}
	}]);
	return DataPicker;
}(_BaseComponent3.default);

DataPicker.propTypes = {
	option: _propTypes2.default.shape({
		filter: _propTypes2.default.shape({
			show: _propTypes2.default.bool,
			onChange: _propTypes2.default.func
		})
	})
};
DataPicker.defaultProps = {
	option: {
		filter: {
			show: false,
			onChange: function onChange() {
				return null;
			}
		}
	}
};
exports.default = DataPicker;