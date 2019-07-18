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

  // Returns a new order with any items not present in keys removed
  selectKeys: (order, keys) => {
    return order.map((key) => {
      if (Array.isArray(key)) {
        return PartialOrder.selectKeys(key, keys);
      } else {
        return keys.includes(key) ? key : null;
      }
    }).filter(key => key != null)
  },

  // Returns a new order with groups containing only one item replaced with
  //   the item
  flattenSoloGroups: (order) => {
    const flat = order.map((key) => {
      if (Array.isArray(key)) {
        if (key.length == 0) {
          return null;
        } else if (key.length == 1) {
          return key[0];
        } else {
          return key;
        }
      } else {
        return key;
      }
    });
    return flat.filter(key => key != null);
  },

  // Returns a new order arranged according to the given order, with
  //  the remaining item keys in a group at the end.
  encompassItems: (items, order) => {
    const keys = ListItems.keys(items);
    const cleanOrder = PartialOrder.selectKeys(order, keys);
    const included = PartialOrder.flatten(cleanOrder);
    const rest = keys.filter((key) => {
      return !included.includes(key);
    });
    return PartialOrder.flattenSoloGroups(cleanOrder.concat([rest]));
  },

  // Return a new group with item and given index removed
  shallowRemoveItem: (group, index) => {
    if (group.length === 2) {
      return (index === 0) ? group[1] : group[0];
    } else {
      return group.slice(0, index).concat(group.slice(index + 1));
    }
  },

  // Return a new group embedded in an array with the given item
  //   outside of the group
  // If the item does not exist in the group, return the group
  //   by itself embedded in an array
  extractItem: (group, item) => {
    const itemIndex = group.indexOf(item);
    if (0 <= itemIndex) {
      return [ item, PartialOrder.shallowRemoveItem(group, itemIndex) ];
    } else {
      return [ group ];
    }
  },

  // Return a new order expanding all top level groups
  flatten: (order) => {
    return order.reduce((acc, val) => acc.concat(val), []);
  },

  // Return a copy of the order with the given item removed
  removeItem: (order, item) => {
    return order.map((element) => {
      if (Array.isArray(element)) {
        const itemIndex = element.indexOf(item);
        if (0 <= itemIndex) {
          return PartialOrder.shallowRemoveItem(element, itemIndex);
        } else {
          return element;
        }
      } else {
        if (element === item) {
          return null;
        } else {
          return element;
        }
      }
    }).filter(element => element !== null);
  },

  // Return a copy of the order with the given item placed
  //   before or after the item given as "target"
  // Before is true places the item before the target
  // Before is false places the item after the target
  // This does NOT protect against the resulting order having the
  //   item in multiple places.
  // If target is not present, returns the original order
  insertItem: (order, item, target, before=true) => {
    return PartialOrder.flatten(order.map((element) => {
      if (Array.isArray(element)) {
        return[ PartialOrder.insertItem(element, item, target, before) ];
      } else {
        if (element === target) {
          return(before ? [ item, target ] : [ target, item ]);
        } else {
          return [ element ];
        }
      }
    }));
  },

  // Return a new order with subject moved relative to target.
  // Subject is an item that we want to move relative to target
  // Target is an item relative to which we place subject
  // Before is true places the subject before the target
  // Before is false places the subject after the target
  // If either subject or target is not present, return the order unchanged.
  moveItem: (order, subject, target, before=true) => {
    const flat = PartialOrder.flatten(order);
    if(flat.includes(subject) && flat.includes(target)) {
      const less = PartialOrder.removeItem(order, subject);
      return PartialOrder.insertItem(less, subject, target, before);
    } else {
      return order;
    }
  },

  // Return a new order with the given item positioned
  //   before the group, but after all or any items that precede the group.
  // If the item is not part of a group, return the order unchanged.
  raiseItem: (order, item) => {
    return PartialOrder.flatten(order.map((element) => {
      if (Array.isArray(element)) {
        return PartialOrder.extractItem(element, item);
      } else {
        return element;
      }
    }));
  },

  // Return a new order with the given item positioned
  //   within a group that follows, or in a new group
  //   with the item that follows
  // If the item is part of a group, return the order unchanged.
  lowerItem: (order, item) => {
    let itemPrecedes = false;
    let newOrder = order.map((element) => {
      if (Array.isArray(element)) {
        if (itemPrecedes) {
          itemPrecedes = false;
          return [item].concat(element);
        } else {
          return element;
        }
      } else {
        if (element === item) {
          itemPrecedes = true;
          return null;
        } else {
          if (itemPrecedes) {
            itemPrecedes = false;
            return [ item, element ];
          } else {
            return element;
          }
        }
      }
    }).filter(element => element !== null);
    if (itemPrecedes) {
      newOrder.push(item);
    }
    return newOrder;
  },
}

export default PartialOrder;
