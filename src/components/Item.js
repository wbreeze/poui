import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Item extends React.PureComponent {
  static defaultProps = {
    onClickEvent: () => {},
  }

  static propTypes = {
    itemLabel: PropTypes.node.isRequired,
    onClickEvent: PropTypes.func,
  }

  clickHandler = (e) => {
    this.props.onClickEvent(this);
  }

  render() {
    return (
      <li className="poui-item" onClick={this.clickHandler}>
        { this.props.itemLabel }
      </li>
    );
  }
};

export default Item;
