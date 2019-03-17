import PartialOrder from '../../PartialOrder';
import ListItems from '../../ListItems';
import ListItemsFixtures from '../../fixtures/ListItemsFixtures';

describe("PartialOrder encompassList", () => {
  const itemList = ListItemsFixtures.salad;

  it('completes the order with items not included', () => {
    const parto = ['R','T','M'];
    const order = PartialOrder.encompassList(itemList, parto);
    expect(order.length).toEqual(parto.length + 1);
    const keys = ListItems.keys(itemList);
    const rest = keys.filter(key => !parto.includes(key));
    expect(order[parto.length].length).toEqual(rest.length);
    expect(order[parto.length].sort()).toEqual(rest.sort());
  });

  it('skips keys in the order not found in items', () => {
    const falseKey = 'X';
    const parto = ['R','T','M',falseKey,'C'];
    const order = PartialOrder.encompassList(itemList, parto);
    expect(order.length).toBe(parto.length);
    expect(order.includes(falseKey)).toBe(false);
  });

  it('eliminates groups that contain only one item', () => {
    const falseKey = 'X';
    const goodKey = 'M';
    const parto = ['R','T',[goodKey,falseKey],'C'];
    const order = PartialOrder.encompassList(itemList, parto);
    expect(order.length).toBe(parto.length + 1);
    expect(Array.isArray(order[2])).toBe(false);
    expect(order[2]).toBe(goodKey);
  });
});
