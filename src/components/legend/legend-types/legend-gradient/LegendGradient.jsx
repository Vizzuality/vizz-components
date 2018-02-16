import React from 'react';
import PropTypes from 'prop-types';
import './legend-gradient.scss';

export const LegendGradient = ({ legendSpec }) => {
  const items = legendSpec.items.filter(item => item.color !== 'transparent');
  const itemTransparent = legendSpec.items.find(item => item.color === 'transparent');
  const gradient = items.map(item => item.color);

  return (
    <div className="c-legend-gradient">
      <div className="legend-gradient-icon">
        {itemTransparent &&
          <div
            style={{
              width: `${(1 / legendSpec.items.length) * 100}%`
            }}
            className="icon-gradient-transparent"
          />
        }
        <div
          className="icon-gradient"
          style={{
            width: `${(items.length / legendSpec.items.length) * 100}%`,
            backgroundImage: `linear-gradient(to right, ${gradient.join(',')})`
          }}
        />
      </div>
      <ul>
        {legendSpec.items.map(({ name, color, value }) => (
          <li key={`legend-gradient-item-${color}-${value}`}>
            <span className="name">{name || value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

LegendGradient.propTypes = {
  legendSpec: PropTypes.object.isRequired
};

export default LegendGradient;
