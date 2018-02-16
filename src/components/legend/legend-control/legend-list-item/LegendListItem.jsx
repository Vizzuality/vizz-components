import React from 'react';
import PropTypes from 'prop-types';
import Legend from '../../legend-component';
import './legend-list-item.scss';

const LegendListItem = ({ value, onOpacity, onVisibility, onClose, onInfo, onMultiLayer, onFitBounds }) => (
  <li className="c-legend-list-item">
    <Legend
      layerSpec={value}
      onOpacity={onOpacity}
      onVisibility={onVisibility}
      onInfo={onInfo}
      onClose={onClose}
      onMultiLayer={onMultiLayer}
      onFitBounds={onFitBounds}
    />
  </li>
);

LegendListItem.propTypes = {
  value: PropTypes.object,
  onOpacity: PropTypes.func,
  onVisibility: PropTypes.func,
  onInfo: PropTypes.func,
  onClose: PropTypes.func,
  onMultiLayer: PropTypes.func,
  onFitBounds: PropTypes.func
};

LegendListItem.defaultProps = {
  onOpacity: () => {},
  onVisibility: () => {},
  onInfo: () => {},
  onClose: () => {},
  onMultiLayer: () => {},
  onFitBounds: () => {}
};

export default LegendListItem;
