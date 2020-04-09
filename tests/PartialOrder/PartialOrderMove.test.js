"use strict";

var _PartialOrder = _interopRequireDefault(require("../../PartialOrder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('PartialOrder moveItem', function () {
  var testOrder = ['T', 'L', ['M', 'P'], 'A', ['C', 'R', 'Z']];
  it('returns given order when key to be moved not found', function () {
    var order = _PartialOrder.default.moveItem(testOrder, 'X', 'A', true);

    expect(order).toEqual(testOrder);
  });
  it('returns given order when new lacation key is not found', function () {
    var order = _PartialOrder.default.moveItem(testOrder, 'A', 'X', true);

    expect(order).toEqual(testOrder);
  });
  it('moves item before another', function () {
    var order = _PartialOrder.default.moveItem(testOrder, 'T', 'A', true);

    expect(order).toEqual(['L', ['M', 'P'], 'T', 'A', ['C', 'R', 'Z']]);
  });
  it('moves item after another', function () {
    var order = _PartialOrder.default.moveItem(testOrder, 'T', 'A', false);

    expect(order).toEqual(['L', ['M', 'P'], 'A', 'T', ['C', 'R', 'Z']]);
  });
  it('moves item to first in a group', function () {
    var order = _PartialOrder.default.moveItem(testOrder, 'T', 'M', true);

    expect(order).toEqual(['L', ['T', 'M', 'P'], 'A', ['C', 'R', 'Z']]);
  });
  it('moves item to last in a group', function () {
    var order = _PartialOrder.default.moveItem(testOrder, 'T', 'P', false);

    expect(order).toEqual(['L', ['M', 'P', 'T'], 'A', ['C', 'R', 'Z']]);
  });
  it('moves item to before a group', function () {
    var order = _PartialOrder.default.moveItem(testOrder, 'T', 'L', false);

    expect(order).toEqual(['L', 'T', ['M', 'P'], 'A', ['C', 'R', 'Z']]);
  });
  it('leaves item in place if "moved" to current place', function () {
    var order = _PartialOrder.default.moveItem(testOrder, 'T', 'L', true);

    expect(order).toEqual(testOrder);
  });
  it('moves item from middle of a group', function () {
    var order = _PartialOrder.default.moveItem(testOrder, 'R', 'L', true);

    expect(order).toEqual(['T', 'R', 'L', ['M', 'P'], 'A', ['C', 'Z']]);
  });
  it('moves item from first of a group', function () {
    var order = _PartialOrder.default.moveItem(testOrder, 'C', 'L', true);

    expect(order).toEqual(['T', 'C', 'L', ['M', 'P'], 'A', ['R', 'Z']]);
  });
  it('moves item from last of a group', function () {
    var order = _PartialOrder.default.moveItem(testOrder, 'Z', 'L', true);

    expect(order).toEqual(['T', 'Z', 'L', ['M', 'P'], 'A', ['C', 'R']]);
  });
  it('disolves group when second to last item moved from group', function () {
    var order = _PartialOrder.default.moveItem(testOrder, 'P', 'A', true);

    expect(order).toEqual(['T', 'L', 'M', 'P', 'A', ['C', 'R', 'Z']]);
  });
  it('returns an empty order given an empty order', function () {
    expect(_PartialOrder.default.moveItem([], 'A', 'B', true)).toEqual([]);
  });
});