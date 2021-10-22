"use strict";

var _PartialOrder = _interopRequireDefault(require("../../PartialOrder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("PartialOrder extractItem", function () {
  it('returns key and the rest in an array', function () {
    expect(_PartialOrder.default.extractItem(['A', 'B', 'C'], 'A')).toEqual(['A', ['B', 'C']]);
  });
  it('original embedded in array if key not found', function () {
    expect(_PartialOrder.default.extractItem(['A', 'B', 'C'], 'D')).toEqual([['A', 'B', 'C']]);
  });
});