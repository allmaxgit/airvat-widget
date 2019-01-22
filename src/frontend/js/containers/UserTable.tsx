import * as React from 'react';
import { connect } from 'react-redux';

import { UserTableHead } from "./UserTableHead";
import { UserRow } from "../components/UserRow";

import * as classnames from 'classnames'
import {UserList} from "./UserList";
import {UserListEmpty} from "../components/UserListEmpty";

type Props = {
  users: Array<any>,
  loaded: boolean,
}
const Component = ({ users, loaded }: Props) => (
  <table className="user-table">
    <UserTableHead />
    { users.length > 0 && <UserList users={users} loaded={loaded} /> }
    { users.length === 0 && <UserListEmpty loaded={loaded} /> }
  </table>
);

const mapStateToProps = ({ root }) => ({ ...root });
// const mapDispatchToProps = () => ({});

export const UserTable = connect(
  mapStateToProps,
  // mapDispatchToProps
)(Component);
