import * as React from 'react';

type Props = {
  lastActiveFrom: string,
  lastActiveTo: string,
  setFilter: Function,
  sortOrder: string,
  onSortChange: Function,
}

export class DateFilter extends React.Component<Props, {}> {
  setActiveFrom = ({ target: { value } }: { target: { value: string }}): void => {
    this.props.setFilter('lastActiveFrom', value);
  };

  setActiveTo = ({ target: { value } }: { target: { value: string }}): void => {
    this.props.setFilter('lastActiveTo', value);
  };

  changeSortOrder = () => {
    console.log('Change order?');
    this.props.onSortChange('lastActive');
  };

  render() {
    const { lastActiveTo, lastActiveFrom, sortOrder } = this.props;

    return (
      <div>
        <input
          type="date"
          max={lastActiveTo}
          value={lastActiveFrom}
          onChange={this.setActiveFrom}
        />
        <input
          type="date"
          min={lastActiveFrom}
          value={lastActiveTo}
          onChange={this.setActiveTo}
        />
        <button
          onClick={this.changeSortOrder}
        >
          { !sortOrder && '↕' }
          { sortOrder === 'asc' && '↓' }
          { sortOrder === 'desc' && '↑' }
        </button>
      </div>
    )
  }



}
