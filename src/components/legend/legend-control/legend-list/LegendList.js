import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import LegendListItem from '../legend-list-item/LegendListItem';
import styles from './legend-list.scss';

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

    if (sortable) {
      return (
        <div styleName="c-legend-list">
          <SortableLegendList items={items} onSortEnd={this.onSortEnd} />
        </div>
      );
    }

    return (
      <div styleName="c-legend-list">
        <ul>
          {items.map(value => (
            <LegendListItem key={`legend-item-${value.id}`} value={value} />
          ))}
        </ul>
      </div>
    );
  }
}

LegendList.propTypes = {
  items: PropTypes.array,
  sortable: PropTypes.bool
};

export default CSSModules(LegendList, styles);
