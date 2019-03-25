import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Item extends React.Component {
  static defaultProps = {
    onClickEvent: () => {},
  }

  static propTypes = {
    itemKey: PropTypes.string.isRequired,
    onClickEvent: PropTypes.func,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return(
      nextProps.itemKey !== this.props.itemKey ||
      nextProps.className !== this.props.className
    );
  }

  clickHandler = (e) => {
    this.props.onClickEvent(this.props.itemKey);
  }

  render() {
    const { itemKey, children, onClickEvent, className, ...rest } = this.props;
    let itemClass = 'poui-item';
    if (typeof className !== 'undefined') {
      let classes = className.split(' ');
      classes.push(itemClass);
      itemClass = classes.join(' ');
    }
    return (
      <li onClick={this.clickHandler} className={itemClass} {...rest} >
        { children }
      </li>
    );
  }
};

export default Item;
