import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Item extends React.Component {
  static defaultProps = {
    onClickEvent: () => {},
  }

  static propTypes = {
    itemLabel: PropTypes.node.isRequired,
    itemKey: PropTypes.string.isRequired,
    onClickEvent: PropTypes.func,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return(
      nextProps.itemKey !== this.props.itemKey ||
      nextProps.itemLabel !== this.props.itemLabel ||
      nextProps.className !== this.props.className
    );
  }

  clickHandler = (e) => {
    this.props.onClickEvent(this.props.itemKey);
  }

  render() {
    const { itemLabel, itemKey, onClickEvent, className, ...rest } = this.props;
    let itemClass = 'poui-item';
    if (typeof className !== 'undefined') {
      let classes = className.split(' ');
      classes.push(itemClass);
      itemClass = classes.join(' ');
    }
    return (
      <li onClick={this.clickHandler} className={itemClass} {...rest} >
        { itemLabel }
      </li>
    );
  }
};

export default Item;
