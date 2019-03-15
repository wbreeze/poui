import ListItems from '../ListItems';
import ListItemsFixtures from '../fixtures/ListItemsFixtures';

describe('ListItems', () => {
  const items = ListItemsFixtures.salad.splice(0,4);

  it ('returns the keys in order', () => {
    expect(ListItems.keys(items)).toEqual(['Z','R','C','T']);
  });

  it ('returns the descriptions in order', () => {
    expect(ListItems.descriptions(items)).toEqual([
      'Zanahoria', 'Remolacha', 'Calabaza', 'Tomate',
    ]);
  });

  it ('finds an item with given key', () => {
    expect(ListItems.itemFor(items, 'C')).toEqual(
      { "key": 'C', "description": 'Calabaza' },
    );
  });
});
