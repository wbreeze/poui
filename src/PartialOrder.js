import ListItems from './ListItems';

const PartialOrder = {
  // Items is a list of tuples { "key": <key>, "description": <description> }
  // Order is an arrangement of keys [ "first", "second" ]
  // Returns a list of tuples arranged according to the order.
  arrangeItemsPerOrder: (items, order) => {
    return order.map((key) => {
      if (Array.isArray(key)) {
        return PartialOrder.arrangeItemsPerOrder(items, key);
      } else {
        return ListItems.itemFor(items, key);
      }
    });
  },

  selectKeys: (keys, order) => {
    return order.map((key) => {
      if (Array.isArray(key)) {
        return PartialOrder.selectKeys(keys, key);
      } else {
        return keys.includes(key) ? key : null;
      }
    }).filter(key => key != null)
  },

  flattenSoloGroups: (order) => {
    return order.map((key) => {
      if (Array.isArray(key)) {
        if (key.length == 1) {
          return key[0];
        } else {
          return key;
        }
      } else {
        return key;
      }
    });
  },

  // Items is a list of tuples { "key": <key>, "description": <description> }
  // Order is an arrangement of keys [ "first", "second" ]
  // Returns a new order arranged according to the given order, with
  //  the remaining item keys in an (embedded) list at the end.
  encompassItems: (items, order) => {
    const keys = ListItems.keys(items);
    const cleanOrder = PartialOrder.selectKeys(keys, order);
    const included = cleanOrder.reduce((acc, val) => acc.concat(val), []);
    const rest = keys.filter((key) => {
      return !included.includes(key);
    });
    return PartialOrder.flattenSoloGroups(cleanOrder).concat([rest]);
  },

  removeItem: (order, index) => {
    if (order.length === 2) {
      return (index === 0) ? order[1] : order[0];
    } else {
      return order.slice(0, index).concat(order.slice(index + 1));
    }
  },

  extractItem: (order, key) => {
    const keyIndex = order.indexOf(key);
    if (0 <= keyIndex) {
      return [ key, PartialOrder.removeItem(order, keyIndex) ];
    } else {
      return [ order ];
    }
  },

  // Order is an arrangement of keys [ "first", "second" ]
  // key is a key that we want to move out of a group
  // Return a new order with the given key positioned
  //   before the group, but after all or any that precede the group.
  // If the item is not part of a group, return the order unchanged.
  // Examples
  // raiseItem(['T','L',['M','P'],'A',['C','R','Z']], 'R')
  //   returns ['T','L',['M','P'],'A','R',['C','Z']]
  // raiseItem(['T','L',['M','P'],'A',['C','R','Z']], 'P')
  //   returns ['T','L','P','M','A',['C','R','Z']]
  raiseItem: (order, key) => {
    const newOrder = order.map((item) => {
      if (Array.isArray(item)) {
        return PartialOrder.extractItem(item, key);
      } else {
        return item;
      }
    }).reduce((acc, val) => acc.concat(val), []);
    return newOrder;
  }
}

export default PartialOrder;
