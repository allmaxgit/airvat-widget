import * as React from 'react';
import { connect } from 'react-redux';
import { SortButton } from "./SortButton";

type Props = {
  sortOrder: string,
  value: string,
  field: string,
  onSortChange: Function,
  onFilterChange: Function,
}

export class ColumnFilter extends React.PureComponent<Props, {}> {
  changeSortOrder = () => {
    this.props.onSortChange(this.props.field);
  };

  changeFilter = ({ target: { value } } : { target: { value: string }}) => {
    this.props.onFilterChange(this.props.field, value);
  };

  render() {
    const {
      sortOrder,
      value,
    } = this.props;

    return (
      <td>
        <div className="filter-column">
          <input
            type="text"
            value={value}
            onChange={this.changeFilter}
            size={1}
          />
          <SortButton sortOrder={sortOrder} onClick={this.changeSortOrder} />
        </div>
      </td>
    )
  }
}
