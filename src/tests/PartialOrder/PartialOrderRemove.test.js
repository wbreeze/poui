import PartialOrder from '../../PartialOrder';

describe('PartialOrder removeItem', () => {
  const testOrder = ['T','L',['M','P'],'A',['C','R','Z']];

  it('returns given order when key not found', () => {
    const order = PartialOrder.removeItem(testOrder, 'X');
    expect(order).toEqual(testOrder);
  });

  it('removes item found by itself', () => {
    const order = PartialOrder.removeItem(testOrder, 'L');
    expect(order).toEqual(['T',['M','P'],'A',['C','R','Z']]);
  });

  it('removes first item', () => {
    const order = PartialOrder.removeItem(testOrder, 'T');
    expect(order).toEqual(['L',['M','P'],'A',['C','R','Z']]);
  });

  it('removes item from middle of a group', () => {
    const order = PartialOrder.removeItem(testOrder, 'R');
    expect(order).toEqual(['T','L',['M','P'],'A',['C','Z']]);
  });

  it('removes item from first of a group', () => {
    const order = PartialOrder.removeItem(testOrder, 'C');
    expect(order).toEqual(['T','L',['M','P'],'A',['R','Z']]);
  });

  it('removes item from last of a group', () => {
    const order = PartialOrder.removeItem(testOrder, 'Z');
    expect(order).toEqual(['T','L',['M','P'],'A',['C','R']]);
  });

  it('disolves group when second to last item removed from group', () => {
    const order = PartialOrder.removeItem(testOrder, 'P');
    expect(order).toEqual(['T','L','M','A',['C','R','Z']]);
  });

  it('leaves groups intact when item in-between removed', () => {
    const order = PartialOrder.removeItem(testOrder, 'A');
    expect(order).toEqual(['T','L',['M','P'],['C','R','Z']]);
  });

  it('returns an empty order given an empty order', () => {
    expect(PartialOrder.removeItem([], 'A')).toEqual([]);
  });
});
