import React from 'react';
import PropTypes from 'prop-types';
import LegendItem from '../../legend-item/LegendItem';
import './legend-basic.scss';

export const LegendBasic = ({ legendSpec, mode }) => (
  <div className="c-legend-basic">
    <ul className={mode}>
      {legendSpec.items.map(item => (
        <li key={`legend-basic-item-${item.name}`}>
          <LegendItem {...item} />
        </li>
      ))}
    </ul>
  </div>
);

LegendBasic.propTypes = {
  legendSpec: PropTypes.object.isRequired,
  mode: PropTypes.oneOf(['horizontal', 'vertical', 'columns'])
};

LegendBasic.defaultProps = {
  mode: 'columns'
};

export default LegendBasic;
