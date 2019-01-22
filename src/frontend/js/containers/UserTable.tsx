import * as React from 'react';
import { connect } from 'react-redux';

import { UserTableHead } from "./UserTableHead";
import {UserList} from "./UserList";
import {UserListEmpty} from "../components/UserListEmpty";
import {UserType} from "../redux/reducers/rootReducer";

type Props = {
  users: Array<UserType>,
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

export const UserTable = connect(mapStateToProps)(Component);
