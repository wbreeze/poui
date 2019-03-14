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

  renderedItems(items, onClickEvent) {
    return items.map((item) => {
      return (
        <Item
          key={item.key}
          itemKey={item.key}
          itemLabel={item.description}
          onClickEvent={onClickEvent}
        />
      );
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
