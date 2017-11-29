import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Legend from './Legend';

const SortableItem = SortableElement(({ value }) => (
  <li>
    <Legend layerSpec={value} />
  </li>
));

const SortableList = SortableContainer(({ items }) => (
  <ul>
    {items.map((value, index) => (
      <SortableItem key={`sortable-item-${value.id}`} index={index} value={value} />
    ))}
  </ul>
));

class LegendControl extends React.PureComponent {
  render() {
    const { layersSpec } = this.props;

    return (
      <div>
        <button type="button">Close</button>
        <SortableList items={layersSpec} onSortEnd={this.onSortEnd} />
      </div>
    );
  }
}

LegendControl.propTypes = {
  layersSpec: PropTypes.array,
  sortable: PropTypes.bool
};

export default LegendControl;
