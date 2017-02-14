import React from 'react';
import './style.scss';

class DatasetsList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      datasets: [],
      message: 'Loading...',
      default: []
    };
  }

  componentWillMount() {
    const { application, path } = this.props;
    this.getDatasets(path, application);

    // Bindings
    this.sortDatasets = this.sortDatasets.bind(this);
  }

  render() {
    const { path } = this.props;

    return (
      <div className="c-datasets-list">
        <div className="intro">
          <h4 className="count">{ this.state.datasets.length } datasets</h4>
          <div className="sort">
            Sort by
            <select onChange={this.sortDatasets}>
              <option value="0">Default</option>
              <option value="1">A - Z</option>
              <option value="2">Z - A</option>
            </select>
          </div>
        </div>
        { this.state.datasets.length ?
          <table className="list">
            <thead>
              <tr>
                <th>Name</th>
                <th>Applications</th>
                <th>Has Layer</th>
                <th>Has Widget</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { this.state.datasets.map((dataset, i) => {
                return (
                  <tr key={i} className="item">
                    <td>{dataset.name ? dataset.name : dataset.msg }</td>
                    <td>{dataset.apps}</td>
                    <td>{dataset.layer ? 'true' : 'false'}</td>
                    <td>{dataset.widget ? 'true' : 'false'}</td>
                    <td>{ dataset.id && <a href={`${path}?id=${dataset.id}`} className="btn-edit">Edit</a> }</td>
                  </tr>
                );
              })}
            </tbody>
          </table> :
          <p>{this.state.message}</p>
        }
      </div>
    );
  }

  getDatasets(path, apps) {
    const appsStr = apps.join(',');
    const url = `https://api.resourcewatch.org/${path}?app=${appsStr}&includes=widget,layer&page[size]=${Date.now() / 100000}`;

    fetch(new Request(url))
    .then((response) => {
      if (response.ok) return response.json();
      this.setState({ message: 'Error loading datasets' });
      throw new Error(response.statusText);
    })
    .then((response) => {
      const message = !response.data.length ? 'No datasets' : '';
      const datasets = this.parseData(response.data);
      this.setState({ message, datasets, default: datasets.slice() });
    })
    .catch((err) => {
      this.setState({ message: 'Error loading datasets' });
    });
  }

  parseData(data) {
    return data.map((dataset) => {
      const attr = dataset.attributes;

      return {
        name: dataset.attributes.name,
        id: dataset.id,
        apps: attr.application.join(', '),
        widget: attr.widget && Object.keys(attr.widget).length > 0,
        layer: attr.layer && Object.keys(attr.layer).length > 0
      };
    });
  }

  sortDatasets(e) {
    const value = e.currentTarget.value;
    let datasets = [];

    switch(value) {
      case '0': datasets = this.state.default.slice(); break;
      case '1': datasets = this.sortAscendant(); break;
      case '2': datasets = this.sortAscendant().reverse(); break;
    }

    this.setState({ datasets });
  }

  sortAscendant() {
    return this.state.datasets.sort(function(a, b) {
      const x = a.name.toLowerCase(),
        y = b.name.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }
}

DatasetsList.propTypes = {
  application: React.PropTypes.array.isRequired,
  path: React.PropTypes.string.isRequired,
};

export default DatasetsList;
