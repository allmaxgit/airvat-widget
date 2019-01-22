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
    <td>{firstName}</td>
    <td>{surname}</td>
    <td>{email}</td>
    <td>{phone}</td>
    <td>{residenceCountry}</td>
    <td>{residenceCity}</td>
    <td>{moment(lastActive).format('LLL')}</td>
  </tr>
);
