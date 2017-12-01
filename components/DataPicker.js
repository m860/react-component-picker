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
var DataPicker = function (_BaseComponent) {
  (0, _inherits3.default)(DataPicker, _BaseComponent);

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
      delete inputProps.children;

      return _react2.default.createElement(
        _Picker2.default,
        (0, _extends3.default)({ ref: 'picker' }, inputProps),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.Children.only(this.props.children)
        )
      );
    }
  }]);
  return DataPicker;
}(_BaseComponent3.default);

exports.default = DataPicker;