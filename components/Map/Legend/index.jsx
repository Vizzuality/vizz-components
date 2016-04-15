'use strict';

import './style.css';
import _ from 'underscore';
import Backbone from 'backbone';
import React from 'react';
import LegendItem from './LegendItem';

class Legend extends React.Component {

  constructor(props) {
    super(props);
  }

  updateLayersSpec(params) {
    const layerSpec = this.props.layersSpec.find({ name: params.name });
    if (layerSpec) {
      layerSpec.set({ active: params.active });
    }
    this.props.onChange(this.props.layersSpec);
  }

  render() {
    const legendItems = _.map(this.props.layersSpec.models, (layerSpec, i) => {
      return (
        <LegendItem
          key={ i }
          name={ layerSpec.attributes.name }
          active={ layerSpec.attributes.active }
          onChange={ this.updateLayersSpec.bind(this) } />
      );
    });
    return (
      <div className="legend-component">
        <ul>
          { legendItems }
        </ul>
      </div>
    );
  }

}

Legend.propTypes = {
  layersSpec: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.instanceOf(Backbone.Collection)
  ]),
  onChange: React.PropTypes.func
};

Legend.defaultProps = {
  onChange: function() {}
};

export default Legend;
