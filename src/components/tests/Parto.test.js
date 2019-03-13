import React from 'react';
import {shallow} from 'enzyme';
import Parto from '../Parto';

describe('Parto', () => {
  let wrapper;
  const items = [
    { "key": 'Z', "description": 'Zanahoria' },
    { "key": 'R', "description": 'Remolacha' },
    { "key": 'C', "description": 'Calabaza' },
    { "key": 'T', "description": 'Tomate' },
  ];

  beforeEach(() => {
    wrapper = shallow(
      <Parto itemList={items} />,
    );
  });

  it('renders a <div> with <ol> and <ul>', () => {
    expect(wrapper.type()).toBe('div');
    expect(wrapper.childAt(0).type()).toBe('ol');
    expect(wrapper.childAt(1).type()).toBe('ul');
  });

  it('uses items as children', () => {
    let labels = [];
    wrapper.find('ul').children().forEach((node) => {
      expect(node.text()).toEqual('<Item />');
      labels.push(node.prop('itemLabel'));
    });
    let expectedLabels = items.map((item) => {
      return item.description;
    });
    expect(labels.sort()).toEqual(expectedLabels.sort());
  });
});
