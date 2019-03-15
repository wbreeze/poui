import React from 'react';
import { mount, shallow } from 'enzyme';
import Parto from '../Parto';
import ListItems from '../../ListItems';
import ListItemsFixtures from '../../fixtures/ListItemsFixtures';

describe('Parto', () => {
  let wrapper;
  const items = ListItemsFixtures.salad;

  describe('shallow', () => {
    beforeEach(() => {
      let unorderedItemClick = jest.fn(() => {});
      wrapper = shallow(
        <Parto itemList={items} unorderedItemClick={unorderedItemClick} />,
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

  describe('deep', () => {
    let unorderedItemClick;
    let orderedItemClick;

    beforeEach(() => {
      unorderedItemClick = jest.fn(() => {});
      orderedItemClick = jest.fn(() => {});
      wrapper = mount(
        <Parto
          itemList={items}
          orderedItemClick={orderedItemClick}
          unorderedItemClick={unorderedItemClick}
        />,
      );
    });

    it('calls our injected orderedItemClick function on click', () => {
      let item = items[2];
      let parto = [item.key];
      wrapper.setProps({ "parto": parto });
      let itemWrapper = wrapper.find({ itemLabel: item.description })
      itemWrapper.simulate('click');
      expect(orderedItemClick.mock.calls.length).toBe(1);
    });

    it('calls our injected unorderedItemClick function on click', () => {
      let item = items[2];
      let itemWrapper = wrapper.find({ itemLabel: item.description })
      itemWrapper.simulate('click');
      expect(unorderedItemClick.mock.calls.length).toBe(1);
    });
  });
});
