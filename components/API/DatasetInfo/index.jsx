import React from 'react';
import '../../Common/styles/c-info.scss';

class DatasetsInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataset: {},
      message: 'Loading...',
      default: {}
    };
  }

  componentWillMount() {
    const { dataset, path } = this.props;
    this.getDatasetInfo(path, dataset);
  }

  renderObjectList(arr, type) {
    return (
      <ul>
        {arr.map((a, i) => (
          <li key={i}>{a.attributes.name} <a href={`/${type}/${a.attributes.id}`}>See</a></li>
        ))}
      </ul>
    );
  }

  renderStringList(arr) {
    return (
      <ul>{arr.map((a, i) => <li key={i}>{a}</li>)}</ul>
    );
  }

  render() {
    const { path } = this.props;
    const data = this.state.dataset;

    return (
      <div>
        {Object.keys(data).length ? (
          <div className="c-info">
            <div className="intro">
              <h2 className="count">{data.name}</h2>
            </div>
            <div>
              Applications:
              {this.renderStringList(data.application)}
            </div>
            <p>Provider: {data.provider}</p>
            <div>
              Tags:
              {this.renderStringList(data.tags)}
            </div>
            <p>
            </p>
            <p>Status: {data.status}</p>
            <p>Overwrite: {data.overwrite ? 'true' : 'false'}</p>
            <p>Has widget: {data.hasWidget ? 'true' : 'false'}</p>
            {data.hasWidget && this.renderObjectList(data.widget, 'widget')}

            <p>Has layer: {data.hasLayer ? 'true' : 'false'}</p>
            {data.hasLayer && this.renderObjectList(data.layer, 'layer')}

            <div className="bar">
              <a href={`/dataset/${data.id}/edit`}>Edit</a>
            </div>
          </div>) :
          <p>{this.state.message}</p>
        }
      </div>
    );
  }

  getDatasetInfo(path, id) {
    const url = `https://api.resourcewatch.org/${path}/${id}?includes=widget,layer&page[size]=${Date.now() / 100000}`;

    fetch(new Request(url))
    .then((response) => {
      if (response.ok) return response.json();
      this.setState({ message: 'Error loading dataset' });
      throw new Error(response.statusText);
    })
    .then((response) => {
      const message = !Object.keys(response.data).length ? 'No dataset info' : '';
      const dataset = this.parseData(response.data);
      this.setState({ message, dataset, default: dataset });
    })
    .catch((err) => {
      this.setState({ message: 'Error loading datasets' });
    });
  }

  parseData(dataset) {
    const attr = dataset.attributes;
    const hasWidget = attr.widget && attr.widget.length > 0;
    const hasLayer = attr.layer && attr.layer.length > 0;

    return Object.assign({}, dataset.attributes,
      { hasWidget, hasLayer, id: dataset.id }
    );
  }
}

DatasetsInfo.propTypes = {
  dataset: React.PropTypes.string.isRequired,
  path: React.PropTypes.string.isRequired,
};

export default DatasetsInfo;
