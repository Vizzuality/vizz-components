import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
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

const LegendList = ({ items, sortable }) => {
  if (sortable) return (<SortableLegendList items={items} />);
  return (
    <ul>
      {items.map(value => (
        <LegendListItem key={`legend-item-${value.id}`} value={value} />
      ))}
    </ul>
  );
};

LegendList.propTypes = {
  items: PropTypes.array,
  sortable: PropTypes.bool
};

export default LegendList;
