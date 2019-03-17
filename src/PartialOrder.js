import ListItems from './ListItems';

const PartialOrder = {
  selectItems: (items, order) => {
    return order.map((key) => {
      if (Array.isArray(key)) {
        return PartialOrder.selectItems(items, key);
      } else {
        return ListItems.itemFor(items, key);
      }
    }).filter((item) => {
      return item !== null;
    });
  },

  // Items is a list of tuples { "key": <key>, "description": <description> }
  // Order is an arrangement of keys [ "first", "second" ]
  // Returns a list of tuples arranged according to the order, with
  //  the remaining items in an (embedded) list at the end.
  arrangeItemsPerOrder: (items, order) => {
    let ordered = PartialOrder.selectItems(items, order);
    let included = ordered.reduce((acc, val) => acc.concat(val), []);
    let rest = items.filter((item) => {
      return !included.includes(item);
    });
    return ordered.concat([rest]);
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
