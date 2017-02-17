import React from 'react';
import '../../Common/styles/c-info.scss';

class WidgetInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      widget: {},
      message: 'Loading...',
      default: {}
    };
  }

  componentWillMount() {
    const { widget, path } = this.props;
    this.getWidgetInfo(path, widget);
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
    const data = this.state.widget;

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
              {this.renderStringList(data.application)}
            </div>
            <p><span>Source:</span> {data.source}</p>
            <p><span>Dataset:</span> {data.dataset} <a href={`/dataset/${data.dataset}`}>See</a></p>
            <p><span>Query url:</span> {data.queryUrl}</p>
            <p><span>Default:</span> {data.default ? 'true' : 'false'}</p>
            <p><span>Widget config:</span>
              <code>
                <pre>{JSON.stringify(data.widgetConfig || {}, null, 2)}</pre>
              </code>
            </p>
            <p><span>Status:</span> {data.status}</p>
            <p><span>Published:</span> {data.published}</p>
            <p><span>Overwrite:</span> {data.overwrite ? 'true' : 'false'}</p>
            <div className="bar">
              <a href={`/widget/${data.id}/edit`}>Edit</a>
            </div>
          </div>) :
          <p>{this.state.message}</p>
        }
      </div>
    );
  }

  getWidgetInfo(path, id) {
    const url = `https://api.resourcewatch.org/${path}/${id}?page[size]=${Date.now() / 100000}`;

    fetch(new Request(url))
    .then((response) => {
      if (response.ok) return response.json();
      this.setState({ message: 'Error loading widget' });
      throw new Error(response.statusText);
    })
    .then((response) => {
      const message = !Object.keys(response.data).length ? 'No widget info' : '';
      const widget = this.parseData(response.data);
      this.setState({ message, widget, default: widget });
    })
    .catch((err) => {
      this.setState({ message: 'Error loading widgets' });
    });
  }

  parseData(widget) {
    const attr = widget.attributes;
    const hasWidget = attr.widget && attr.widget.length > 0;
    const hasLayer = attr.layer && attr.layer.length > 0;

    return Object.assign({}, widget.attributes,
      { hasWidget, hasLayer, id: widget.id }
    );
  }
}

WidgetInfo.propTypes = {
  widget: React.PropTypes.string.isRequired,
  path: React.PropTypes.string.isRequired,
};

export default WidgetInfo;
