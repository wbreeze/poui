"use strict";

var _PartialOrder = _interopRequireDefault(require("../../PartialOrder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('PartialOrder lowerItem', function () {
  var testOrder = ['T', 'L', ['M', 'P'], 'A', 'R'];
  it('lowers an item into a group', function () {
    var order = _PartialOrder.default.lowerItem(testOrder, 'L');

    expect(order).toEqual(['T', ['L', 'M', 'P'], 'A', 'R']);
  });
  it('lowers an item to join with following item', function () {
    var order = _PartialOrder.default.lowerItem(testOrder, 'A');

    expect(order).toEqual(['T', 'L', ['M', 'P'], ['A', 'R']]);
  });
  it('does not lower item already in a group', function () {
    var order = _PartialOrder.default.lowerItem(testOrder, 'M');

    expect(order).toEqual(testOrder);
  });
  it('does not lower item by itself at the end', function () {
    var order = _PartialOrder.default.lowerItem(testOrder, 'R');

    expect(order).toEqual(testOrder);
  });
  it('returns an empty order given an empty order', function () {
    expect(_PartialOrder.default.lowerItem([], 'A')).toEqual([]);
  });
});