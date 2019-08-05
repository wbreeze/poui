import React from 'react';
import PropTypes from 'prop-types';
import Item from "./Item"
import PartialOrder from "../PartialOrder";

class Parto extends React.Component {
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

  shouldComponentUpdate(nextProps) {
    return(
      nextProps.parto !== this.props.parto
    );
  }

  orderedItems() {
    return PartialOrder.arrangeItemsPerOrder(
      this.props.itemList, this.props.parto);
  }

  renderItem(item, onClickEvent) {
    return(
      <Item
        key={item.key}
        itemKey={item.key}
        onClickEvent={onClickEvent}
      >
        <div
          className='poui-parto-item'
        > {item.description} </div>
      </Item>
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
}

export default Parto;
