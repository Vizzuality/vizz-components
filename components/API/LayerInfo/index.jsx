import React from 'react';
import '../../Common/styles/c-info.scss';

class LayerInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      layer: {},
      message: 'Loading...',
      default: {}
    };
  }

  componentWillMount() {
    const { layer, path } = this.props;
    this.getLayerInfo(path, layer);
  }

  renderObjectList(arr, type) {
    return (
      <ul>
        {arr && arr.map((a, i) => (
          <li key={i}>{a.attributes.name} <a href={`/${type}/${a.attributes.id}`}>See</a></li>
        ))}
      </ul>
    );
  }

  renderStringList(arr) {
    return (
      <ul>{arr && arr.map((a, i) => <li key={i}>{a}</li>)}</ul>
    );
  }

  render() {
    const { path } = this.props;
    const data = this.state.layer;

    return (
      <div>
        {Object.keys(data).length ? (
          <div className="c-info">
            <div className="intro">
              <h2 className="count">{data.name}</h2>
            </div>
            <p><span>Description:</span> {data.description}</p>
            <div>
              <span>Applications:</span>
              {data.application.length && this.renderStringList(data.application)}
            </div>
            <p><span>Provider:</span> {data.provider}</p>
            <p><span>Dataset:</span> {data.dataset} <a href={`/dataset/${data.dataset}`}>See</a></p>
            <div>
              <span>Iso:</span>
              {data.iso.length ? this.renderStringList(data.iso) : ''}
            </div>
            <p><span>Default:</span> {data.default ? 'true' : 'false'}</p>
            <div><span>Layer config:</span>
              {Object.keys(data.layerConfig).length ?
                <code>
                  <pre>{JSON.stringify(data.layerConfig || {}, null, 2)}</pre>
                </code> : ' {}'
              }
            </div>
            <div><span>Legend config:</span>
              {Object.keys(data.legendConfig).length ?
                <code>
                  <pre>{JSON.stringify(data.legendConfig || {}, null, 2)}</pre>
                </code> : ' {}'
              }
            </div>
            <div className="bar">
              <a href={`/layer/${data.id}/edit`}>Edit</a>
            </div>
          </div>) :
          <p>{this.state.message}</p>
        }
      </div>
    );
  }

  getLayerInfo(path, id) {
    const url = `https://api.resourcewatch.org/${path}/${id}?page[size]=${Date.now() / 100000}`;

    fetch(new Request(url))
    .then((response) => {
      if (response.ok) return response.json();
      this.setState({ message: 'Error loading layer' });
      throw new Error(response.statusText);
    })
    .then((response) => {
      const message = !Object.keys(response.data).length ? 'No layer info' : '';
      const layer = this.parseData(response.data);
      this.setState({ message, layer, default: layer });
    })
    .catch((err) => {
      this.setState({ message: 'Error loading layer' });
    });
  }

  parseData(layer) {
    return Object.assign({}, layer.attributes, { id: layer.id });
  }
}

LayerInfo.propTypes = {
  layer: React.PropTypes.string.isRequired,
  path: React.PropTypes.string.isRequired,
};

export default LayerInfo;
