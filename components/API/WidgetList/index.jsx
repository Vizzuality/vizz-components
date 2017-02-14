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
    const { application, path, dataset } = this.props;
    this.getWidgets(path, application, dataset);

    // Bindings
    this.sortWidgets = this.sortWidgets.bind(this);
  }

  render() {
    const { path } = this.props;

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
        { this.state.widgets.length ?
          <table className="list">
            <thead>
              <tr>
                <th>Name</th>
                <th>Default</th>
                <th>Has config</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                { this.state.widgets.map((widget, i) => {
                  return (
                    <tr key={i} className="item">
                      <td>{widget.name ? widget.name : widget.msg }</td>
                      <td>{widget.default ? 'true': 'false'}</td>
                      <td>{widget.config ? 'true': 'false'}</td>
                      <td>{ widget.dataset ? <a href={`/dataset?id=${widget.dataset}`} className="btn-edit">Dataset</a> : 'Dataset' }</td>
                      <td>{ widget.id && <a href={`/${path}?dataset=${widget.dataset}&widget=${widget.id}`} className="btn-edit">Edit</a> }</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table> :
          <p>{this.state.message}</p>
        }
      </div>
    );
  }

  getWidgets(path, apps, dataset) {
    const appsStr = apps.join(',');
    const route = dataset ? `dataset/${dataset}/${path}`: path;
    const app = dataset ? '' : `app=${appsStr}&`;
    const url = `https://api.resourcewatch.org/${route}?${app}page[size]=${Date.now() / 100000}`;

    fetch(new Request(url))
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
      const config = widget.attributes.widgetConfig;

      return {
        name: widget.attributes.name,
        id: widget.id,
        dataset: widget.attributes.dataset,
        default: widget.attributes.default,
        config: config && Object.keys(config).length > 0
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
  path: React.PropTypes.string.isRequired,
  dataset: React.PropTypes.string,
};

export default WidgetsList;
