"use strict";

var _PartialOrder = _interopRequireDefault(require("../../PartialOrder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('PartialOrder insertItem', function () {
  var testOrder = ['T', 'L', ['M', 'P'], 'A', ['C', 'R', 'Z'], 'Q'];
  it('inserts item before another', function () {
    var order = _PartialOrder.default.insertItem(testOrder, 'I', 'A');

    expect(order).toEqual(['T', 'L', ['M', 'P'], 'I', 'A', ['C', 'R', 'Z'], 'Q']);
  });
  it('inserts item after another', function () {
    var order = _PartialOrder.default.insertItem(testOrder, 'I', 'A', false);

    expect(order).toEqual(['T', 'L', ['M', 'P'], 'A', 'I', ['C', 'R', 'Z'], 'Q']);
  });
  it('inserts item before first', function () {
    var order = _PartialOrder.default.insertItem(testOrder, 'I', 'T');

    expect(order).toEqual(['I', 'T', 'L', ['M', 'P'], 'A', ['C', 'R', 'Z'], 'Q']);
  });
  it('inserts item after last', function () {
    var order = _PartialOrder.default.insertItem(testOrder, 'I', 'Q', false);

    expect(order).toEqual(['T', 'L', ['M', 'P'], 'A', ['C', 'R', 'Z'], 'Q', 'I']);
  });
  it('inserts item into middle of a group', function () {
    var order = _PartialOrder.default.insertItem(testOrder, 'I', 'R');

    expect(order).toEqual(['T', 'L', ['M', 'P'], 'A', ['C', 'I', 'R', 'Z'], 'Q']);
  });
  it('inserts item first of a group', function () {
    var order = _PartialOrder.default.insertItem(testOrder, 'I', 'C');

    expect(order).toEqual(['T', 'L', ['M', 'P'], 'A', ['I', 'C', 'R', 'Z'], 'Q']);
  });
  it('inserts item last of a group', function () {
    var order = _PartialOrder.default.insertItem(testOrder, 'I', 'P', false);

    expect(order).toEqual(['T', 'L', ['M', 'P', 'I'], 'A', ['C', 'R', 'Z'], 'Q']);
  });
  it('returns original order if target not present', function () {
    var order = _PartialOrder.default.insertItem(testOrder, 'I', 'X');

    expect(order).toEqual(testOrder);
  });
});