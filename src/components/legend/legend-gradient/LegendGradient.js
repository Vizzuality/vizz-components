import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './legend-gradient.scss';

export const LegendGradient = ({ legendSpec }) => {
  const gradient = legendSpec.items.map(item => item.color);

  return (
    <div styleName="c-legend-gradient">
      <div styleName="icon-gradient" style={{ backgroundImage: `linear-gradient(to right, ${gradient.join(',')})` }} />
      <ul>
        {legendSpec.items.map(({ name, id }) => (
          <li key={id || name}>
            <span styleName="name">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

LegendGradient.propTypes = {
  legendSpec: PropTypes.object.isRequired
};

export default CSSModules(LegendGradient, styles);
