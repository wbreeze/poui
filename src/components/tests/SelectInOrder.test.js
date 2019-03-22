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

  it('reorders when item dropped on a different one', () => {
    let sourceKey = 'L';
    let destKey = 'A';
    let mockEvent = {
      clientY: 0,
      dataTransfer: {
        getData: (_) => {
          return sourceKey;
        },
      },
    };
    let itemWrapper = wrapper.find({ itemKey: destKey })
    let domNode = itemWrapper.getDOMNode();
    Object.defineProperty(domNode, "getBoundingClientRect", {
      value: () => {
        return { top: 0, height: 4 }
      },
      writeable: false,
    });
    itemWrapper.simulate('drop', mockEvent);
    const orderedList = wrapper.find('.poui-parto-ol');
    const itemT = ListItems.itemFor(itemList, 'T');
    expect(orderedList.childAt(0).text()).toEqual(itemT.description);
    const itemL = ListItems.itemFor(itemList, 'L');
    expect(orderedList.childAt(2).text()).toEqual(itemL.description);
    const itemA = ListItems.itemFor(itemList, 'A');
    expect(orderedList.childAt(3).text()).toEqual(itemA.description);
  });
});
