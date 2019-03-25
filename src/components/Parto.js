import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Item from "./Item"
import PartialOrder from "../PartialOrder";

class Parto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragOver: '',
      dragBefore: null,
    }
  };

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

  shouldComponentUpdate(nextProps, nextState) {
    return(nextProps.parto !== this.props.parto);
  }

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
    const dragBefore = this.isDropBefore(ev);
    if (
      key !== item.key &&
      (item.key !== this.state.dragOver || dragBefore !== this.state.dragBefore)
    ) {
      const target = ev.currentTarget;
      let classList = target.classList;
      if (dragBefore) {
        classList.remove('poui-item-dragover-after');
        classList.add('poui-item-dragover-before');
      } else {
        classList.remove('poui-item-dragover-before');
        classList.add('poui-item-dragover-after');
      }
      console.log("ITEM CLASS " + ev.currentTarget.className);
      this.setState({ dragOver: item.key, dragBefore: dragBefore });
      ev.preventDefault();
    }
  }

  dragLeave(ev) {
    let classList = ev.currentTarget.classList;
    classList.remove('poui-item-dragover-before');
    classList.remove('poui-item-dragover-after');
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
        onDragLeave={this.dragLeave}
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
