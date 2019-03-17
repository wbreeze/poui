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
      wrapper = shallow(
        <Parto itemList={items} />
      );
    });

    it('renders a <div> with <ol> and embedded <ul>', () => {
      expect(wrapper.type()).toBe('div');
      const olChild = wrapper.childAt(0);
      expect(olChild.type()).toBe('ol');
      const liChild = olChild.childAt(0);
      expect(liChild.type()).toBe('li');
      const ulChild = liChild.childAt(0);
      expect(ulChild.type()).toBe('ul');
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
        const olChild = wrapper.find('ol');
        expect(olChild.children().length).toBe(parto.length + 1);
        expect(olChild.find('ul').children().length).toBe(
          items.length - parto.length);
      });
    });

    it('places partial ordered items together', () => {
      let parto = ['T','L',['M','P'],'A'];
      wrapper.setProps({ "itemList": items, "parto": parto }, () => {
        let ordering = wrapper.find('ol');
        let thirdItem = ordering.childAt(2);
        expect(thirdItem.type()).toBe('li');
        let embeddedGroup = thirdItem.children().first();
        expect(embeddedGroup.type()).toBe('ul');
        expect(embeddedGroup.exists({ itemKey: 'M' }));
        expect(embeddedGroup.exists({ itemKey: 'P' }));
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

    it('calls our injected unorderedItemClick function on embedded group',
      () => {
        let key = 'P';
        let parto = ['T','L',['M','P'],'A','R'];
        wrapper.setProps({ "parto": parto });
        let itemWrapper = wrapper.find({ itemKey: key })
        itemWrapper.simulate('click');
        expect(unorderedItemClick.mock.calls.length).toBe(1);
      }
    );

  });
});
