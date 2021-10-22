"use strict";

var _PartialOrder = _interopRequireDefault(require("../../PartialOrder"));

var _ListItemsFixtures = _interopRequireDefault(require("../../fixtures/ListItemsFixtures"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('PartialOrder arrangeItemsPerOrder', function () {
  var items = _ListItemsFixtures.default.salad;
  it('places selected item first', function () {
    var order = _PartialOrder.default.arrangeItemsPerOrder(items, ['R']);

    expect(order[0]).toEqual(items[1]);
  });
  it('places grouped items together', function () {
    var order = _PartialOrder.default.arrangeItemsPerOrder(items, ['T', 'L', ['M', 'P'], 'A']);

    expect(order.length).toBe(4);
    var group = order[2];
    expect(Array.isArray(group)).toBeTruthy();
    expect(group.length).toBe(2);
  });
});