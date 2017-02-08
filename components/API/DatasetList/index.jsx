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
    const { application } = this.props;
    this.getDatasets(application);

    // Bindings
    this.sortDatasets = this.sortDatasets.bind(this);
  }

  render() {
    const { url } = this.props;

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
        <ul className="list">
          { this.state.datasets.length ?
            this.state.datasets.map((dataset, i) => {
              return (
                <li key={i} className="item">
                  {dataset.name ? dataset.name : dataset.msg }
                  { dataset.id && <a href={`${url}?id=${dataset.id}`} className="btn-edit">Edit</a> }
                </li>
              );
            }) :
            <li className="item">{this.state.message}</li>
          }
        </ul>
      </div>
    );
  }

  getDatasets(apps) {
    const appsStr = apps.join(',');

    fetch(new Request(`https://api.resourcewatch.org/dataset?app=${appsStr}&page[size]=${Date.now() / 100000}`))
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
      return {
        name: dataset.attributes.name,
        id: dataset.id
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
  url: React.PropTypes.string.isRequired,
};

export default DatasetsList;
