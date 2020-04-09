"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _PartoWithSelection = _interopRequireDefault(require("./components/PartoWithSelection"));

require("./Poui.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Poui(props) {
  return /*#__PURE__*/_react.default.createElement(_PartoWithSelection.default, props);
}

var _default = Poui;
exports.default = _default;