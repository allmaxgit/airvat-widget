import * as React from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';

type Props = {
  user: {
    firstName: string,
    surname: string,
    email: string,
    phone: (string | number),
    residenceCountry: string,
    residenceCity: string,
    lastActive: number,
  }
}

export const UserRow = ({
  user: {
    firstName,
    surname,
    email,
    phone,
    residenceCountry,
    residenceCity,
    lastActive,
  }
}: Props) => (
  <tr>
    <td>
      <div className="cut-row">
        {firstName}
      </div>
    </td>
    <td>
      <div className="cut-row">
        {surname}
      </div>
    </td>
    <td>
      <div className="cut-row">
        {email}
      </div>
    </td>
    <td>
      <div className="cut-row">
        {phone}
      </div>
    </td>
    <td>
      <div className="cut-row">
        {residenceCountry}
      </div>
    </td>
    <td>
      <div className="cut-row">
        {residenceCity}
      </div>
    </td>
    <td>
      <div className="cut-row">
        {moment(lastActive).format('LLL')}
      </div>
    </td>
  </tr>
);
