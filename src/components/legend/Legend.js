import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import LegendBasic from './legend-basic/LegendBasic';
import LegendChoropleth from './legend-choropleth/LegendChoropleth';
import LegendGradient from './legend-gradient/LegendGradient';
import styles from './legend.scss';

export class Legend extends React.PureComponent {
  render() {
    const { layerSpec } = this.props;
    const { name, legendConfig } = layerSpec;
    const { type, unit } = legendConfig;

    return (
      <div styleName="c-legend">
        <h3>{name} {unit && <span>({unit})</span>}</h3>
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

export default CSSModules(Legend, styles);
