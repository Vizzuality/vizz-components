import React from 'react';
import PropTypes from 'prop-types';
import Vega from './Vega';
import configSpec from './thumbnail-theme.json';

const VegaThumbnail = (props) => {
  const { width, height, data, spec } = props;

  return (
    <Vega
      width={width}
      height={height}
      data={data}
      spec={spec}
      config={configSpec}
    />
  );
};

VegaThumbnail.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.object,
  spec: PropTypes.object
};

VegaThumbnail.defaultProps = {
  width: 200,
  height: 180
};

export default VegaThumbnail;
