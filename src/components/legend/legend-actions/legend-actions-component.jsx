import React from 'react';
import PropTypes from 'prop-types';

import { logEvent } from 'helpers/analytics';

import LegendOpacitySelector from 'components/legend/legend-opacity-selector';
import LegendMultiLayerSelector from 'components/legend/legend-multi-layer-selector';
import Icon from 'components/ui/Icon';

import './legend-actions-style.scss';

class LegendActions extends React.Component {
  /**
   * Event handler executed when the user toggles the
   * info sidebar of a dataset
   * @param {object} layer Layer
   */
  onClickInfo(layer) {
    this.props.onInfo(layer);

    if (!layer.isSelected) {
      logEvent('Explore menu', 'Click for more info', layer.name);
    }
  }

  render() {
    const { layerSpec, onOpacity, onVisibility, onMultiLayer, onFitBounds, onClose } = this.props;

    return (
      <div className="c-legend-actions">
        {layerSpec.layerConfig && layerSpec.layerConfig.bbox &&
          <button
            type="button"
            onClick={() => onFitBounds(layerSpec)}
          >
            <Icon name="icon-bbox" className="-normal" />
          </button>
        }


        <LegendOpacitySelector
          layerSpec={layerSpec}
          onOpacityChange={onOpacity}
        />

        {layerSpec.provider !== 'nexgddp' && layerSpec.layers.length > 1 &&
          <LegendMultiLayerSelector
            layerSpec={layerSpec}
            onMultiLayer={onMultiLayer}
          />
        }

        <button
          type="button"
          className={layerSpec.visibility ? '' : '-active'}
          onClick={() => onVisibility(layerSpec)}
        >
          {layerSpec.visibility ?
            <Icon name="icon-hide" className="-normal" /> :
            <Icon name="icon-show" className="-normal" />}
        </button>
        <button
          type="button"
          className={layerSpec.isSelected ? '-active' : ''}
          onClick={() => this.onClickInfo(layerSpec)}
        >
          <Icon name="icon-info" className="-normal" />
        </button>
        <button
          type="button"
          onClick={() => onClose(layerSpec)}
        >
          <Icon name="icon-cross" className="-normal" />
        </button>
      </div>
    );
  }
}

LegendActions.propTypes = {
  layerSpec: PropTypes.object,
  onOpacity: PropTypes.func,
  onVisibility: PropTypes.func,
  onInfo: PropTypes.func,
  onClose: PropTypes.func,
  onMultiLayer: PropTypes.func,
  onFitBounds: PropTypes.func
};

LegendActions.defaultProps = {
  onOpacity: () => {},
  onVisibility: () => {},
  onInfo: () => {},
  onClose: () => {},
  onMultiLayer: () => {},
  onFitBounds: () => {}
};

export default LegendActions;
