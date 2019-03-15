import PartialOrder from '../PartialOrder';
import ListItemsFixtures from '../fixtures/ListItemsFixtures';

describe('PartialOrder', () => {
  const items = ListItemsFixtures.salad;

  it('places all items in "rest"', () => {
    let order = PartialOrder.arrangeItemsPerOrder(items, []);
    expect(order.length).toBe(1);
    let rest = order[order.length - 1];
    expect(rest.length).toBe(items.length);
  });

  it('places selected item first', () => {
    let order = PartialOrder.arrangeItemsPerOrder(items, ['R']);
    expect(order.length).toBe(2);
    expect(order[0]).toEqual(items[1]);
  });

  it('leaves unordered items together, last', () => {
    let order = PartialOrder.arrangeItemsPerOrder(items, ['C']);
    let rest = order[order.length - 1];
    expect(rest.length).toBe(items.length - 1);
  });

  it('skips keys in the order not found in items', () => {
    let order = PartialOrder.arrangeItemsPerOrder(items, ['B','C']);
    let rest = order[order.length - 1];
    expect(order.length).toBe(2);
    expect(rest.length).toBe(items.length-1);
  });
});
