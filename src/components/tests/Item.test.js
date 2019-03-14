import React from 'react';
import {shallow} from 'enzyme';
import Item from '../Item';

describe('Item', () => {
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
});
