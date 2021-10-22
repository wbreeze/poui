"use strict";

var _PartialOrder = _interopRequireDefault(require("../../PartialOrder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('PartialOrder flatten', function () {
  var testOrder = ['T', 'L', ['M', 'P'], 'A', ['C', 'R', 'Z']];
  var flatOrder = ['T', 'L', 'M', 'P', 'A', 'C', 'R', 'Z'];
  it('returns given order when already flat', function () {
    var order = _PartialOrder.default.flatten(flatOrder);

    expect(order).toEqual(flatOrder);
  });
  it('expands embedded groups', function () {
    var order = _PartialOrder.default.flatten(testOrder);

    expect(order).toEqual(flatOrder);
  });
  it('removes double grouping', function () {
    var doubledOrder = [['T'], ['L'], [['M', 'P']], ['A'], [['C', 'R', 'Z']]];
    expect(_PartialOrder.default.flatten(doubledOrder)).toEqual(testOrder);
  });
  it('returns an empty order given an empty order', function () {
    expect(_PartialOrder.default.flatten([])).toEqual([]);
  });
});