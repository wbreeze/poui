"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _ListItems = _interopRequireDefault(require("../../ListItems"));

var _ListItemsFixtures = _interopRequireDefault(require("../../fixtures/ListItemsFixtures"));

var _PartoWithSelection = _interopRequireDefault(require("../PartoWithSelection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('SelectInOrder', function () {
  var itemList = _ListItemsFixtures.default.salad;
  var initialOrder = ['T', 'L', ['M', 'P'], 'A'];
  var currentOrdering = initialOrder;
  var updateOrderingCallback = jest.fn(function (ordering) {
    currentOrdering = ordering;
  });
  var wrapper;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_PartoWithSelection.default, {
      itemList: itemList,
      parto: initialOrder,
      updateOrdering: updateOrderingCallback
    }));
  });
  it('sends a callback when the ordering changes', function () {
    var item = _ListItems.default.itemFor(itemList, 'R');

    var itemWrapper = wrapper.find({
      itemKey: item.key
    });
    itemWrapper.simulate("click");
    expect(updateOrderingCallback.mock.calls.length).toBe(1);
    expect(currentOrdering).toEqual(['T', 'L', ['M', 'P'], 'A', 'R', ['Z', 'C']]);
  });
  it('raises first selected item', function () {
    var item = _ListItems.default.itemFor(itemList, 'R');

    var itemWrapper = wrapper.find({
      itemKey: item.key
    });
    itemWrapper.simulate("click");
    var olWrapper = wrapper.find('.poui-parto-ol');
    var raisedItem = olWrapper.childAt(initialOrder.length);
    expect(raisedItem.text().trim()).toEqual(item.description);
  });
  it('moves a subsequent selected item to the end of the order', function () {
    var first = _ListItems.default.itemFor(itemList, 'R');

    var second = _ListItems.default.itemFor(itemList, 'Z');

    wrapper.find({
      itemKey: first.key
    }).simulate("click");
    wrapper.find({
      itemKey: second.key
    }).simulate("click");
    var olWrapper = wrapper.find('.poui-parto-ol');
    var secondOrderedItem = olWrapper.childAt(initialOrder.length + 1);
    expect(secondOrderedItem.text().trim()).toEqual(second.description);
  });
  it('raises item out of an internal group', function () {
    var item = _ListItems.default.itemFor(itemList, 'P');

    var itemWrapper = wrapper.find({
      itemKey: item.key
    });
    itemWrapper.simulate("click");
    var olWrapper = wrapper.find('.poui-parto-ol');
    var extracted = olWrapper.childAt(2);
    var ungrouped = olWrapper.childAt(3);

    var ungroupedItem = _ListItems.default.itemFor(itemList, 'M');

    expect(extracted.text().trim()).toEqual(item.description);
    expect(ungrouped.text().trim()).toEqual(ungroupedItem.description);
  });
  it('reverses when item clicked twice', function () {
    var item = _ListItems.default.itemFor(itemList, 'P');

    wrapper.find({
      itemKey: item.key
    }).simulate("click");
    wrapper.find({
      itemKey: item.key
    }).simulate("click");
    var firstGroup = wrapper.find('.poui-parto-ul').first();
    var firstUnordered = firstGroup.children().first();
    expect(firstUnordered.text().trim()).toEqual(item.description);
  });
  it.skip('reorders when item dropped on a different one', function () {
    var sourceKey = 'L';
    var destKey = 'A';
    var mockEvent = {
      clientY: 0,
      dataTransfer: {
        getData: function getData() {
          return sourceKey;
        }
      }
    };
    var itemWrapper = wrapper.find({
      itemKey: destKey
    });
    var domNode = itemWrapper.getDOMNode();
    Object.defineProperty(domNode, "getBoundingClientRect", {
      value: function value() {
        return {
          top: 0,
          height: 4
        };
      },
      writeable: false
    });
    itemWrapper.simulate('dragOver', mockEvent);
    itemWrapper.simulate('drop', mockEvent);
    var orderedList = wrapper.find('.poui-parto-ol');

    var itemT = _ListItems.default.itemFor(itemList, 'T');

    expect(orderedList.childAt(0).text().trim()).toEqual(itemT.description);

    var itemL = _ListItems.default.itemFor(itemList, 'L');

    expect(orderedList.childAt(2).text().trim()).toEqual(itemL.description);

    var itemA = _ListItems.default.itemFor(itemList, 'A');

    expect(orderedList.childAt(3).text().trim()).toEqual(itemA.description);
  });
});