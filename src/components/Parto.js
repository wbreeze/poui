import React from 'react';
import PropTypes from 'prop-types';
import Item from "./Item"
import PartialOrder from "../PartialOrder";

class Parto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragOver: '',
      dragBefore: null,
    }
    this.dragEnd = this.dragEnd.bind(this);
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

  shouldComponentUpdate(nextProps, nextState) {
    return(
      nextProps.parto !== this.props.parto ||
      nextState.dragOver !== this.state.dragOver ||
      nextState.dragBefore !== this.state.dragBefore
    );
  }

  orderedItems() {
    return PartialOrder.arrangeItemsPerOrder(
      this.props.itemList, this.props.parto);
  }

  startDragging(ev, item) {
    ev.dataTransfer.setData("text/plain", item.description);
    ev.dataTransfer.setData("key", item.key);
    ev.dataTransfer.effectAllowed = "move";
  }

  isAboveChangePoint(ev) {
    const rect = ev.currentTarget.getBoundingClientRect();
    const position = Math.round(ev.clientY - rect.top);
    let changePoint;
    if (this.state.dragBefore) {
      changePoint = Math.round(rect.height - this.state.dragChangePoint);
    } else {
      changePoint = Math.round(this.state.dragChangePoint);
    }
    return (position < changePoint);
  }

  dragOver(ev, item) {
    ev.preventDefault();
    const sourceKey = ev.dataTransfer.getData("key");
    const target = ev.currentTarget;
    if (item.key != sourceKey) {
      if (item.key !== this.state.dragOver) {
        const rect = target.getBoundingClientRect();
        const midPoint = Math.round(rect.height / 2);
        const position = Math.round(ev.clientY - rect.top);
        const dragBefore = (position < midPoint);
        this.setState({
          dragOver: item.key,
          dragChangePoint: midPoint - 2,
          dragBefore: dragBefore,
        });
      } else {
        const dragBefore = this.isAboveChangePoint(ev);
        if (dragBefore !== this.state.dragBefore) {
          this.setState({ ...this.state, dragBefore: dragBefore });
        }
      }
    }
  }

  dragEnd() {
    this.setState({ dragOver: '', dragBefore: null });
  }

  dropped(ev, item) {
    ev.preventDefault();
    const key = ev.dataTransfer.getData("key");
    const dragBefore = this.state.dragBefore;
    this.setState({ dragOver: '', dragBefore: null });
    this.props.itemReorder(key, item.key, dragBefore);
  }

  renderItem(item, onClickEvent) {
    let classNames = ['poui-droptarget'];
    if (item.key === this.state.dragOver) {
      classNames.push(
        this.state.dragBefore ?
        'poui-dragtarget-before' :
        'poui-dragtarget-after'
      );
    }
    return(
      <Item
        key={item.key}
        itemKey={item.key}
        className={classNames.join(' ')}
        onClickEvent={onClickEvent}
        draggable
        onDragStart={(e) => this.startDragging(e, item)}
        onDragOver={(e) => this.dragOver(e, item)}
        onDrop={(e) => this.dropped(e, item)}
        onDragEnd={this.dragEnd}
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
