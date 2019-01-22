import * as React from 'react';

import Pager from 'react-pager';
import { connect } from 'react-redux';
import { UserTable } from "./UserTable";
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "../redux/reducers/rootReducer";
import { setPage } from "../redux/actions/rootActions";

type Props = {
  loaded: boolean,
  count: number,
  limit: number,
  page: number,
  setPage: Function,
}

class Component extends React.Component<Props, {}> {
  setPage = (page: number): void => {
    this.props.setPage(page);
  };

  render() {
    const { limit, count, page } = this.props;
    const pages = Math.ceil(limit / count);

    return (
      <div>
        <UserTable />
        <Pager
          total={pages}
          current={page}
          visiblePages={5}
          titles={{ first: '<', last: '>' }}
          className="user-pager"
          onPageChanged={this.setPage}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ root }: { root: RootState }) => ({ ...root });
const mapDispatchToProps = (dispatch: Dispatch<any>) => bindActionCreators({
  setPage,
}, dispatch);

export const App = connect(mapStateToProps, mapDispatchToProps)(Component);
