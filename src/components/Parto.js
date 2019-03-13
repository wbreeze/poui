import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Item from "./Item"

class Parto extends React.PureComponent {
  static propTypes = {
    itemList: PropTypes.array.isRequired,
  };

  listItems() {
    return this.props.itemList.map((item) => {
      return (<Item key={item.key} itemLabel={item.description} />);
    });
  }

  render() {
    return (
      <ol className="poui-parto">
        {this.listItems()}
      </ol>
    );
  }
};

export default Parto;
