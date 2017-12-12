import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './legend-choropleth.scss';

export const LegendChoropleth = ({ legendSpec }) => (
  <ul styleName="c-legend-choropleth">
    {legendSpec.items.map(({ id, name, color }) => (
      <li key={id || name}>
        <div styleName="icon-choropleth" style={{ backgroundColor: color }} />
        <span styleName="name">{name}</span>
      </li>
    ))}
  </ul>
);

LegendChoropleth.propTypes = {
  legendSpec: PropTypes.object.isRequired
};

export default CSSModules(LegendChoropleth, styles);
