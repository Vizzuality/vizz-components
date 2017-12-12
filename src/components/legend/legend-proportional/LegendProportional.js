import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './legend-proportional.scss';

export const LegendProportional = ({ legendSpec }) => (
  <ul styleName="c-legend-proportional">
    {legendSpec.items.map(({ id, name, color, size }) => (
      <li key={id || name}>
        <div
          styleName="icon-proportional"
          style={{ backgroundColor: color, width: size, height: size }}
        />
        <span styleName="name">{name}</span>
      </li>
    ))}
  </ul>
);

LegendProportional.propTypes = {
  legendSpec: PropTypes.object.isRequired
};

export default CSSModules(LegendProportional, styles);
