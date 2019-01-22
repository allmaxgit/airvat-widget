import * as React from 'react';

type Props = {
  loaded: boolean,
}

export const UserListEmpty = ({ loaded }: Props) => (
  <tbody>
    <tr>
      <td
        colSpan={7}
        className="user-list-empty"
      >
        { loaded && 'No matching records found' }
        { !loaded && 'Loading data, please wait' }
      </td>
    </tr>
  </tbody>
)
