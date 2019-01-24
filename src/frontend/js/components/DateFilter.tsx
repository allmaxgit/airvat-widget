import * as React from 'react';
import { SortButton } from "./SortButton";
import { DateRangeInput } from "@blueprintjs/datetime";
import * as moment from 'moment';

import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'

type Props = {
  lastActiveFrom?: string,
  lastActiveTo?: string,
  setFilter: (field: string, value: string) => void,
  sortOrder: string,
  onSortChange: (field: string) => void,
}

export class DateFilter extends React.Component<Props, {}> {
  changeSortOrder = (): void => {
    this.props.onSortChange('lastActive');
  };

  parseDateString = (date?: string): (Date | null) => (
    (date && Date.parse(date) && new Date(date)) || null
  );

  setDateRange = ([ lastActiveFrom, lastActiveTo ]: [Date, Date]): void => {
    if (lastActiveFrom) this.props.setFilter('lastActiveFrom', lastActiveFrom.toString());
    if (lastActiveTo) this.props.setFilter('lastActiveTo', lastActiveTo.toString());
  };

  render() {
    const { lastActiveTo, lastActiveFrom, sortOrder } = this.props;

    return (
      <div>
        <DateRangeInput
          formatDate={date => date.toLocaleDateString()}
          onChange={this.setDateRange}
          parseDate={str => new Date(str)}
          value={[
            this.parseDateString(lastActiveFrom),
            this.parseDateString(lastActiveTo)
          ]}
        />
        <SortButton sortOrder={sortOrder} onClick={this.changeSortOrder} />
      </div>
    )
  }



}
