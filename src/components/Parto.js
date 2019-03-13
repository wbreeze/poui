import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Item from "./Item"
import PartialOrder from "../PartialOrder";

class Parto extends React.PureComponent {
  static propTypes = {
    itemList: PropTypes.array.isRequired,
    parto: PropTypes.array,
  };

  static defaultProps = {
    parto: [],
  }

  orderedItems() {
    return PartialOrder.arrangeItemsPerOrder(
      this.props.itemList, this.props.parto);
  }

  renderedItems(items) {
    return items.map((item) => {
      return (<Item key={item.key} itemLabel={item.description} />);
    });
  }

  render() {
    const ordered = this.orderedItems();
    return (
      <div className="poui-parto">
        <ol className="poui-parto-ol">
          {this.renderedItems(ordered.slice(0,-1))}
        </ol>
        <ul className="poui-parto-ul">
          {this.renderedItems(ordered[ordered.length-1])}
        </ul>
      </div>
    );
  }
};

export default Parto;
