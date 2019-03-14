import React from 'react';
import { mount, shallow } from 'enzyme';
import ListItems from '../../ListItems';
import PartoWithSelection from '../SelectInOrder';

describe('SelectInOrder', () => {
  const itemList = ListItems.sample;
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      < PartoWithSelection itemList={itemList} />
    );
  });

  it('initializes the order with first selected item', () => {
    let item = itemList[2];
    let itemWrapper = wrapper.find({ itemKey: item.key })
    itemWrapper.simulate("click");
    let olWrapper = wrapper.find('.poui-parto-ol');
    let firstOrderedItem = olWrapper.childAt(0);
    expect(firstOrderedItem.text()).toEqual(item.description);
  });

  it('moves a subsequent selected item to the end of the order', () => {
    let first = itemList[3];
    let second = itemList[2];
    wrapper.find({ itemKey: first.key }).simulate("click");
    wrapper.find({ itemKey: second.key }).simulate("click");
    let olWrapper = wrapper.find('.poui-parto-ol');
    let secondOrderedItem = olWrapper.childAt(1);
    expect(secondOrderedItem.text()).toEqual(second.description);
  });

  it('does nothing when selecting an already ordered item', () => {
    let first = itemList[3];
    let second = itemList[2];
    wrapper.find({ itemKey: first.key }).simulate("click");
    wrapper.find({ itemKey: second.key }).simulate("click");
    wrapper.find({ itemKey: second.key }).simulate("click");
    wrapper.find({ itemKey: first.key }).simulate("click");
    let olWrapper = wrapper.find('.poui-parto-ol');
    expect(olWrapper.childAt(2).exists()).toBe(false);
    let secondOrderedItem = olWrapper.childAt(1);
    expect(secondOrderedItem.text()).toEqual(second.description);
  });
});
