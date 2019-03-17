import PartialOrder from '../../PartialOrder';
import ListItemsFixtures from '../../fixtures/ListItemsFixtures';

describe('PartialOrder raiseItem', () => {
  const items = ListItemsFixtures.salad;
  const testOrder = ['T','L',['M','P'],'A',['C','R','Z']];

  it('returns given order when key not found', () => {
    const order = PartialOrder.raiseItem(testOrder, 'X');
    expect(order).toEqual(testOrder);
  });

  it('returns given order when key not in a group', () => {
    const order = PartialOrder.raiseItem(testOrder, 'A');
    expect(order).toEqual(testOrder);
  });

  it('raises item from middle of a group', () => {
    const order = PartialOrder.raiseItem(testOrder, 'R');
    expect(order).toEqual(['T','L',['M','P'],'A','R',['C','Z']]);
  });

  it('raises item from first of a group', () => {
    const order = PartialOrder.raiseItem(testOrder, 'C');
    expect(order).toEqual(['T','L',['M','P'],'A','C',['R','Z']]);
  });

  it('raises item from last of a group', () => {
    const order = PartialOrder.raiseItem(testOrder, 'Z');
    expect(order).toEqual(['T','L',['M','P'],'A','Z',['C','R']]);
  });

  it('disolves group when second to last item raised from group', () => {
    const order = PartialOrder.raiseItem(testOrder, 'P');
    expect(order).toEqual(['T','L','P','M','A',['C','R','Z']]);
  });

  it('returns an empty order given an empty order', () => {
    expect(PartialOrder.raiseItem([], 'A')).toEqual([]);
  });
});
