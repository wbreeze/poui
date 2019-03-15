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
  }
}

export default PartialOrder;
