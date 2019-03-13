import PartialOrder from '../PartialOrder';
import ListItems from '../ListItems';

describe('PartialOrder', () => {
  const items = ListItems.sample;

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
});
