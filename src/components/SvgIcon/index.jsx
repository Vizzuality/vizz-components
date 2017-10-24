import React from 'react';

export default function SvgIcon({ name, className }) {
  return (
    <svg className={`c-icon${className ? ` ${className}` : ''}`}>
      <use xlinkHref={`#${name}`} />
    </svg>
  );
}

SvgIcon.propTypes = {
  name: React.PropTypes.string.isRequired,
  className: React.PropTypes.string
};
