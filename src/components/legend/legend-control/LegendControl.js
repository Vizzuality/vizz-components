import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import LegendList from './legend-list/LegendList';
import styles from './legend-control.scss';

export class LegendControl extends React.PureComponent {
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
    const { layersSpec, position, sortable } = this.props;
    const { collapsed } = this.state;

    return (
      <div styleName={`c-legend-control -${position}`}>
        {collapsed ?
          <button type="button" onClick={this.toggle}>Open</button> :
          <button type="button" onClick={this.toggle}>Close</button>}
        <div styleName={`c-legend-list ${collapsed ? '-collapsed' : ''}`}>
          <LegendList items={layersSpec} sortable={sortable} />
        </div>
      </div>
    );
  }
}

LegendControl.propTypes = {
  layersSpec: PropTypes.array,
  sortable: PropTypes.bool,
  collapsed: PropTypes.bool,
  position: PropTypes.oneOf(['topright', 'topleft', 'bottomright', 'bottomleft'])
};

LegendControl.defaultProps = {
  sortable: true,
  collapsed: false,
  position: 'bottomright'
};

export default CSSModules(LegendControl, styles, { allowMultiple: true });
