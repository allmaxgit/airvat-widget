import * as React from 'react';
import { connect } from 'react-redux';

import { ColumnFilter } from "../components/ColumnFilter";
import { RootState } from "../redux/reducers/rootReducer";
import { bindActionCreators } from "redux";

import {
  changeSortOrder,
  setFilter,
} from "../redux/actions/rootActions";

type Props = RootState & {
  setFilter: Function,
  changeSortOrder: Function,
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

  render() {
    const {
      filter: {
        firstName,
        surname,
        email,
        phone,
        residenceCountry,
        residenceCity,
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
