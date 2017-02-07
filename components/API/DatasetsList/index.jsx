import React from 'react';
import './style.scss';

class DatasetsList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      datasets: [],
      message: 'Loading...'
    };
  }

  componentWillMount() {
    const { application } = this.props;
    this.getDatasets(application);
  }

  render() {
    const { url } = this.props;

    return (
      <div className="c-datasets-list">
        <h4 className="count">{ this.state.datasets.length } datasets</h4>
        <ul className="list">
          { this.state.datasets.length ?
            this.state.datasets.map((dataset, i) => {
              return (
                <li key={i} className="item">
                  {dataset.attributes ? dataset.attributes.name : dataset.msg }
                  { dataset.id && <a href={`${url}/${dataset.id}`} className="btn-edit">Edit</a> }
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
      this.setState({ message: 'Error loading datasets', datasets: [] });
      throw new Error(response.statusText);
    })
    .then((response) => {
      const message = !response.data.length ? 'No datasets' : '';
      this.setState({ message, datasets: response.data });
    })
    .catch((err) => {
      this.setState({ message: 'Error loading datasets', datasets: [] });
    });
  }

}

DatasetsList.propTypes = {
  application: React.PropTypes.array.isRequired,
  url: React.PropTypes.string.isRequired,
};

export default DatasetsList;
