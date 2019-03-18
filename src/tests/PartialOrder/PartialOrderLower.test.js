import PartialOrder from '../../PartialOrder';
import ListItemsFixtures from '../../fixtures/ListItemsFixtures';

describe('PartialOrder lowerItem', () => {
  const items = ListItemsFixtures.salad;
  const testOrder = ['T','L',['M','P'],'A','R'];

  it('lowers an item into a group', () => {
    const order = PartialOrder.lowerItem(testOrder, 'L');
    expect(order).toEqual(['T',['L','M','P'],'A','R']);
  });

  it('lowers an item to join with following item', () => {
    const order = PartialOrder.lowerItem(testOrder, 'A');
    expect(order).toEqual(['T','L',['M','P'],['A','R']]);
  });

  it('does not lower item already in a group', () => {
    const order = PartialOrder.lowerItem(testOrder, 'M');
    expect(order).toEqual(testOrder);
  });

  it('does not lower item by itself at the end', () => {
    const order = PartialOrder.lowerItem(testOrder, 'R');
    expect(order).toEqual(testOrder);
  });

  it('returns an empty order given an empty order', () => {
    expect(PartialOrder.lowerItem([], 'A')).toEqual([]);
  });
});
