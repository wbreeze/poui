import React, { Component } from 'react';
import Parto from './Parto';

const PartoWithSelection = withSelection(Parto);

function withSelection(Parto) {
  class WithSelection extends Component {
    constructor(props) {
      super(props);
      this.unorderedSelected = this.unorderedSelected.bind(this);
      this.state = {
        ordering: props.parto || [],
      };
    }

    unorderedSelected(key) {
      this.setState({
        ordering: [...this.state.ordering, key],
      });
    }

    render() {
      const props = {...this.props,
        parto: this.state.ordering,
        unorderedItemClick: this.unorderedSelected,
      }
      return <Parto {...props} />;
    }
  };

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  WithSelection.displayName = `WithSelection(${getDisplayName(Parto)})`;
  return WithSelection;
};

export default PartoWithSelection;
