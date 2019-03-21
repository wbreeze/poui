import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Item from "./Item"
import PartialOrder from "../PartialOrder";

class Parto extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    orderedItemClick: () => {},
    unorderedItemClick: () => {},
    itemReorder: () => {},
  }

  static propTypes = {
    itemList: PropTypes.array.isRequired,
    parto: PropTypes.array.isRequired,
    orderedItemClick: PropTypes.func,
    unorderedItemClick: PropTypes.func,
    itemReorder: PropTypes.func,
  };

  orderedItems() {
    return PartialOrder.arrangeItemsPerOrder(
      this.props.itemList, this.props.parto);
  }

  startDragging(ev, item) {
    ev.dataTransfer.setData("text/plain", item.description);
    ev.dataTransfer.setData("key", item.key);
    ev.dataTransfer.effectAllowed = "move";
  }

  isDropBefore(ev) {
    const targetItem = ev.currentTarget;
    const rect = targetItem.getBoundingClientRect();
    const position = Math.round(ev.clientY - rect.top);
    const midpoint = Math.round(rect.height / 2);
    return (position < midpoint);
  }

  dragOver(ev, item) {
    const key = ev.dataTransfer.getData("key");
    if (key != item.key) {
      ev.preventDefault();
    }
  }

  dropped(ev, item) {
    ev.preventDefault();
    const key = ev.dataTransfer.getData("key");
    this.props.itemReorder(key, item.key, this.isDropBefore(ev));
  }

  renderItem(item, onClickEvent) {
    return(
      <Item
        key={item.key}
        itemKey={item.key}
        itemLabel={item.description}
        onClickEvent={onClickEvent}
        draggable
        onDragStart={(e) => this.startDragging(e, item)}
        onDragOver={(e) => this.dragOver(e, item)}
        onDrop={(e) => this.dropped(e, item)}
      />
    );
  }

  renderedItemsKey(items) {
    return items.map((i) => {
      return Array.isArray(i) ? "-" + this.renderedItemsKey(i) + "-" : i.key;
    }).join("-");
  }

  renderedItemsUL(items) {
    return(
      <li key={this.renderedItemsKey(items)}>
        <ul className="poui-parto-ul">
          {this.renderedItems(items, this.props.unorderedItemClick)}
        </ul>
      </li>
    );
  }

  renderedItems(items, onClickEvent) {
    return items.map((item) => {
      if (Array.isArray(item)) {
        return this.renderedItemsUL(item);
      } else {
        return this.renderItem(item, onClickEvent);
      }
    });
  }

  render() {
    const ordered = this.orderedItems();
    return (
      <div className="poui-parto">
        <ol className="poui-parto-ol">
          {this.renderedItems(ordered, this.props.orderedItemClick)}
        </ol>
      </div>
    );
  }
};

export default Parto;
