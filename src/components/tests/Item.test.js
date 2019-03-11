import React from 'react';
import {shallow} from 'enzyme';
import Item from '../Item';

describe('Item', () => {
  let wrapper;
  const itemLabel = 'Ordered item';

  beforeEach(() => {
    wrapper = shallow(
      <Item itemLabel={itemLabel} />,
    );
  });

  it('renders an <li>', () => {
    expect(wrapper.type()).toBe('li');
  });

  it('uses itemLabel as its child', () => {
    expect(wrapper.find('li').text()).toBe(itemLabel);
  });
});
