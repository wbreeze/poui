"use strict";

var _PartialOrder = _interopRequireDefault(require("../../PartialOrder"));

var _ListItems = _interopRequireDefault(require("../../ListItems"));

var _ListItemsFixtures = _interopRequireDefault(require("../../fixtures/ListItemsFixtures"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("PartialOrder encompassItems", function () {
  var items = _ListItemsFixtures.default.salad;
  it('completes the order with items not included', function () {
    var parto = ['R', 'T', 'M'];

    var order = _PartialOrder.default.encompassItems(items, parto);

    expect(order.length).toEqual(parto.length + 1);

    var keys = _ListItems.default.keys(items);

    var rest = keys.filter(function (key) {
      return !parto.includes(key);
    });
    expect(order[parto.length].length).toEqual(rest.length);
    expect(order[parto.length].sort()).toEqual(rest.sort());
  });
  it('skips keys in the order not found in items', function () {
    var falseKey = 'X';
    var parto = ['R', 'T', 'M', falseKey, 'C'];

    var order = _PartialOrder.default.encompassItems(items, parto);

    expect(order.length).toBe(parto.length);
    expect(order.includes(falseKey)).toBe(false);
  });
  it('eliminates groups that contain only one item', function () {
    var falseKey = 'X';
    var goodKey = 'M';
    var parto = ['R', 'T', [goodKey, falseKey], 'C'];

    var order = _PartialOrder.default.encompassItems(items, parto);

    expect(order.length).toBe(parto.length + 1);
    expect(Array.isArray(order[2])).toBe(false);
    expect(order[2]).toBe(goodKey);
  });
  it('correctly handles all items in one group', function () {
    var keys = _ListItems.default.keys(items);

    var parto = new Array(keys);

    var order = _PartialOrder.default.encompassItems(items, parto);

    expect(order.length).toBe(1);
    expect(Array.isArray(order[0])).toBe(true);
    expect(order).toStrictEqual(parto);
  });
});