'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Base = function (_PureComponent) {
	(0, _inherits3.default)(Base, _PureComponent);

	function Base(props) {
		(0, _classCallCheck3.default)(this, Base);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Base.__proto__ || (0, _getPrototypeOf2.default)(Base)).call(this, props));

		_this._mounted = false;
		return _this;
	}

	(0, _createClass3.default)(Base, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this._mounted = true;
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this._mounted = false;
		}
	}, {
		key: 'setState2',
		value: function setState2(state, callback) {
			if (this._mounted) {
				this.setState(state, callback);
			}
		}
	}, {
		key: 'updateState',
		value: function updateState(state, callback) {
			var newState = (0, _immutabilityHelper2.default)(this.state, state);
			this.setState2(newState, callback);
		}
	}]);
	return Base;
}(_react.PureComponent);

exports.default = Base;