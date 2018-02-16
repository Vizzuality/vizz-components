import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
import Icon from 'components/ui/Icon';
import LegendListItem from '../legend-list-item/LegendListItem';
import './legend-list.scss';

const DragHandle = SortableHandle(() => (
  <div className="handler">
    <Icon name="icon-drag-dots" className="-medium" />
  </div>
));

const SortableItem = SortableElement(props => (
  <div className="c-legend-draggable">
    <DragHandle />
    <LegendListItem {...props} />
  </div>
));

const SortableLegendList = SortableContainer(({ items, onOpacity, onVisibility, onClose, onInfo, onMultiLayer, onFitBounds }) => (
  <ul>
    {items.map((value, index) => (
      <SortableItem
        key={`sortable-item-${value.id}`}
        index={index}
        value={value}
        onOpacity={onOpacity}
        onVisibility={onVisibility}
        onInfo={onInfo}
        onClose={onClose}
        onMultiLayer={onMultiLayer}
        onFitBounds={onFitBounds}
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

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.items, this.props.items)) this.setState({ items: nextProps.items });
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    }, () => this.props.onSortChange(this.state.items));
  }

  render() {
    const { sortable, onOpacity, onVisibility, onClose, onInfo, onMultiLayer, onFitBounds } = this.props;
    const { items } = this.state;

    if (sortable) {
      return (
        <div className="c-legend-list">
          <SortableLegendList
            items={items}
            onSortEnd={this.onSortEnd}
            axis="y"
            lockAxis="y"
            lockToContainerEdges
            lockOffset="50%"
            useDragHandle
            onOpacity={onOpacity}
            onVisibility={onVisibility}
            onInfo={onInfo}
            onClose={onClose}
            onMultiLayer={onMultiLayer}
            onFitBounds={onFitBounds}
          />
        </div>
      );
    }

    return (
      <div className="c-legend-list">
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
  sortable: PropTypes.bool,
  onSortChange: PropTypes.func,
  onOpacity: PropTypes.func,
  onVisibility: PropTypes.func,
  onInfo: PropTypes.func,
  onClose: PropTypes.func,
  onMultiLayer: PropTypes.func,
  onFitBounds: PropTypes.func
};

LegendList.defaultProps = {
  onOpacity: () => {},
  onVisibility: () => {},
  onSortChange: () => {},
  onInfo: () => {},
  onClose: () => {},
  onMultiLayer: () => {},
  onFitBounds: () => {}
};

export default LegendList;
