'use strict';

import './style.css';
import React from 'react';

class LegendItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      active: this.props.active
    };
  }

  update() {
    this.setState({ active: !this.state.active });
  }

  componentDidUpdate() {
    if (this.props.onChange) {
      this.props.onChange(this.state);
    }
  }

  render() {
    return (
      <li>
        <label for="legend-item">
          <input
            type="checkbox"
            name="legend-item"
            onChange={ this.update.bind(this) }
            defaultChecked={ this.state.active } />
          { this.props.name }
        </label>
      </li>
    );
  }

}

LegendItem.propTypes = {
  onChange: React.PropTypes.func,
  active: React.PropTypes.bool
};

LegendItem.defaultProps = {
  active: true
};

export default LegendItem;
