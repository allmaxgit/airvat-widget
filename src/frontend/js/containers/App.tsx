import * as React from 'react';
import { connect } from 'react-redux';

import { UserTable } from "./UserTable";

type Props = {
  loaded: boolean,
}

const Component = ({ loaded }: Props) => (
  <div>
    <UserTable />
  </div>
);

const mapStateToProps = ({ root }) => ({ ...root });
const mapDispatchToProps = () => ({});

export const App = connect(mapStateToProps, mapDispatchToProps)(Component);
