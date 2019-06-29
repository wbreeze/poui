import React from 'react';
import { mount, shallow } from 'enzyme';
import Parto from '../Parto';
import ListItems from '../../ListItems';
import PartialOrder from '../../PartialOrder';
import ListItemsFixtures from '../../fixtures/ListItemsFixtures';

describe('Parto', () => {
  let wrapper;
  const items = ListItemsFixtures.salad;
  const itemsOrdering = PartialOrder.encompassItems(items, []);

  describe('shallow', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Parto itemList={items} parto={itemsOrdering} />
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
        labels.push(node.prop('itemKey'));
      });
      let expectedLabels = ListItems.keys(items);
      expect(labels.sort()).toEqual(expectedLabels.sort());
    });

    it('places ordered items first in order', () => {
      const ordering = ['C','Z'];
      const parto = PartialOrder.encompassItems(items, ordering);
      wrapper.setProps({ "itemList": items, "parto": parto }, () => {
        const olChild = wrapper.find('ol');
        expect(olChild.children().length).toBe(ordering.length + 1);
        expect(olChild.find('ul').children().length).toBe(
          items.length - ordering.length);
      });
    });

    it('places partial ordered items together', () => {
      let parto = PartialOrder.encompassItems(items, ['T','L',['M','P'],'A']);
      wrapper.setProps({ "itemList": items, "parto": parto }, () => {
        let ordering = wrapper.find('ol');
        let thirdItem = ordering.childAt(2);
        expect(thirdItem.type()).toBe('li');
        let embeddedGroup = thirdItem.children().first();
        expect(embeddedGroup.type()).toBe('ul');
        expect(embeddedGroup.exists({ itemKey: 'M' })).toBeTruthy();
        expect(embeddedGroup.exists({ itemKey: 'P' })).toBeTruthy();
      });
    });

    it('will not update if order has not changed', () => {
      const scu = wrapper.instance().shouldComponentUpdate({
        parto: itemsOrdering,
      }, { dragOver: '', dragBefore: null });
      expect(scu).toBe(false);
    });

    it('will update if dragOver state changes', () => {
      const scu = wrapper.instance().shouldComponentUpdate({
        parto: itemsOrdering,
      }, { dragOver: 'T', dragBefore: null });
      expect(scu).toBe(true);
    });

    it('will update if dragBefore state changes', () => {
      const scu = wrapper.instance().shouldComponentUpdate({
        parto: itemsOrdering,
      }, { dragOver: '', dragBefore: true });
      expect(scu).toBe(true);
    });

    it('puts dragtarget-before class on dragged over item', () => {
      const key = 'L';
      wrapper.setState({ dragOver: key, dragBefore: true }, () => {
        const itemWrapper = wrapper.find({ itemKey: key });
        expect(itemWrapper.hasClass('poui-dragtarget-before')).toBe(true);
      });
    });

    it('puts dragtarget-after class on dragged over item', () => {
      const key = 'L';
      wrapper.setState({ dragOver: key, dragBefore: false }, () => {
        const itemWrapper = wrapper.find({ itemKey: key });
        expect(itemWrapper.hasClass('poui-dragtarget-after')).toBe(true);
      });
    });
  });

  describe('deep', () => {
    let unorderedItemClick;
    let orderedItemClick;
    let itemReorder;

    beforeEach(() => {
      unorderedItemClick = jest.fn(() => {});
      orderedItemClick = jest.fn(() => {});
      itemReorder = jest.fn(() => {});
      wrapper = mount(
        <Parto
          itemList={items}
          parto={itemsOrdering}
          orderedItemClick={orderedItemClick}
          unorderedItemClick={unorderedItemClick}
          itemReorder={itemReorder}
        />,
      );
    });

    it('calls our injected orderedItemClick function on click', () => {
      let item = items[2];
      let parto = [item.key];
      wrapper.setProps({ "parto": parto });
      let itemWrapper = wrapper.find({ itemKey: item.key })
      itemWrapper.simulate('click');
      expect(orderedItemClick.mock.calls.length).toBe(1);
    });

    it('calls our injected unorderedItemClick function on click', () => {
      let item = items[2];
      let itemWrapper = wrapper.find({ itemKey: item.key })
      itemWrapper.simulate('click');
      expect(unorderedItemClick.mock.calls.length).toBe(1);
    });

    describe('partially ordered', () => {
      beforeEach(() => {
        let parto = PartialOrder.encompassItems(
          items, ['T','L',['M','P'],'A','R']);
        wrapper.setProps({ "parto": parto });
      });

      it('calls our injected unorderedItemClick function on embedded group',
        () => {
          let key = 'P';
          let itemWrapper = wrapper.find({ itemKey: key })
          itemWrapper.simulate('click');
          expect(unorderedItemClick.mock.calls.length).toBe(1);
        }
      );

      it('calls our reorder function on drop', () => {
        let sourceKey = 'M';
        let destKey = 'P';
        let itemWrapper = wrapper.find({ itemKey: destKey });
        let mockEvent = {
          dataTransfer: {
            getData: (ev) => {
              return sourceKey;
            },
          },
        };
        itemWrapper.simulate('drop', mockEvent);
        expect(itemReorder.mock.calls.length).toBe(1);
        expect(itemReorder.mock.calls[0][0]).toEqual(sourceKey);
        expect(itemReorder.mock.calls[0][1]).toEqual(destKey);
      });
    });
  });
});
