import React from 'react';
import PropTypes from 'prop-types';
import LegendList from './legend-list/LegendList';
// import { getTitle } from 'components/dataset-card/dataset-helper';
import './legend-control.scss';

export class LegendControl extends React.PureComponent {
  static getMultipleLegendList({ datasetsSpec }) {
    return datasetsSpec.map(d => (
      <div key={`legent-item-${d.id}`}>
        {/* <h2>{getTitle(d)}</h2> */}
        <LegendList items={d.layer} />
      </div>
    ));
  }

  constructor(props) {
    super(props);
    this.state = {
      collapsed: props.collapsed
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const { layersSpec, datasetsSpec, position, sortable, onOpacity, onVisibility, onClose, onInfo, onMultiLayer, onFitBounds } = this.props;
    const { collapsed } = this.state;

    return (
      <div className={`c-legend-control -${position}`}>
        <div className="c-legend-collapse-button">
          {collapsed ?
            <button className="button-closed" type="button" onClick={this.toggle}>
              <span className="help">View legend</span>
              <svg width="10" height="7" viewBox="0 0 10 7">
                <title>Open</title>
                <path d="M5.657.707L4.95 0 0 4.95l1.414 1.414L4.95 2.828l3.535 3.536L9.9 4.95 5.657.707z" fillRule="evenodd" />
              </svg>
            </button> :
            <button className="button-opened" type="button" onClick={this.toggle}>
              <svg width="10" height="7" viewBox="0 0 10 7">
                <title>Open</title>
                <path d="M5.657.707L4.95 0 0 4.95l1.414 1.414L4.95 2.828l3.535 3.536L9.9 4.95 5.657.707z" fillRule="evenodd" />
              </svg>
            </button>}
        </div>
        <div className={`c-legend-panel ${collapsed ? '-collapsed' : ''}`}>
          { (layersSpec && layersSpec.length > 0) &&
            <LegendList
              onSortChange={this.props.onSortChange}
              items={layersSpec}
              sortable={sortable}
              onOpacity={onOpacity}
              onVisibility={onVisibility}
              onInfo={onInfo}
              onClose={onClose}
              onMultiLayer={onMultiLayer}
              onFitBounds={onFitBounds}
            /> }

          { (datasetsSpec && datasetsSpec.length > 0) &&
            LegendControl.getMultipleLegendList({ datasetsSpec }) }
        </div>
      </div>
    );
  }
}

LegendControl.propTypes = {
  layersSpec: PropTypes.array,
  datasetsSpec: PropTypes.array,
  sortable: PropTypes.bool,
  collapsed: PropTypes.bool,
  position: PropTypes.oneOf(['topright', 'topleft', 'bottomright', 'bottomleft']),
  onSortChange: PropTypes.func,
  onOpacity: PropTypes.func,
  onVisibility: PropTypes.func,
  onInfo: PropTypes.func,
  onClose: PropTypes.func,
  onMultiLayer: PropTypes.func,
  onFitBounds: PropTypes.func
};

LegendControl.defaultProps = {
  layersSpec: [],
  datasetsSpec: [],
  sortable: true,
  collapsed: false,
  position: 'bottomright',
  onSortChange: () => {},
  onOpacity: () => {},
  onVisibility: () => {},
  onInfo: () => {},
  onClose: () => {},
  onMultiLayer: () => {},
  onFitBounds: () => {}
};

export default LegendControl;
