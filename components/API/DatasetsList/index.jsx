import React from 'react';
import './style.scss';

class DatasetsList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      datasets: []
    };
  }

  render() {
    const { applications } = this.props;
    let { url } = this.props;

    this.getDatasets(applications.join(','));

    return (
      <div className="c-datasets-list">
        <h4 className="count">{ this.state.datasets.length } datasets</h4>
        <ul className="list">
          { this.state.datasets.length ?
            this.state.datasets.map((dataset, i) => {
              return (
                <li key={i} className="item">
                  {dataset.attributes.name}
                  <a href={`${url}/${dataset.id}`} className="btn-edit">Edit</a>
                </li>
              );
            }) :
            <li className="item">No datasets</li>
          }
        </ul>
      </div>
    );
  }

  getDatasets(apps) {
    fetch(new Request(`https://api.resourcewatch.org/dataset?app=${apps}&page[size]=${Date.now() / 100000}`))
    .then((response) => {
      if (response.ok) return response.json();
      this.setState({ datasets: [] });
      throw new Error(response.statusText);
    })
    .then((response) => {
      this.setState({ datasets: response.data });
    })
    .catch((err) => {
      this.setState({ datasets: [] });
    });
  }

}

DatasetsList.propTypes = {
  applications: React.PropTypes.array.isRequired
};

export default DatasetsList;
