import React from 'react';
import {shallow} from 'enzyme';
import Item from '../Item';

describe('Item component', () => {
  let wrapper;
  let clickBehavior;
  const itemLabel = 'Ordered item';
  const itemKey = 'K';

  beforeEach(() => {
    clickBehavior = jest.fn(() => {});
    wrapper = shallow(
      <Item
        itemKey={itemKey}
        itemLabel={itemLabel}
        onClickEvent={clickBehavior}
      />,
    );
  });

  it('renders an <li>', () => {
    expect(wrapper.type()).toBe('li');
  });

  it('uses itemLabel as its child', () => {
    expect(wrapper.find('li').text()).toBe(itemLabel);
  });

  it('calls our injected clickBehavior function on click', () => {
    wrapper.find('li').simulate('click');
    expect(clickBehavior.mock.calls.length).toBe(1);
    expect(clickBehavior.mock.calls[0][0]).toBe(itemKey);
  });

  it('applies injected className to <li>', () => {
    const className = 'in-drag';
    wrapper.setProps({"className":className}, () => {
      const li = wrapper.find('li');
      expect(li.hasClass('poui-item')).toEqual(true);
      expect(li.hasClass(className)).toEqual(true);
    });
  });

  it('applies injected event to <li>', () => {
    const onDragStart = jest.fn(() => {});
    wrapper.setProps({"onDragStart":onDragStart}, () => {
      const li = wrapper.find('li');
      wrapper.simulate('dragStart');
      expect(onDragStart.mock.calls.length).toBe(1);
    });
  });
});
