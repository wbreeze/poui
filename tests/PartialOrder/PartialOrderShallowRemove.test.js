"use strict";

var _PartialOrder = _interopRequireDefault(require("../../PartialOrder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('PartialOrder shallowRemoveItem', function () {
  it('removes first item from three', function () {
    expect(_PartialOrder.default.shallowRemoveItem(['A', 'B', 'C'], 0)).toEqual(['B', 'C']);
  });
  it('removes second item from three', function () {
    expect(_PartialOrder.default.shallowRemoveItem(['A', 'B', 'C'], 1)).toEqual(['A', 'C']);
  });
  it('removes third item from three', function () {
    expect(_PartialOrder.default.shallowRemoveItem(['A', 'B', 'C'], 2)).toEqual(['A', 'B']);
  });
  it('flattens when item is first of two', function () {
    expect(_PartialOrder.default.shallowRemoveItem(['A', 'B'], 0)).toEqual('B');
  });
  it('flattens when item is second of two', function () {
    expect(_PartialOrder.default.shallowRemoveItem(['A', 'B'], 1)).toEqual('A');
  });
});