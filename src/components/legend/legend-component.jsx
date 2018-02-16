import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LegendActions from './legend-actions';
import LegendNexGDDPToolbar from './legend-nexgddp-toolbar';
import LegendBasic from './legend-types/legend-basic/LegendBasic';
import LegendChoropleth from './legend-types/legend-choropleth/LegendChoropleth';
import LegendGradient from './legend-types/legend-gradient/LegendGradient';

import './legend-style.scss';

class Legend extends PureComponent {
  getLegendToolbar() {
    const { layerSpec, onMultiLayer } = this.props;
    if (layerSpec.provider === 'nexgddp') {
      return (
        <LegendNexGDDPToolbar
          layerSpec={layerSpec}
          onMultiLayer={onMultiLayer}
        />
      );
    }
    return null;
  }

  render() {
    const { layerSpec, onOpacity, onVisibility, onClose, onMultiLayer, onFitBounds, onInfo } = this.props;
    const { name, legendConfig } = layerSpec;
    const { type, unit } = legendConfig;

    return (
      <div className="c-legend">
        <div className="c-legend-header">
          <h3>{name} {unit && <span>({unit})</span>}</h3>
          {this.props.actions &&
            <LegendActions
              layerSpec={layerSpec}
              onOpacity={onOpacity}
              onVisibility={onVisibility}
              onFitBounds={onFitBounds}
              onInfo={onInfo}
              onClose={onClose}
              onMultiLayer={onMultiLayer}
            />}
        </div>
        {this.props.toolbar && this.getLegendToolbar()}
        <div className="c-legend-content">
          {(type === 'basic') && <LegendBasic legendSpec={legendConfig} />}
          {(type === 'choropleth') && <LegendChoropleth legendSpec={legendConfig} />}
          {(type === 'gradient') && <LegendGradient legendSpec={legendConfig} />}
        </div>
      </div>
    );
  }
}

Legend.propTypes = {
  layerSpec: PropTypes.object,
  actions: PropTypes.bool,
  toolbar: PropTypes.bool,
  onOpacity: PropTypes.func,
  onVisibility: PropTypes.func,
  onInfo: PropTypes.func,
  onClose: PropTypes.func,
  onMultiLayer: PropTypes.func,
  onFitBounds: PropTypes.func
};

Legend.defaultProps = {
  actions: true,
  toolbar: true,
  updateOpacity: () => {},
  onVisibility: () => {},
  onInfo: () => {},
  onClose: () => {},
  onMultiLayer: () => {},
  onFitBounds: () => {}
};

export default Legend;
