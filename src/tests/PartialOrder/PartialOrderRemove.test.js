import PartialOrder from '../../PartialOrder';
import ListItemsFixtures from '../../fixtures/ListItemsFixtures';

describe('PartialOrder removeItem', () => {
  it('removes first item from three', () => {
    expect(PartialOrder.removeItem(['A','B','C'], 0)).toEqual(['B','C']);
  });

  it('removes second item from three', () => {
    expect(PartialOrder.removeItem(['A','B','C'], 1)).toEqual(['A','C']);
  });

  it('removes third item from three', () => {
    expect(PartialOrder.removeItem(['A','B','C'], 2)).toEqual(['A','B']);
  });

  it('flattens when item is first of two', () => {
    expect(PartialOrder.removeItem(['A','B'], 0)).toEqual('B');
  });

  it('flattens when item is second of two', () => {
    expect(PartialOrder.removeItem(['A','B'], 1)).toEqual('A');
  });
});
