import React from 'react';

import './style.scss';

class RadioGroup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: props.defaultValue
    };

    // BINDINGS
    this.onChange = this.onChange.bind(this);
  }

  /**
   * UI EVENTS
   * - onChange
  */
  onChange(e) {
    // Set the current selected object
    const selectedObj = this.props.items.find(item => item.value === e.currentTarget.value);

    // Set state
    this.setState({
      selected: selectedObj.value
    });

    // Trigger change selected if it's needed
    this.props.onChange && this.props.onChange(selectedObj);
  }

  render() {
    const { name, items } = this.props;
    const { selected } = this.state;

    return (
      <div className={`c-radio-box ${this.props.className}`}>
        {items.map((item, i) => (
          <div key={i} className="c-radio">
            <input
              type="radio"
              name={name}
              id={`radio-${name}-${item.value}`}
              value={item.value}
              checked={item.value === selected}
              onChange={this.onChange}
            />
            <label htmlFor={`radio-${name}-${item.value}`}>
              <span />
              {item.label}
            </label>
          </div>
        ))}
      </div>
    );
  }
}

RadioGroup.propTypes = {
  items: React.PropTypes.array.isRequired,
  name: React.PropTypes.string.isRequired,
  defaultValue: React.PropTypes.string,
  className: React.PropTypes.string,
  onChange: React.PropTypes.func
};

export default RadioGroup;
