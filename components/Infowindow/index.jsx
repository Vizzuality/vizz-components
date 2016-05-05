'use strict';

import React from 'react';

class Infowindow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  toggle() {
    this.setState({ active: !this.state.active });
  }

  open() {
    this.setState({ active: true });
  }

  close() {
    this.setState({ active: false });
  }

  render() {
    const classActive = !this.state.active ? '-hidden' : '';
    return (
      <div className={`c-infowindow ${classActive}`}>
        <button onClick={this.close.bind(this)}>x</button>
        <div>{this.props.content}</div>
      </div>
    );
  }

}

export default Infowindow;
