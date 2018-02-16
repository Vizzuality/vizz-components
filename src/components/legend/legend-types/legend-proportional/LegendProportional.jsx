import React from 'react';
import PropTypes from 'prop-types';
import './legend-proportional.scss';

export const LegendProportional = ({ legendSpec }) => (
  <ul className="c-legend-proportional">
    {legendSpec.items.map(({ name, color, size }) => (
      <li key={`legend-proportional-item-${name}`}>
        <div
          className="icon-proportional"
          style={{ backgroundColor: color, width: size, height: size }}
        />
        <span className="name">{name}</span>
      </li>
    ))}
  </ul>
);

LegendProportional.propTypes = {
  legendSpec: PropTypes.object.isRequired
};

export default LegendProportional;
