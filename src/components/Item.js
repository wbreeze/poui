import React from 'react';
import PropTypes from 'prop-types';

const Item = ({itemLabel}) => (
  <li>
    { itemLabel }
  </li>
);

Item.propTypes = {
  itemLabel: PropTypes.node.isRequired,
};

export default Item;
