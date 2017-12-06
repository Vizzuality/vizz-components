import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Legend from '../../Legend';
import styles from './legend-list-item.scss';

const LegendListItem = ({ value }) => (
  <li styleName="c-legend-list-item">
    <Legend layerSpec={value} />
  </li>
);

LegendListItem.propTypes = {
  value: PropTypes.object
};

export default CSSModules(LegendListItem, styles);
