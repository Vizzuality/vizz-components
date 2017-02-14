import React from 'react';
import './style.scss';

class WidgetsList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      widgets: [],
      message: 'Loading...',
      default: []
    };
  }

  componentWillMount() {
    const { application } = this.props;
    this.getWidgets(application);

    // Bindings
    this.sortWidgets = this.sortWidgets.bind(this);
  }

  render() {
    const { url } = this.props;

    return (
      <div className="c-widgets-list">
        <div className="intro">
          <h4 className="count">{ this.state.widgets.length } widgets</h4>
          <div className="sort">
            Sort by
            <select onChange={this.sortWidgets}>
              <option value="0">Default</option>
              <option value="1">A - Z</option>
              <option value="2">Z - A</option>
            </select>
          </div>
        </div>
        <ul className="list">
          { this.state.widgets.length ?
            this.state.widgets.map((widget, i) => {
              return (
                <li key={i} className="item">
                  {widget.name ? widget.name : widget.msg }
                  { widget.id && <a href={`${url}?id=${widget.id}`} className="btn-edit">Edit</a> }
                </li>
              );
            }) :
            <li className="item">{this.state.message}</li>
          }
        </ul>
      </div>
    );
  }

  getWidgets(apps) {
    const appsStr = apps.join(',');

    fetch(new Request(`https://api.resourcewatch.org/widget?app=${appsStr}&page[size]=${Date.now() / 100000}`))
    .then((response) => {
      if (response.ok) return response.json();
      this.setState({ message: 'Error loading widgets' });
      throw new Error(response.statusText);
    })
    .then((response) => {
      const message = !response.data.length ? 'No widgets' : '';
      const widgets = this.parseData(response.data);
      this.setState({ message, widgets, default: widgets.slice() });
    })
    .catch((err) => {
      this.setState({ message: 'Error loading widgets' });
    });
  }

  parseData(data) {
    return data.map((widget) => {
      return {
        name: widget.attributes.name,
        id: widget.id
      };
    });
  }

  sortWidgets(e) {
    const value = e.currentTarget.value;
    let widgets = [];

    switch(value) {
      case '0': widgets = this.state.default.slice(); break;
      case '1': widgets = this.sortAscendant(); break;
      case '2': widgets = this.sortAscendant().reverse(); break;
    }

    this.setState({ widgets });
  }

  sortAscendant() {
    return this.state.widgets.sort(function(a, b) {
      const x = a.name.toLowerCase(),
        y = b.name.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }
}

WidgetsList.propTypes = {
  application: React.PropTypes.array.isRequired,
  url: React.PropTypes.string.isRequired,
};

export default WidgetsList;
