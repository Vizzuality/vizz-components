import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import LegendItem from '../legend-item/LegendItem';
import styles from './legend-basic.scss';

export const LegendBasic = ({ legendSpec, mode }) => (
  <div styleName="c-legend-basic">
    <ul styleName={mode}>
      {legendSpec.items.map(item => (
        <li key={item.id || item.name}>
          <LegendItem {...item} />
        </li>
      ))}
    </ul>
  </div>
);

LegendBasic.propTypes = {
  legendSpec: PropTypes.object.isRequired,
  mode: PropTypes.oneOf(['horizontal', 'vertical'])
};

LegendBasic.defaultProps = {
  mode: 'horizontal'
};

export default CSSModules(LegendBasic, styles);
