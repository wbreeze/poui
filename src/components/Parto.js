import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Item from "./Item"

class Parto extends React.PureComponent {
  static propTypes = {
    itemList: PropTypes.array.isRequired,
    parto: PropTypes.array,
  };

  static defaultProps = {
    parto: [],
  }

  listItems() {
    return this.props.itemList.map((item) => {
      return (<Item key={item.key} itemLabel={item.description} />);
    });
  }

  render() {
    return (
      <div className="poui-parto">
        <ol className="poui-parto-ol">
        </ol>
        <ul className="poui-parto-ul">
          {this.listItems()}
        </ul>
      </div>
    );
  }
};

export default Parto;
