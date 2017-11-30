'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DataPickerActions = undefined;

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
 * </DataPicker>
 *
 * */
var DataPicker = function (_BaseComponent) {
	(0, _inherits3.default)(DataPicker, _BaseComponent);

	/**
  * @property {Object} option
  * @property {Object} option.filter
  * @property {Boolean} option.filter.show [false]
  * @property {Function} option.filter.onChange [()=>null]
  * @property {Function} children - (select)=>null
  * */
	function DataPicker(props) {
		(0, _classCallCheck3.default)(this, DataPicker);

		var _this = (0, _possibleConstructorReturn3.default)(this, (DataPicker.__proto__ || (0, _getPrototypeOf2.default)(DataPicker)).call(this, props));

		_this.state = {};
		return _this;
	}

	/**
  * @private
  * */


	(0, _createClass3.default)(DataPicker, [{
		key: 'select',
		value: function select(data) {
			if (this.props.onChange) {
				this.props.onChange(DataPickerActions.select, data);
			}
			var picker = this.refs.picker;

			picker.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var inputProps = (0, _assign2.default)({}, this.props, {
				onKeyDown: function onKeyDown(event) {
					_this2.props.onKeyDown && _this2.props.onKeyDown(event);
					if (event.keyCode === 8) {
						_this2.props.onChange && _this2.props.onChange(DataPickerActions.delete);
					}
				}
			});
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
					{
						className: 'cascade-picker' },
					_react2.default.createElement(
						'div',
						{ className: 'filter', style: { display: filterOption.show ? '' : 'none' } },
						_react2.default.createElement('input', { type: 'text', placeholder: 'filter', onChange: filterOption.onChange })
					),
					_react2.default.createElement(
						'div',
						{ className: 'content' },
						this.props.children(this.select.bind(this))
					)
				)
			);
		}
	}]);
	return DataPicker;
}(_BaseComponent3.default);

/**
 * DataPickerActions
 * */


DataPicker.propTypes = {
	option: _propTypes2.default.shape({
		filter: _propTypes2.default.shape({
			show: _propTypes2.default.bool,
			onChange: _propTypes2.default.func
		})
	}),
	children: _propTypes2.default.func.isRequired
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
var DataPickerActions = exports.DataPickerActions = {
	select: "select",
	delete: "delete"
};