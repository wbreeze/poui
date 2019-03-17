import PartialOrder from '../../PartialOrder';
import ListItemsFixtures from '../../fixtures/ListItemsFixtures';

describe('PartialOrder arrangeItemsPerOrder', () => {
  const items = ListItemsFixtures.salad;

  it('places selected item first', () => {
    let order = PartialOrder.arrangeItemsPerOrder(items, ['R']);
    expect(order[0]).toEqual(items[1]);
  });

  it('places grouped items together', () => {
    let order = PartialOrder.arrangeItemsPerOrder(
      items, ['T','L',['M','P'],'A']
    );
    expect(order.length).toBe(4);
    let group = order[2];
    expect(Array.isArray(group));
    expect(group.length).toBe(2);
  });
});
