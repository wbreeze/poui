import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Item from "./Item"
import PartialOrder from "../PartialOrder";

class Parto extends React.PureComponent {
  static defaultProps = {
    orderedItemClick: () => {},
    unorderedItemClick: () => {},
  }

  static propTypes = {
    itemList: PropTypes.array.isRequired,
    parto: PropTypes.array,
    orderedItemClick: PropTypes.func,
    unorderedItemClick: PropTypes.func,
  };

  static defaultProps = {
    parto: [],
  }

  orderedItems() {
    return PartialOrder.arrangeItemsPerOrder(
      this.props.itemList, this.props.parto);
  }

  renderItem(item, onClickEvent) {
    return (
      <Item
        key={item.key}
        itemKey={item.key}
        itemLabel={item.description}
        onClickEvent={onClickEvent}
      />
    );
  }

  renderedItemsKey(items) {
    return items.map((i) => {
      return Array.isArray(i) ? "-" + this.renderedItemsKey(i) + "-" : i.key;
    }).join("-");
  }

  renderedItemsUL(items, onClickEvent) {
    return(
      <li key={this.renderedItemsKey(items)}>
        <ul className="poui-porto-ul">
          {this.renderedItems(items, onClickEvent)}
        </ul>
      </li>
    );
  }

  renderedItems(items, onClickEvent) {
    return items.map((item) => {
      if (Array.isArray(item)) {
        return this.renderedItemsUL(item, onClickEvent);
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
          {this.renderedItems(
            ordered.slice(0,-1), this.props.orderedItemClick)}
        </ol>
        <ul className="poui-parto-ul">
          {this.renderedItems(
            ordered[ordered.length-1], this.props.unorderedItemClick)}
        </ul>
      </div>
    );
  }
};

export default Parto;
