"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// functions for manipulating data structured as demonstrated by sample
var ListItems = {
  // returns an array of the item keys
  // ordered as found in items
  keys: function keys(items) {
    return items.map(function (item) {
      return item.key;
    });
  },
  // returns an array of the item descriptions,
  // ordered as found in items
  descriptions: function descriptions(items) {
    return items.map(function (item) {
      return item.description;
    });
  },
  // returns an individual item with matching key
  // returns null if there is no such
  itemFor: function itemFor(items, key) {
    var index = ListItems.keys(items).indexOf(key);
    return index < 0 ? null : items[index];
  }
};
var _default = ListItems;
exports.default = _default;