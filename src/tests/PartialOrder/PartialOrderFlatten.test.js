import PartialOrder from '../../PartialOrder';

describe('PartialOrder flatten', () => {
  const testOrder = ['T','L',['M','P'],'A',['C','R','Z']];
  const flatOrder = ['T','L','M','P','A','C','R','Z'];

  it('returns given order when already flat', () => {
    const order = PartialOrder.flatten(flatOrder);
    expect(order).toEqual(flatOrder);
  });

  it('expands embedded groups', () => {
    const order = PartialOrder.flatten(testOrder);
    expect(order).toEqual(flatOrder);
  });

  it('removes double grouping', () => {
    const doubledOrder = [['T'],['L'],[['M','P']],['A'],[['C','R','Z']]];
    expect(PartialOrder.flatten(doubledOrder)).toEqual(testOrder);
  });

  it('returns an empty order given an empty order', () => {
    expect(PartialOrder.flatten([])).toEqual([]);
  });
});
