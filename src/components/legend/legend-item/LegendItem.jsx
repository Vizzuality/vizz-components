import React from 'react';
import PropTypes from 'prop-types';
import './legend-item.scss';

export const LegendItem = ({ name, color, size, icon }) => {
  const getIconHtml = (iconName) => {
    if (iconName === 'triangle') {
      return (
        <div
          className={`icon-${icon}`}
          style={{
            boderRightWidth: (size / 2),
            boderLeftWidth: (size / 2),
            boderBottomWidth: size,
            borderBottomColor: color
          }}
        />
      );
    }

    if (iconName === 'line') {
      return (<div className={`icon-${icon}`} style={{ width: size, backgroundColor: color }} />);
    }

    if (iconName === 'square' || iconName === 'circle') {
      return (
        <div
          className={`icon-${icon}`}
          style={{ width: size, height: size, backgroundColor: color }}
        />
      );
    }

    return (
      <div className="custom-icon">
        <img src={icon} alt={name} />
      </div>
    );
  };

  return (
    <div className="c-legend-item">
      {getIconHtml(icon)}
      <span className="name">{name}</span>
    </div>
  );
};

LegendItem.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string // triangle, circle, square, line
};

LegendItem.defaultProps = {
  size: 12,
  color: '#64d1b8',
  name: 'Power',
  icon: 'square'
};

export default LegendItem;
