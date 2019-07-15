import React, { Component } from "react";
import PropTypes from "prop-types";
import Parto from "./Parto";
import PartialOrder from "../PartialOrder";

const PartoWithSelection = withSelection(Parto);

function withSelection(Parto) {
  class WithSelection extends Component {
    static propTypes = {
      parto: PropTypes.array.isRequired,
      itemList: PropTypes.array.isRequired,
      updateOrdering: PropTypes.func
    }

    constructor(props) {
      super(props);
      const ordering = props.parto || [];
      this.unorderedSelected = this.unorderedSelected.bind(this);
      this.orderedSelected = this.orderedSelected.bind(this);
      this.itemReorder = this.itemReorder.bind(this);
      this.orderingCallback = this.props.updateOrdering || (() => {});
      this.state = {
        ordering: PartialOrder.encompassItems(props.itemList, ordering),
      };
    }

    updateOrdering(updatedOrdering) {
      this.setState({ ordering: updatedOrdering });
      this.orderingCallback(updatedOrdering);
    }

    unorderedSelected(key) {
      const updatedOrdering = PartialOrder.raiseItem(this.state.ordering, key);
      this.updateOrdering(updatedOrdering);
    }

    orderedSelected(key) {
      const updatedOrdering = PartialOrder.lowerItem(this.state.ordering, key);
      this.updateOrdering(updatedOrdering);
    }

    itemReorder(subject, target, before) {
      const updatedOrdering = PartialOrder.moveItem(this.state.ordering,
        subject, target, before);
      this.updateOrdering(updatedOrdering);
    }

    render() {
      const props = {...this.props,
        parto: this.state.ordering,
        unorderedItemClick: this.unorderedSelected,
        orderedItemClick: this.orderedSelected,
        itemReorder: this.itemReorder,
      }
      return <Parto {...props} />;
    }
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  WithSelection.displayName = `WithSelection(${getDisplayName(Parto)})`;
  return WithSelection;
}

export default PartoWithSelection;
