import * as React from 'react';
import { connect } from 'react-redux';

import { UserTableHead } from "./UserTableHead";
import { UserRow } from "../components/UserRow";

type Props = {
  users: Array<any>,
}
const Component = ({ users }: Props) => (
  <table className="user-table">
    <UserTableHead />
    <tbody>
      {
        users.map(user => (
          <UserRow
            user={user.account}
            key={user.id}
          />
        ))
      }
    </tbody>
  </table>
);

const mapStateToProps = ({ root }) => ({ ...root });
const mapDispatchToProps = () => ({});

export const UserTable = connect(mapStateToProps, mapDispatchToProps)(Component);
