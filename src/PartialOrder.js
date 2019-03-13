import ListItems from './ListItems';

const PartialOrder = {
  // Items is a list of tuples { "key": <key>, "description": <description> }
  // Order is an arrangement of keys [ "first", "second" ]
  // Returns a list of tuples arranged according to the order, with
  //  the remaining items in an (embedded) list at the end.
  arrangeItemsPerOrder: (items, order) => {
    let ordered = order.map((key) => {
      return ListItems.itemFor(items, key);
    });
    let rest = items.filter((item) => {
      return !ordered.includes(item);
    });
    return [...ordered, rest];
  }
}

export default PartialOrder;
