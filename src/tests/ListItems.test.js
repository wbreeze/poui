import ListItems from '../ListItems';

describe('ListItems', () => {
  it ('returns the keys in order', () => {
    expect(ListItems.keys(ListItems.sample)).toEqual(['Z','R','C','T']);
  });

  it ('returns the descriptions in order', () => {
    expect(ListItems.descriptions(ListItems.sample)).toEqual([
      'Zanahoria', 'Remolacha', 'Calabaza', 'Tomate',
    ]);
  });

  it ('finds an item with given key', () => {
    expect(ListItems.itemFor(ListItems.sample, 'C')).toEqual(
      { "key": 'C', "description": 'Calabaza' },
    );
  });
});
