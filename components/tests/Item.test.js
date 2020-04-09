"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Item = _interopRequireDefault(require("../Item"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Item component', function () {
  var wrapper;
  var clickBehavior = jest.fn(function () {});
  var onDragStart = jest.fn(function () {});
  var itemLabel = 'Ordered item';
  var itemKey = 'K';
  beforeEach(function () {
    wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Item.default, {
      itemKey: itemKey,
      onClickEvent: clickBehavior,
      onDragStart: onDragStart
    }, " ", itemLabel, " "));
  });
  it('renders an <li>', function () {
    expect(wrapper.type()).toBe('li');
  });
  it('uses supplied children <li> children', function () {
    expect(wrapper.find('li').text().trim()).toBe(itemLabel);
  });
  it('calls our injected clickBehavior function on click', function () {
    wrapper.find('li').simulate('click');
    expect(clickBehavior.mock.calls.length).toBe(1);
    expect(clickBehavior.mock.calls[0][0]).toBe(itemKey);
  });
  it('applies injected className to <li>', function () {
    var className = 'in-drag';
    wrapper.setProps({
      "className": className
    }, function () {
      var li = wrapper.find('li');
      expect(li.hasClass('poui-item')).toEqual(true);
      expect(li.hasClass(className)).toEqual(true);
    });
  });
  it('applies injected event to <li>', function () {
    wrapper.simulate('dragStart');
    expect(onDragStart.mock.calls.length).toBe(1);
  });
  it('does not update if key has not changed', function () {
    var props = {
      itemKey: itemKey
    };
    var scu = wrapper.instance().shouldComponentUpdate(props, null);
    expect(scu).toBe(false);
  });
});