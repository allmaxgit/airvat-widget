import * as React from 'react';
import { connect } from 'react-redux';

type Props = {
  user: {
    firstName: string,
    surname: string,
    email: string,
    phone: (string | number),
    residenceCountry: string,
    residenceCity: string,
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
  }
}: Props) => (
  <tr>
    <td>{firstName}</td>
    <td>{surname}</td>
    <td>{email}</td>
    <td>{phone}</td>
    <td>{residenceCountry}</td>
    <td>{residenceCity}</td>
  </tr>
);
