import './style.scss';
import React from 'react';

function Spinner(props) {
  return (
    <div className="c-loading-spinner">
      <svg width={props.size * 2} height={props.size * 2}>
        <circle
          cx={props.size}
          cy={props.size}
          r={props.size / 2}
          fill="none"
          stroke={props.color}
          strokeWidth={props.width}
          strokeMiterlimit={props.length}
        />
      </svg>
    </div>
  );
}

Spinner.defaultProps = {
  size: 40,
  width: 5,
  length: 10,
  color: 'white'
};

Spinner.propTypes = {
  size: React.PropTypes.number,
  width: React.PropTypes.number,
  length: React.PropTypes.number,
  color: React.PropTypes.string
};

export default Spinner;
