import React from 'react';

import './style.scss';

class CheckboxGroup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: props.defaultValue || []
    };

    // BINDINGS
    this.onChange = this.onChange.bind(this);
  }

  /**
   * UI EVENTS
   * - onChange
  */
  onChange(e) {
    // - newSelected: Clone the current selected array
    // - i: Get the indexOf the the current selection
    const newSelected = [].concat(this.state.selected);
    const i = this.state.selected.indexOf(e.currentTarget.value);

    // Toggle element from the array
    if (i === -1) {
      newSelected.push(e.currentTarget.value);
    } else {
      newSelected.splice(i, 1);
    }

    // Set state
    this.setState({
      selected: newSelected
    }, () => {
      // Trigger change selected arr if it's needed
      const selectedArr = this.props.items.filter(item => (
        this.state.selected.indexOf(item.value) !== -1
      ));
      if (this.props.onChange) this.props.onChange(selectedArr);
    });
  }

  render() {
    const { name, items } = this.props;
    const { selected } = this.state;

    return (
      <div className={`c-checkbox-box ${this.props.className}`}>
        {items.map(item => (
          <div key={`c-checkbox-item-${name}`} className="c-checkbox">
            <input
              type="checkbox"
              name={name}
              id={`checkbox-${name}-${item.value}`}
              value={item.value}
              checked={selected.indexOf(item.value) !== -1}
              onChange={this.onChange}
            />
            <label htmlFor={`checkbox-${name}-${item.value}`}>
              <span />
              {item.label}
            </label>
          </div>
        ))}
      </div>
    );
  }
}

CheckboxGroup.propTypes = {
  items: React.PropTypes.array.isRequired,
  name: React.PropTypes.string.isRequired,
  defaultValue: React.PropTypes.array,
  className: React.PropTypes.string,
  onChange: React.PropTypes.func
};

export default CheckboxGroup;
