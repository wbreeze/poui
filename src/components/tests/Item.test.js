import React from 'react';
import {shallow} from 'enzyme';
import Item from '../Item';

describe('Item component', () => {
  let wrapper;
  const clickBehavior = jest.fn(() => {});
  const onDragStart = jest.fn(() => {});
  const itemLabel = 'Ordered item';
  const itemKey = 'K';

  beforeEach(() => {
    wrapper = shallow(
      <Item
        itemKey={itemKey}
        onClickEvent={clickBehavior}
        onDragStart={onDragStart}
      > {itemLabel} </Item>,
    );
  });

  it('renders an <li>', () => {
    expect(wrapper.type()).toBe('li');
  });

  it('uses supplied children <li> children', () => {
    expect(wrapper.find('li').text().trim()).toBe(itemLabel);
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
    const li = wrapper.find('li');
    wrapper.simulate('dragStart');
    expect(onDragStart.mock.calls.length).toBe(1);
  });

  it('does not update if key has not changed', () => {
    const props = {itemKey: itemKey};
    const scu = wrapper.instance().shouldComponentUpdate(props, null);
    expect(scu).toBe(false);
  });
});
