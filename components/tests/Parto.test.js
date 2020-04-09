"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Parto = _interopRequireDefault(require("../Parto"));

var _ListItems = _interopRequireDefault(require("../../ListItems"));

var _PartialOrder = _interopRequireDefault(require("../../PartialOrder"));

var _ListItemsFixtures = _interopRequireDefault(require("../../fixtures/ListItemsFixtures"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Parto', function () {
  var wrapper;
  var items = _ListItemsFixtures.default.salad;

  var itemsOrdering = _PartialOrder.default.encompassItems(items, []);

  describe('shallow', function () {
    beforeEach(function () {
      wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Parto.default, {
        itemList: items,
        parto: itemsOrdering
      }));
    });
    it('renders a <div> with <ol> and embedded <ul>', function () {
      expect(wrapper.type()).toBe('div');
      var olChild = wrapper.childAt(0);
      expect(olChild.type()).toBe('ol');
      var liChild = olChild.childAt(0);
      expect(liChild.type()).toBe('li');
      var ulChild = liChild.childAt(0);
      expect(ulChild.type()).toBe('ul');
    });
    it('uses items as children', function () {
      var labels = [];
      wrapper.find('ul').children().forEach(function (node) {
        expect(node.text()).toEqual('<Item />');
        labels.push(node.prop('itemKey'));
      });

      var expectedLabels = _ListItems.default.keys(items);

      expect(labels.sort()).toEqual(expectedLabels.sort());
    });
    it('places ordered items first in order', function () {
      var ordering = ['C', 'Z'];

      var parto = _PartialOrder.default.encompassItems(items, ordering);

      wrapper.setProps({
        "itemList": items,
        "parto": parto
      }, function () {
        var olChild = wrapper.find('ol');
        expect(olChild.children().length).toBe(ordering.length + 1);
        expect(olChild.find('ul').children().length).toBe(items.length - ordering.length);
      });
    });
    it('places partial ordered items together', function () {
      var parto = _PartialOrder.default.encompassItems(items, ['T', 'L', ['M', 'P'], 'A']);

      wrapper.setProps({
        "itemList": items,
        "parto": parto
      }, function () {
        var ordering = wrapper.find('ol');
        var thirdItem = ordering.childAt(2);
        expect(thirdItem.type()).toBe('li');
        var embeddedGroup = thirdItem.children().first();
        expect(embeddedGroup.type()).toBe('ul');
        expect(embeddedGroup.exists({
          itemKey: 'M'
        })).toBeTruthy();
        expect(embeddedGroup.exists({
          itemKey: 'P'
        })).toBeTruthy();
      });
    });
    it.skip('will not update if order has not changed', function () {
      var scu = wrapper.instance().shouldComponentUpdate({
        parto: itemsOrdering
      }, {
        dragOver: '',
        dragBefore: null
      });
      expect(scu).toBe(false);
    });
    it.skip('will update if dragOver state changes', function () {
      var scu = wrapper.instance().shouldComponentUpdate({
        parto: itemsOrdering
      }, {
        dragOver: 'T',
        dragBefore: null
      });
      expect(scu).toBe(true);
    });
    it.skip('will update if dragBefore state changes', function () {
      var scu = wrapper.instance().shouldComponentUpdate({
        parto: itemsOrdering
      }, {
        dragOver: '',
        dragBefore: true
      });
      expect(scu).toBe(true);
    });
    it.skip('puts dragtarget-before class on dragged over item', function () {
      var key = 'L';
      wrapper.setState({
        dragOver: key,
        dragBefore: true
      }, function () {
        var itemWrapper = wrapper.find({
          itemKey: key
        });
        expect(itemWrapper.hasClass('poui-dragtarget-before')).toBe(true);
      });
    });
    it.skip('puts dragtarget-after class on dragged over item', function () {
      var key = 'L';
      wrapper.setState({
        dragOver: key,
        dragBefore: false
      }, function () {
        var itemWrapper = wrapper.find({
          itemKey: key
        });
        expect(itemWrapper.hasClass('poui-dragtarget-after')).toBe(true);
      });
    });
  });
  describe('deep', function () {
    var unorderedItemClick;
    var orderedItemClick;
    var itemReorder;
    beforeEach(function () {
      unorderedItemClick = jest.fn(function () {});
      orderedItemClick = jest.fn(function () {});
      itemReorder = jest.fn(function () {});
      wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Parto.default, {
        itemList: items,
        parto: itemsOrdering,
        orderedItemClick: orderedItemClick,
        unorderedItemClick: unorderedItemClick,
        itemReorder: itemReorder
      }));
    });
    it('calls our injected orderedItemClick function on click', function () {
      var item = items[2];
      var parto = [item.key];
      wrapper.setProps({
        "parto": parto
      });
      var itemWrapper = wrapper.find({
        itemKey: item.key
      });
      itemWrapper.simulate('click');
      expect(orderedItemClick.mock.calls.length).toBe(1);
    });
    it('calls our injected unorderedItemClick function on click', function () {
      var item = items[2];
      var itemWrapper = wrapper.find({
        itemKey: item.key
      });
      itemWrapper.simulate('click');
      expect(unorderedItemClick.mock.calls.length).toBe(1);
    });
    describe('partially ordered', function () {
      beforeEach(function () {
        var parto = _PartialOrder.default.encompassItems(items, ['T', 'L', ['M', 'P'], 'A', 'R']);

        wrapper.setProps({
          "parto": parto
        });
      });
      it('calls our injected unorderedItemClick function on embedded group', function () {
        var key = 'P';
        var itemWrapper = wrapper.find({
          itemKey: key
        });
        itemWrapper.simulate('click');
        expect(unorderedItemClick.mock.calls.length).toBe(1);
      });
      it.skip('calls our reorder function on drop', function () {
        var sourceKey = 'M';
        var destKey = 'P';
        var itemWrapper = wrapper.find({
          itemKey: destKey
        });
        var mockEvent = {
          dataTransfer: {
            getData: function getData() {
              return sourceKey;
            }
          }
        };
        itemWrapper.simulate('drop', mockEvent);
        expect(itemReorder.mock.calls.length).toBe(1);
        expect(itemReorder.mock.calls[0][0]).toEqual(sourceKey);
        expect(itemReorder.mock.calls[0][1]).toEqual(destKey);
      });
    });
  });
});