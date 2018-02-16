import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SimpleSelect } from 'react-selectize';
import 'react-selectize/themes/index.css';
import './legend-nexgddp-toolbar-style.scss';

class LegendNexGDDPToolbar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      temporalResolution: null,
      temporalResolutionOptions: null,
      period: null,
      periodsOptions: null,
      scenario: null,
      scenariosOptions: null
    };

    this.updatingPeriods = this.updatingPeriods.bind(this);
    this.onResolutionChange = this.onResolutionChange.bind(this);
    this.onPeriodChange = this.onPeriodChange.bind(this);
    this.onScenarioChange = this.onScenarioChange.bind(this);
  }

  componentDidMount() {
    const { layerSpec } = this.props;
    const { layerConfig } = layerSpec;
    const { indicator } = layerConfig;
    const url = `${config.apiUrlRW}/nexgddp/info/${indicator}`;

    fetch(url)
      .then((response) => {
        if (response.ok) return response.json();
        throw Error(response);
      })
      .then(json => this.updatingCombos(json))
      .catch(error => console.error(error));
  }

  onResolutionChange(temporalResolution) {
    this.setState({ temporalResolution }, () => {
      this.updatingPeriods();
      this.props.onMultiLayer({ ...this.state, id: this.props.layerSpec.dataset });
    });
  }

  onPeriodChange(period) {
    this.setState({ period }, () => {
      this.props.onMultiLayer({ ...this.state, id: this.props.layerSpec.dataset });
    });
  }

  onScenarioChange(scenario) {
    this.setState({ scenario }, () => {
      this.props.onMultiLayer({ ...this.state, id: this.props.layerSpec.dataset });
    });
  }

  updatingPeriods() {
    const { period: propPeriod } = this.props.layerSpec;
    const temporalResolution = this.state.temporalResolutionOptions.find(t => t.value === this.state.temporalResolution.value);
    const periodsOptions = temporalResolution.periods.map(p => ({ label: p.label, value: p.id }));
    const period = periodsOptions.find(s => s.value === (propPeriod || {}).label) || periodsOptions[0];

    this.setState({
      period,
      periodsOptions
    });
  }

  updatingCombos(data) {
    const {
      temp_resolution: propTemporalSolution,
      scenario: propScenarioSolution
    } = this.props.layerSpec;

    // Temporal resolution (decadal, 30 years)
    const temporalResolutionOptions = data.temporalResolution.map(t => ({ label: t.label, value: t.id, periods: t.periods }));
    const temporalResolution = temporalResolutionOptions.find(t => t.value === propTemporalSolution) || temporalResolutionOptions[0];

    // Scenarios
    const scenariosOptions = data.scenarios.map(s => ({ label: s.label, value: s.id }));
    const scenario = scenariosOptions.find(s => s.value === propScenarioSolution) || scenariosOptions[0];

    this.setState({
      temporalResolution,
      temporalResolutionOptions,
      scenario,
      scenariosOptions
    }, this.updatingPeriods);
  }

  render() {
    const {
      temporalResolution,
      temporalResolutionOptions,
      period,
      periodsOptions,
      scenario,
      scenariosOptions
    } = this.state;

    return (
      <div className="c-legend-nexgddp-toolbar">
        {temporalResolutionOptions && <SimpleSelect
          name="temporal_resolution"
          value={temporalResolution}
          options={temporalResolutionOptions}
          onValueChange={this.onResolutionChange}
          theme="material"
          hideResetButton
          tether
        />}
        {periodsOptions && <SimpleSelect
          name="periods"
          value={period}
          options={periodsOptions}
          onValueChange={this.onPeriodChange}
          theme="material"
          hideResetButton
          tether
        />}
        {scenariosOptions && <SimpleSelect
          name="scenario"
          value={scenario}
          options={scenariosOptions}
          onValueChange={this.onScenarioChange}
          theme="material"
          hideResetButton
          tether
        />}
      </div>
    );
  }
}

LegendNexGDDPToolbar.propTypes = {
  layerSpec: PropTypes.object,
  onMultiLayer: PropTypes.func
};

export default LegendNexGDDPToolbar;
