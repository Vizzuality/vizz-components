import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import LegendListItem from '../legend-list-item/LegendListItem';

const SortableItem = SortableElement(LegendListItem);

const SortableLegendList = SortableContainer(({ items }) => (
  <ul>
    {items.map((value, index) => (
      <SortableItem
        key={`sortable-item-${value.id}`}
        index={index}
        value={value}
      />
    ))}
  </ul>
));

class LegendList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items
    };
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    });
  }

  render() {
    const { sortable } = this.props;
    const { items } = this.state;

    if (sortable) return (<SortableLegendList items={items} onSortEnd={this.onSortEnd} />);

    return (
      <ul>
        {items.map(value => (
          <LegendListItem key={`legend-item-${value.id}`} value={value} />
        ))}
      </ul>
    );
  }
}

LegendList.propTypes = {
  items: PropTypes.array,
  sortable: PropTypes.bool
};

export default LegendList;
