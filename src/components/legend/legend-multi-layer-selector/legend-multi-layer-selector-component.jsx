import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import sortBy from 'lodash/sortBy';

import Tooltip from 'rc-tooltip/dist/rc-tooltip';
import Icon from 'components/ui/Icon';

import 'rc-tooltip/assets/bootstrap_white.css';
import './legend-multi-layer-selector-styles.scss';

class LegendMultiLayerSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibility: false
    };

    // BINDINGS //
    this.onVisibleChange = this.onVisibleChange.bind(this);
    this.onChangeLayer = this.onChangeLayer.bind(this);
  }

  onVisibleChange(visibility) {
    this.setState({
      visibility
    });
  }

  onChangeLayer(layer) {
    this.props.onMultiLayer({
      layerId: layer.id,
      id: layer.dataset
    });
  }

  render() {
    const { layerSpec } = this.props;
    const { visibility } = this.state;

    const buttonClass = classnames({
      '-active': visibility
    });

    const tooltipContent = (
      <div className="tooltip-content">
        <h5 className="title">Layers</h5>

        <ul className="layer-list">
          {sortBy(layerSpec.layers, 'name').map((l) => {
            const liClass = classnames({
              '-active': layerSpec.id === l.id
            });

            return (
              <li
                key={l.id}
                className={liClass}
              >
                <button onClick={() => this.onChangeLayer(l)}>
                  {l.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );

    return (
      <div className="c-legend-multi-layer-selector">
        <Tooltip
          overlay={tooltipContent}
          placement="bottom"
          trigger="click"
          overlayClassName="c-legend-multi-layer-selector"
          onVisibleChange={this.onVisibleChange}
        >
          <button
            type="button"
            onClick={() => this.setState({ visibility: !visibility })}
            className={buttonClass}
          >
            <Icon name="icon-layers" className="-normal" />
          </button>
        </Tooltip>
      </div>
    );
  }
}

LegendMultiLayerSelector.propTypes = {
  layerSpec: PropTypes.object,
  onMultiLayer: PropTypes.func
};

export default LegendMultiLayerSelector;
