import * as React from 'react';
import { connect } from 'react-redux';

import { UserTableHead } from "./UserTableHead";
import { UserRow } from "../components/UserRow";

import * as classnames from 'classnames'

type Props = {
  users: Array<any>,
  loaded: boolean,
}
const Component = ({ users, loaded }: Props) => (
  <table className="user-table">
    <UserTableHead />
    <tbody className={classnames({ 'busy': !loaded })}>
      {
        users.map(({ id, account, lastActive }) => (
          <UserRow
            user={{
              ...account,
              lastActive,
            }}
            key={id}
          />
        ))
      }
    </tbody>
  </table>
);

const mapStateToProps = ({ root }) => ({ ...root });
// const mapDispatchToProps = () => ({});

export const UserTable = connect(
  mapStateToProps,
  // mapDispatchToProps
)(Component);
