import * as React from 'react';
import { SortButton } from "./SortButton";

type Props = {
  lastActiveFrom: string,
  lastActiveTo: string,
  setFilter: (field: string, value: string) => void,
  sortOrder: string,
  onSortChange: (field: string) => void,
}

export class DateFilter extends React.Component<Props, {}> {
  setActiveFrom = ({ target: { value } }: { target: { value: string }}): void => {
    this.props.setFilter('lastActiveFrom', value);
  };

  setActiveTo = ({ target: { value } }: { target: { value: string }}): void => {
    this.props.setFilter('lastActiveTo', value);
  };

  changeSortOrder = (): void => {
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
          size={1}
        />
        <input
          type="date"
          min={lastActiveFrom}
          value={lastActiveTo}
          onChange={this.setActiveTo}
          size={1}
        />
        <SortButton sortOrder={sortOrder} onClick={this.changeSortOrder} />
      </div>
    )
  }



}
