"use strict";

var _ListItems = _interopRequireDefault(require("../ListItems"));

var _ListItemsFixtures = _interopRequireDefault(require("../fixtures/ListItemsFixtures"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ListItems', function () {
  var items = _ListItemsFixtures.default.salad.splice(0, 4);

  it('returns the keys in order', function () {
    expect(_ListItems.default.keys(items)).toEqual(['Z', 'R', 'C', 'T']);
  });
  it('returns the descriptions in order', function () {
    expect(_ListItems.default.descriptions(items)).toEqual(['Zanahoria', 'Remolacha', 'Calabaza', 'Tomate']);
  });
  it('finds an item with given key', function () {
    expect(_ListItems.default.itemFor(items, 'C')).toEqual({
      "key": 'C',
      "description": 'Calabaza'
    });
  });
});