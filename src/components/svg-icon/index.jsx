import React from 'react';
import PropTypes from 'prop-types';

export default function SvgIcon({ name, className }) {
  return (
    <svg className={`c-icon${className ? ` ${className}` : ''}`}>
      <use xlinkHref={`#${name}`} />
    </svg>
  );
}

SvgIcon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string
};
