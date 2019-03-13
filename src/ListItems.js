// functions for manipulating data structured as demonstrated by sample
const ListItems = {
  sample: [
    { "key": 'Z', "description": 'Zanahoria' },
    { "key": 'R', "description": 'Remolacha' },
    { "key": 'C', "description": 'Calabaza' },
    { "key": 'T', "description": 'Tomate' },
  ],

  // returns an array of the item keys
  // ordered as found in items
  keys: (items) => {
    return items.map((item) => {
      return item.key;
    });
  },

  // returns an array of the item descriptions,
  // ordered as found in items
  descriptions: (items) => {
    return items.map((item) => {
      return item.description;
    });
  },

  // returns an individual item with matching key
  // returns null if there is no such
  itemFor: (items, key) => {
    const index = ListItems.keys(items).indexOf(key);
    return (index < 0) ? null : items[index];
  },
}

export default ListItems;
