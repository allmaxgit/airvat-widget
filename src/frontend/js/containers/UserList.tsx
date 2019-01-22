import * as React from 'react';
import * as classnames from "classnames";

import { UserRow } from "../components/UserRow";
import {UserType} from "../redux/reducers/rootReducer";

type Props = {
  users: Array<UserType>,
  loaded: boolean,
}

export const UserList = ({ users, loaded }: Props) => (
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
);
