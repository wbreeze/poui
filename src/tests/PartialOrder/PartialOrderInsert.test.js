import PartialOrder from '../../PartialOrder';

describe('PartialOrder insertItem', () => {
  const testOrder = ['T','L',['M','P'],'A',['C','R','Z'],'Q'];

  it('inserts item before another', () => {
    const order = PartialOrder.insertItem(testOrder, 'I', 'A');
    expect(order).toEqual(['T','L',['M','P'],'I','A',['C','R','Z'],'Q']);
  });

  it('inserts item after another', () => {
    const order = PartialOrder.insertItem(testOrder, 'I', 'A', false);
    expect(order).toEqual(['T','L',['M','P'],'A','I',['C','R','Z'],'Q']);
  });

  it('inserts item before first', () => {
    const order = PartialOrder.insertItem(testOrder, 'I', 'T');
    expect(order).toEqual(['I','T','L',['M','P'],'A',['C','R','Z'],'Q']);
  });

  it('inserts item after last', () => {
    const order = PartialOrder.insertItem(testOrder, 'I', 'Q', false);
    expect(order).toEqual(['T','L',['M','P'],'A',['C','R','Z'],'Q','I']);
  });

  it('inserts item into middle of a group', () => {
    const order = PartialOrder.insertItem(testOrder, 'I','R');
    expect(order).toEqual(['T','L',['M','P'],'A',['C','I','R','Z'],'Q']);
  });

  it('inserts item first of a group', () => {
    const order = PartialOrder.insertItem(testOrder, 'I', 'C');
    expect(order).toEqual(['T','L',['M','P'],'A',['I','C','R','Z'],'Q']);
  });

  it('inserts item last of a group', () => {
    const order = PartialOrder.insertItem(testOrder, 'I', 'P', false);
    expect(order).toEqual(['T','L',['M','P','I'],'A',['C','R','Z'],'Q']);
  });

  it('returns original order if target not present', () => {
    const order = PartialOrder.insertItem(testOrder, 'I', 'X');
    expect(order).toEqual(testOrder);
  });
});
