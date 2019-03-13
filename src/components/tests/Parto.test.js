import React from 'react';
import {shallow} from 'enzyme';
import Parto from '../Parto';
import ListItems from '../../ListItems';

describe('Parto', () => {
  let wrapper;
  const items = ListItems.sample;

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
    let expectedLabels = ListItems.descriptions(items);
    expect(labels.sort()).toEqual(expectedLabels.sort());
  });

  it('places ordered items first in order', () => {
    let parto = ['C','Z'];
    wrapper.setProps({ "itemList": items, "parto": parto }, () => {
      expect(wrapper.find('ol').children().length).toBe(parto.length);
      expect(wrapper.find('ul').children().length).toBe(
        items.length - parto.length);
    });
  });
});
