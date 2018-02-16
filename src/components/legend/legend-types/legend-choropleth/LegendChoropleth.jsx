import React from 'react';
import PropTypes from 'prop-types';
import './legend-choropleth.scss';

export const LegendChoropleth = ({ legendSpec }) => (
  <ul className="c-legend-choropleth">
    {legendSpec.items.map(({ name, value, color }) => (
      <li key={`legend-choropleth-item-${name || value}`}>
        <div className="icon-choropleth" style={{ backgroundColor: color }} />
        <span className="name">{name || value}</span>
      </li>
    ))}
  </ul>
);

LegendChoropleth.propTypes = {
  legendSpec: PropTypes.object.isRequired
};

export default LegendChoropleth;
