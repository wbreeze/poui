import React, { Component } from 'react';
import Parto from './Parto';

const PartoWithSelection = withSelection(Parto);

function withSelection(Parto) {
  class WithSelection extends Component {
    constructor(props) {
      super(props);
      this.unorderedSelected = this.unorderedSelected.bind(this);
      this.state = {
        ordering: [],
      };
    }

    unorderedSelected(key) {
      this.setState({
        ordering: [...this.state.ordering, key],
      });
    }

    render() {
      return <Parto
        parto={this.state.ordering}
        unorderedItemClick={this.unorderedSelected}
        {...this.props}
      />;
    }
  };

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  WithSelection.displayName = `WithSelection(${getDisplayName(Parto)})`;
  return WithSelection;
};

export default PartoWithSelection;
