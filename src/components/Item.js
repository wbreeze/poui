import React from 'react';
import PropTypes from 'prop-types';

class Item extends React.Component {
  static defaultProps = {
    onClickEvent: () => {},
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    onClickEvent: PropTypes.func,
    itemKey: PropTypes.string
  }

  shouldComponentUpdate(nextProps) {
    return(
      nextProps.itemKey !== this.props.itemKey ||
      nextProps.className !== this.props.className
    );
  }

  clickHandler = () => {
    this.props.onClickEvent(this.props.itemKey);
  }

  render() {
    const { children, className, ...rest } = this.props;
    delete rest.itemKey;
    delete rest.onClickEvent;
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
}

export default Item;
