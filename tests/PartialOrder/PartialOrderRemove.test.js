"use strict";

var _PartialOrder = _interopRequireDefault(require("../../PartialOrder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('PartialOrder removeItem', function () {
  var testOrder = ['T', 'L', ['M', 'P'], 'A', ['C', 'R', 'Z']];
  it('returns given order when key not found', function () {
    var order = _PartialOrder.default.removeItem(testOrder, 'X');

    expect(order).toEqual(testOrder);
  });
  it('removes item found by itself', function () {
    var order = _PartialOrder.default.removeItem(testOrder, 'L');

    expect(order).toEqual(['T', ['M', 'P'], 'A', ['C', 'R', 'Z']]);
  });
  it('removes first item', function () {
    var order = _PartialOrder.default.removeItem(testOrder, 'T');

    expect(order).toEqual(['L', ['M', 'P'], 'A', ['C', 'R', 'Z']]);
  });
  it('removes item from middle of a group', function () {
    var order = _PartialOrder.default.removeItem(testOrder, 'R');

    expect(order).toEqual(['T', 'L', ['M', 'P'], 'A', ['C', 'Z']]);
  });
  it('removes item from first of a group', function () {
    var order = _PartialOrder.default.removeItem(testOrder, 'C');

    expect(order).toEqual(['T', 'L', ['M', 'P'], 'A', ['R', 'Z']]);
  });
  it('removes item from last of a group', function () {
    var order = _PartialOrder.default.removeItem(testOrder, 'Z');

    expect(order).toEqual(['T', 'L', ['M', 'P'], 'A', ['C', 'R']]);
  });
  it('disolves group when second to last item removed from group', function () {
    var order = _PartialOrder.default.removeItem(testOrder, 'P');

    expect(order).toEqual(['T', 'L', 'M', 'A', ['C', 'R', 'Z']]);
  });
  it('leaves groups intact when item in-between removed', function () {
    var order = _PartialOrder.default.removeItem(testOrder, 'A');

    expect(order).toEqual(['T', 'L', ['M', 'P'], ['C', 'R', 'Z']]);
  });
  it('returns an empty order given an empty order', function () {
    expect(_PartialOrder.default.removeItem([], 'A')).toEqual([]);
  });
});