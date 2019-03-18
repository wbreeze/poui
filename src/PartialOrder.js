import ListItems from './ListItems';

// Items is a list of tuples { "key": <key>, "description": <description> }
// Order is an arrangement of keys [ "first", "second" ]
const PartialOrder = {
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

  // Key is a key that we want to move out of a group
  // Return a new order with the given key positioned
  //   before the group, but after all or any that precede the group.
  // If the item is not part of a group, return the order unchanged.
  // Examples
  // raiseItem(['T','L',['M','P'],'A',['C','R','Z']], 'R')
  //   returns ['T','L',['M','P'],'A','R',['C','Z']]
  // raiseItem(['T','L',['M','P'],'A',['C','R','Z']], 'P')
  //   returns ['T','L','P','M','A',['C','R','Z']]
  raiseItem: (order, key) => {
    return order.map((item) => {
      if (Array.isArray(item)) {
        return PartialOrder.extractItem(item, key);
      } else {
        return item;
      }
    }).reduce((acc, val) => acc.concat(val), []);
  },

  // Key is a key that we want to lower into a group
  // Return a new order with the given key positioned
  //   within a group that follows, or in a new group
  //   with the item that follows
  // If the item is part of a group, return the order unchanged.
  // Examples
  // lowerItem(['T','L',['M','P'],'A','C'], 'L')
  //   returns ['T',['L','M','P'],'A','C']
  // lowerItem(['T','L',['M','P'],'A','C'], 'A')
  //   returns ['T','L',['M','P'],['A','C']]
  // lowerItem(['T','L',['M','P'],'A','C'], 'P')
  //   returns ['T','L',['M','P'],'A','C']
  // lowerItem(['T','L',['M','P'],'A','C'], 'Q')
  //   returns ['T','L',['M','P'],'A','C']
  // lowerItem(['T','L',['M','P'],'A','C'], 'C')
  //   returns ['T','L',['M','P'],'A','C']
  lowerItem: (order, key) => {
    let keyPrecedes = false;
    let newOrder = order.map((item) => {
      if (Array.isArray(item)) {
        if (keyPrecedes) {
          keyPrecedes = false;
          return [key].concat(item);
        } else {
          return item;
        }
      } else {
        if (item === key) {
          keyPrecedes = true;
          return null;
        } else {
          if (keyPrecedes) {
            keyPrecedes = false;
            return [ key, item ];
          } else {
            return item;
          }
        }
      }
    }).filter(item => item !== null);
    if (keyPrecedes) {
      newOrder.push(key);
    }
    return newOrder;
  },
}

export default PartialOrder;
