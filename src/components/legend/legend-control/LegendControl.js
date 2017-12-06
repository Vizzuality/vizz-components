import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import LegendList from './legend-list/LegendList';
import styles from './legend-control.scss';

export class LegendControl extends React.PureComponent {
  static getLegendList({ layersSpec, sortable }) {
    return (<LegendList items={layersSpec} sortable={sortable} />);
  }

  static getMultipleLegendList({ datasetsSpec }) {
    return datasetsSpec.map(({ id, name, layer }) => (
      <div key={`legent-item-${id}`}>
        <h2>{name}</h2>
        <LegendList items={layer} sortable={false} />
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
    const { layersSpec, datasetsSpec, position, sortable } = this.props;
    const { collapsed } = this.state;

    return (
      <div styleName={`c-legend-control -${position}`}>
        {collapsed ?
          <button type="button" onClick={this.toggle}>Open</button> :
          <button type="button" onClick={this.toggle}>Close</button>}
        <div styleName={`c-legend-panel ${collapsed ? '-collapsed' : ''}`}>
          { (layersSpec && layersSpec.length > 0) &&
            LegendControl.getLegendList({ layersSpec, sortable }) }

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
  position: PropTypes.oneOf(['topright', 'topleft', 'bottomright', 'bottomleft'])
};

LegendControl.defaultProps = {
  layersSpec: [],
  datasetsSpec: [],
  sortable: true,
  collapsed: false,
  position: 'bottomright'
};

export default CSSModules(LegendControl, styles, { allowMultiple: true });
