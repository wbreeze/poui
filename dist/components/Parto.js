"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Item = _interopRequireDefault(require("./Item"));

var _PartialOrder = _interopRequireDefault(require("../PartialOrder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Parto = /*#__PURE__*/function (_React$Component) {
  _inherits(Parto, _React$Component);

  var _super = _createSuper(Parto);

  function Parto(props) {
    _classCallCheck(this, Parto);

    return _super.call(this, props);
  }

  _createClass(Parto, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.parto !== this.props.parto;
    }
  }, {
    key: "orderedItems",
    value: function orderedItems() {
      return _PartialOrder.default.arrangeItemsPerOrder(this.props.itemList, this.props.parto);
    }
  }, {
    key: "renderItem",
    value: function renderItem(item, onClickEvent) {
      return /*#__PURE__*/_react.default.createElement(_Item.default, {
        key: item.key,
        itemKey: item.key,
        onClickEvent: onClickEvent
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "poui-parto-item"
      }, " ", item.description, " "));
    }
  }, {
    key: "renderedItemsKey",
    value: function renderedItemsKey(items) {
      var _this = this;

      return items.map(function (i) {
        return Array.isArray(i) ? "-" + _this.renderedItemsKey(i) + "-" : i.key;
      }).join("-");
    }
  }, {
    key: "renderedItemsUL",
    value: function renderedItemsUL(items) {
      return /*#__PURE__*/_react.default.createElement("li", {
        key: this.renderedItemsKey(items)
      }, /*#__PURE__*/_react.default.createElement("ul", {
        className: "poui-parto-ul"
      }, this.renderedItems(items, this.props.unorderedItemClick)));
    }
  }, {
    key: "renderedItems",
    value: function renderedItems(items, onClickEvent) {
      var _this2 = this;

      return items.map(function (item) {
        if (Array.isArray(item)) {
          return _this2.renderedItemsUL(item);
        } else {
          return _this2.renderItem(item, onClickEvent);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var ordered = this.orderedItems();
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "poui-parto"
      }, /*#__PURE__*/_react.default.createElement("ol", {
        className: "poui-parto-ol"
      }, this.renderedItems(ordered, this.props.orderedItemClick)));
    }
  }]);

  return Parto;
}(_react.default.Component);

_defineProperty(Parto, "defaultProps", {
  orderedItemClick: function orderedItemClick() {},
  unorderedItemClick: function unorderedItemClick() {},
  itemReorder: function itemReorder() {}
});

_defineProperty(Parto, "propTypes", {
  itemList: _propTypes.default.array.isRequired,
  parto: _propTypes.default.array.isRequired,
  orderedItemClick: _propTypes.default.func,
  unorderedItemClick: _propTypes.default.func,
  itemReorder: _propTypes.default.func
});

var _default = Parto;
exports.default = _default;