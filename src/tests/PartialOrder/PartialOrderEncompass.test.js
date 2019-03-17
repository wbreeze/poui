import PartialOrder from '../../PartialOrder';
import ListItems from '../../ListItems';
import ListItemsFixtures from '../../fixtures/ListItemsFixtures';

describe("PartialOrder encompassItems", () => {
  const items = ListItemsFixtures.salad;

  it('completes the order with items not included', () => {
    const parto = ['R','T','M'];
    const order = PartialOrder.encompassItems(items, parto);
    expect(order.length).toEqual(parto.length + 1);
    const keys = ListItems.keys(items);
    const rest = keys.filter(key => !parto.includes(key));
    expect(order[parto.length].length).toEqual(rest.length);
    expect(order[parto.length].sort()).toEqual(rest.sort());
  });

  it('skips keys in the order not found in items', () => {
    const falseKey = 'X';
    const parto = ['R','T','M',falseKey,'C'];
    const order = PartialOrder.encompassItems(items, parto);
    expect(order.length).toBe(parto.length);
    expect(order.includes(falseKey)).toBe(false);
  });

  it('eliminates groups that contain only one item', () => {
    const falseKey = 'X';
    const goodKey = 'M';
    const parto = ['R','T',[goodKey,falseKey],'C'];
    const order = PartialOrder.encompassItems(items, parto);
    expect(order.length).toBe(parto.length + 1);
    expect(Array.isArray(order[2])).toBe(false);
    expect(order[2]).toBe(goodKey);
  });
});
