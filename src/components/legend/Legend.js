import React from 'react';
import PropTypes from 'prop-types';
import LegendBasic from './legend-basic/LegendBasic';
import LegendChoropleth from './legend-choropleth/LegendChoropleth';
import LegendGradient from './legend-gradient/LegendGradient';

class Legend extends React.PureComponent {
  render() {
    const { layerSpec } = this.props;
    const { name, legendConfig } = layerSpec;
    const { type, unit } = legendConfig;

    return (
      <div className="c-legend">
        <h3>{name} <span className="unit">({unit})</span></h3>
        <div>
          {(type === 'basic') && <LegendBasic legendSpec={legendConfig} />}
          {(type === 'choropleth') && <LegendChoropleth legendSpec={legendConfig} />}
          {(type === 'gradient') && <LegendGradient legendSpec={legendConfig} />}
        </div>
      </div>
    );
  }
}

Legend.propTypes = {
  layerSpec: PropTypes.object
};

export default Legend;
