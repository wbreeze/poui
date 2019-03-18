import React from 'react';
import { mount, shallow } from 'enzyme';
import ListItems from '../../ListItems';
import ListItemsFixtures from '../../fixtures/ListItemsFixtures';
import PartoWithSelection from '../SelectInOrder';

describe('SelectInOrder', () => {
  const itemList = ListItemsFixtures.salad;
  const initialOrder = ['T','L',['M','P'],'A'];
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <PartoWithSelection
        itemList={ itemList }
        parto={ initialOrder }
      />
    );
  });

  it('raises first selected item', () => {
    const item = ListItems.itemFor(itemList, 'R');
    const itemWrapper = wrapper.find({ itemKey: item.key })
    itemWrapper.simulate("click");
    const olWrapper = wrapper.find('.poui-parto-ol');
    const raisedItem = olWrapper.childAt(initialOrder.length)
    expect(raisedItem.text()).toEqual(item.description);
  });

  it('moves a subsequent selected item to the end of the order', () => {
    const first = ListItems.itemFor(itemList, 'R');
    const second = ListItems.itemFor(itemList, 'Z');
    wrapper.find({ itemKey: first.key }).simulate("click");
    wrapper.find({ itemKey: second.key }).simulate("click");
    const olWrapper = wrapper.find('.poui-parto-ol');
    const secondOrderedItem = olWrapper.childAt(initialOrder.length + 1);
    expect(secondOrderedItem.text()).toEqual(second.description);
  });

  it('raises item out of an internal group', () => {
    const item = ListItems.itemFor(itemList, 'P');
    const itemWrapper = wrapper.find({ itemKey: item.key });
    itemWrapper.simulate("click");
    const olWrapper = wrapper.find('.poui-parto-ol');
    const extracted = olWrapper.childAt(2);
    const ungrouped = olWrapper.childAt(3);
    const ungroupedItem = ListItems.itemFor(itemList, 'M');
    expect(extracted.text()).toEqual(item.description);
    expect(ungrouped.text()).toEqual(ungroupedItem.description);
  });

  it('reverses when item clicked twice', () => {
    const item = ListItems.itemFor(itemList, 'P');
    wrapper.find({ itemKey: item.key }).simulate("click");
    wrapper.find({ itemKey: item.key }).simulate("click");
    const firstGroup = wrapper.find('.poui-parto-ul').first();
    const firstUnordered = firstGroup.children().first();
    expect(firstUnordered.text()).toEqual(item.description);
  });
});
