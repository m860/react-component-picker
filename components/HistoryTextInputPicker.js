'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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
var HistoryTextInputPicker = function (_BaseComponent) {
	(0, _inherits3.default)(HistoryTextInputPicker, _BaseComponent);

	/**
  * @property {Number} maxHistory [5] - 最多可以保存的历史数据的数量
  * @property {String} name - 用于保存历史数据的key值
  * */
	function HistoryTextInputPicker(props) {
		(0, _classCallCheck3.default)(this, HistoryTextInputPicker);

		var _this = (0, _possibleConstructorReturn3.default)(this, (HistoryTextInputPicker.__proto__ || (0, _getPrototypeOf2.default)(HistoryTextInputPicker)).call(this, props));

		var initialData = [];
		var oldDataValue = window.localStorage.getItem(_this.key);
		if (oldDataValue) {
			try {
				initialData = JSON.parse(oldDataValue);
			} catch (ex) {
				console.log('parse history data error . key=' + _this.key, ex.message);
			}
		}
		_this.state = {
			data: initialData
		};
		return _this;
	}

	(0, _createClass3.default)(HistoryTextInputPicker, [{
		key: 'buildNewData',
		value: function buildNewData(value) {
			var _this2 = this;

			var index = this.state.data.findIndex(function (f) {
				return f === value;
			});
			var data = void 0;
			if (index < 0) {
				if (value !== '') {
					data = [value].concat((0, _toConsumableArray3.default)(this.state.data));
				}
			} else {
				data = [value].concat((0, _toConsumableArray3.default)(this.state.data));
				data.splice(index + 1, 1);
			}
			if (data) {
				this.updateState({
					data: { $set: data.slice(0, this.props.maxHistory) }
				}, function () {
					window.localStorage.setItem(_this2.key, (0, _stringify2.default)(_this2.state.data));
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var inputProps = (0, _assign2.default)({}, this.props, {
				onBlur: function onBlur(event) {
					_this3.props.onBlur && _this3.props.onBlur(event);
					_this3.buildNewData(event.target.value);
				}
			});
			delete inputProps.maxHistory;
			return _react2.default.createElement(
				_Picker2.default,
				(0, _extends3.default)({ ref: 'picker' }, inputProps),
				_react2.default.createElement(
					'div',
					{
						className: 'history-text-input-picker' },
					this.state.data.map(function (item, index) {
						return _react2.default.createElement(
							'a',
							{
								onClick: function onClick(event) {
									//emit onChange
									var picker = _this3.refs.picker;

									picker.change(item);
									picker.focus();
								},
								href: 'javascript:void(0)',
								key: index },
							item
						);
					})
				)
			);
		}
	}, {
		key: 'key',
		get: function get() {
			return 'historytextinputpick:' + this.props.name;
		}
	}]);
	return HistoryTextInputPicker;
}(_BaseComponent3.default);

HistoryTextInputPicker.propTypes = {
	maxHistory: _propTypes2.default.number,
	name: _propTypes2.default.string.isRequired
};
HistoryTextInputPicker.defaultProps = {
	maxHistory: 5
};
exports.default = HistoryTextInputPicker;