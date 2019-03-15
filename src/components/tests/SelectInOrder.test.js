import React from 'react';
import { mount, shallow } from 'enzyme';
import ListItems from '../../ListItems';
import ListItemsFixtures from '../../fixtures/ListItemsFixtures';
import PartoWithSelection from '../SelectInOrder';

describe('SelectInOrder', () => {
  const itemList = ListItemsFixtures.salad;
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <PartoWithSelection
        itemList={ itemList }
        parto={ ['T','L',['M','P'],'A'] }
      />
    );
  });

  it('initializes the order with first selected item', () => {
    let item = ListItems.itemFor(itemList, 'R');
    let itemWrapper = wrapper.find({ itemKey: item.key })
    itemWrapper.simulate("click");
    let olWrapper = wrapper.find('.poui-parto-ol');
    let lastOrderedItem = olWrapper.children().last();
    expect(lastOrderedItem.text()).toEqual(item.description);
  });

  it('moves a subsequent selected item to the end of the order', () => {
    let first = ListItems.itemFor(itemList, 'R');
    let second = ListItems.itemFor(itemList, 'Z');
    wrapper.find({ itemKey: first.key }).simulate("click");
    wrapper.find({ itemKey: second.key }).simulate("click");
    let olWrapper = wrapper.find('.poui-parto-ol');
    let secondOrderedItem = olWrapper.children().last();
    expect(secondOrderedItem.text()).toEqual(second.description);
  });

  it('does nothing when selecting an already ordered item', () => {
    let first = ListItems.itemFor(itemList, 'R');
    let second = ListItems.itemFor(itemList, 'Z');
    wrapper.find({ itemKey: first.key }).simulate("click");
    wrapper.find({ itemKey: second.key }).simulate("click");
    wrapper.find({ itemKey: second.key }).simulate("click");
    wrapper.find({ itemKey: first.key }).simulate("click");
    let olWrapper = wrapper.find('.poui-parto-ol');
    let secondOrderedItem = olWrapper.children().last();
    expect(secondOrderedItem.text()).toEqual(second.description);
  });
});
