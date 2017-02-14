import React from 'react';
import './style.scss';

class LayersList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      layers: [],
      message: 'Loading...',
      default: []
    };
  }

  componentWillMount() {
    const { application, path, dataset } = this.props;
    this.getLayers(path, application, dataset);

    // Bindings
    this.sortLayers = this.sortLayers.bind(this);
  }

  render() {
    const { path } = this.props;

    return (
      <div className="c-layers-list">
        <div className="intro">
          <h4 className="count">{ this.state.layers.length } layers</h4>
          <div className="sort">
            Sort by
            <select onChange={this.sortLayers}>
              <option value="0">Default</option>
              <option value="1">A - Z</option>
              <option value="2">Z - A</option>
            </select>
          </div>
        </div>
        { this.state.layers.length ?
          <table className="list">
            <thead>
              <tr>
                <th>Name</th>
                <th>Has Config</th>
                <th>Has Legend</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.layers.map((layer, i) => {
                return (
                  <tr key={i} className="item">
                    <td>{layer.name ? layer.name : layer.msg }</td>
                    <td>{layer.config ? 'true' : 'false'}</td>
                    <td>{layer.legend ? 'true' : 'false'}</td>
                    <td>{layer.dataset ? <a href={`/dataset?id=${layer.dataset}`} className="btn-edit">Dataset</a> : 'Dataset' }</td>
                    <td>{layer.id && <a href={`${path}?id=${layer.id}`} className="btn-edit">Edit</a> }</td>
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

  getLayers(path, apps, dataset) {
    const appsStr = apps.join(',');
    const route = dataset ? `dataset/${dataset}/${path}`: path;
    const app = dataset ? '' : `app=${appsStr}&`;
    const url = `https://api.resourcewatch.org/${route}?${app}page[size]=${Date.now() / 100000}`;

    fetch(new Request(url))
    .then((response) => {
      if (response.ok) return response.json();
      this.setState({ message: 'Error loading layers' });
      throw new Error(response.statusText);
    })
    .then((response) => {
      const message = !response.data.length ? 'No layers' : '';
      const layers = this.parseData(response.data);
      this.setState({ message, layers, default: layers.slice() });
    })
    .catch((err) => {
      this.setState({ message: 'Error loading layers' });
    });
  }

  parseData(data) {
    return data.map((layer) => {
      const attr = layer.attributes;

      return {
        name: layer.attributes.name,
        id: layer.id,
        dataset: layer.attributes.dataset,
        config: attr.layerConfig && Object.keys(attr.layerConfig).length > 0,
        legend: attr.legendConfig && Object.keys(attr.legendConfig).length > 0
      };
    });
  }

  sortLayers(e) {
    const value = e.currentTarget.value;
    let layers = [];

    switch(value) {
      case '0': layers = this.state.default.slice(); break;
      case '1': layers = this.sortAscendant(); break;
      case '2': layers = this.sortAscendant().reverse(); break;
    }

    this.setState({ layers });
  }

  sortAscendant() {
    return this.state.layers.sort(function(a, b) {
      const x = a.name.toLowerCase(),
        y = b.name.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }
}

LayersList.propTypes = {
  application: React.PropTypes.array.isRequired,
  path: React.PropTypes.string.isRequired,
  dataset: React.PropTypes.string,
};

export default LayersList;
