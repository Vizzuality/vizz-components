import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './style.scss';

export function Spinner(props) {
  return (
    <div styleName="c-spinner" style={{ width: props.size, height: props.size }}>
      <svg width={props.size * 2} height={props.size * 2}>
        <circle
          cx={props.size}
          cy={props.size}
          r={props.size / 2}
          fill="none"
          stroke={props.color}
          strokeWidth={props.strokeWidth}
          strokeMiterlimit={10}
        />
      </svg>
    </div>
  );
}

Spinner.defaultProps = {
  size: 40,
  strokeWidth: 5,
  color: '#64d1b8'
};

Spinner.propTypes = {
  /**
   * Width and height in pixels
   */
  size: PropTypes.number,
  /**
   * Width of line circle in pixels
   */
  strokeWidth: PropTypes.number,
  /**
   * HEX or name color
   */
  color: PropTypes.string
};

export default CSSModules(Spinner, styles);
