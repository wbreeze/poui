import React from 'react';
import {shallow} from 'enzyme';
import Parto from '../Parto';

describe('Parto', () => {
  let wrapper;
  const items = ['Zanahoria', 'Remolacha', 'Calabaza', 'Tomate'];

  beforeEach(() => {
    wrapper = shallow(
      <Parto itemList={items} />,
    );
  });

  it('renders an <ol>', () => {
    expect(wrapper.type()).toBe('ol');
  });

  it('uses items as children', () => {
    let labels = [];
    wrapper.children().forEach((node) => {
      expect(node.text()).toEqual('<Item />');
      labels.push(node.prop('itemLabel'));
    });
    expect(labels.sort()).toEqual(items.sort());
  });
});
