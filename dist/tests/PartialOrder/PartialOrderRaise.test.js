"use strict";

var _PartialOrder = _interopRequireDefault(require("../../PartialOrder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('PartialOrder raiseItem', function () {
  var testOrder = ['T', 'L', ['M', 'P'], 'A', ['C', 'R', 'Z']];
  it('returns given order when key not found', function () {
    var order = _PartialOrder.default.raiseItem(testOrder, 'X');

    expect(order).toEqual(testOrder);
  });
  it('returns given order when key not in a group', function () {
    var order = _PartialOrder.default.raiseItem(testOrder, 'A');

    expect(order).toEqual(testOrder);
  });
  it('raises item from middle of a group', function () {
    var order = _PartialOrder.default.raiseItem(testOrder, 'R');

    expect(order).toEqual(['T', 'L', ['M', 'P'], 'A', 'R', ['C', 'Z']]);
  });
  it('raises item from first of a group', function () {
    var order = _PartialOrder.default.raiseItem(testOrder, 'C');

    expect(order).toEqual(['T', 'L', ['M', 'P'], 'A', 'C', ['R', 'Z']]);
  });
  it('raises item from last of a group', function () {
    var order = _PartialOrder.default.raiseItem(testOrder, 'Z');

    expect(order).toEqual(['T', 'L', ['M', 'P'], 'A', 'Z', ['C', 'R']]);
  });
  it('disolves group when second to last item raised from group', function () {
    var order = _PartialOrder.default.raiseItem(testOrder, 'P');

    expect(order).toEqual(['T', 'L', 'P', 'M', 'A', ['C', 'R', 'Z']]);
  });
  it('returns an empty order given an empty order', function () {
    expect(_PartialOrder.default.raiseItem([], 'A')).toEqual([]);
  });
});