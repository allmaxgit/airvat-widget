import * as React from 'react';
import { connect } from 'react-redux';

import { ColumnFilter } from "../components/ColumnFilter";
import { RootState } from "../redux/reducers/rootReducer";
import { bindActionCreators } from "redux";
import { DateFilter } from '../components/DateFilter';

import {
  changeSortOrder,
  setFilter,
} from "../redux/actions/rootActions";

type Props = RootState & {
  setFilter: Function,
  changeSortOrder: Function,
  lastActiveFrom: string,
  lastActiveTo: string,
}

class Component extends React.Component<Props, {}> {
  setFilterValue = (field: string, value: string): void => {
    this.props.setFilter(field, value);
  };

  setSortValue = (field: string): void => {
    this.props.changeSortOrder(field);
  };

  isSortingBy = (field: string): string => {
    return (this.props.sortBy === field && this.props.sortOrder)
      ? this.props.sortOrder
      : ''
  };

  setActiveFrom = ({ target: { value } }): void => {
    console.log('FROM', value);
  };

  setActiveTo = ({ target: { value } }): void => {
    console.log('TO', value);
  };

  render() {
    const {
      filter: {
        firstName,
        surname,
        email,
        phone,
        residenceCountry,
        residenceCity,
        lastActiveFrom,
        lastActiveTo,
      },
    } = this.props;

    return (
      <thead>
      <tr>
        <th>Name</th>
        <th>Surname</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Country</th>
        <th>City</th>
        <th>Last Active</th>
      </tr>
      <tr>
        <ColumnFilter
          field="firstName"
          value={firstName}
          sortOrder={this.isSortingBy('firstName')}
          onFilterChange={this.setFilterValue}
          onSortChange={this.setSortValue}
        />
        <ColumnFilter
          field="surname"
          value={surname}
          sortOrder={this.isSortingBy('surname')}
          onFilterChange={this.setFilterValue}
          onSortChange={this.setSortValue}
        />
        <ColumnFilter
          field="email"
          value={email}
          sortOrder={this.isSortingBy('email')}
          onFilterChange={this.setFilterValue}
          onSortChange={this.setSortValue}
        />
        <ColumnFilter
          field="phone"
          value={phone}
          sortOrder={this.isSortingBy('phone')}
          onFilterChange={this.setFilterValue}
          onSortChange={this.setSortValue}
        />
        <ColumnFilter
          field="residenceCountry"
          value={residenceCountry}
          sortOrder={this.isSortingBy('residenceCountry')}
          onFilterChange={this.setFilterValue}
          onSortChange={this.setSortValue}
        />
        <ColumnFilter
          field="residenceCity"
          value={residenceCity}
          sortOrder={this.isSortingBy('residenceCity')}
          onFilterChange={this.setFilterValue}
          onSortChange={this.setSortValue}
        />
        <td className="filter-column-date">
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

            >
              ↕
            </button>
          </div>
        </td>
      </tr>
      </thead>
    )
  }
}

const mapStateToProps = ({ root }) => ({ ...root });
const mapDispatchToProps = dispatch => bindActionCreators({
  changeSortOrder,
  setFilter,
}, dispatch);

export const UserTableHead = connect(mapStateToProps, mapDispatchToProps)(Component);
