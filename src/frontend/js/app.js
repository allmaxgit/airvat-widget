import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Route, NavLink, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import * as actions from './redux/actions/someActions';
import configureStore from './redux/store';
import SomeComponent from './components/SomeComponent';

require('../sass/styles.scss');

const history = createHistory();
const { store, persistor } = configureStore(history);

history.listen(({ pathname }) => {
  store.dispatch(actions.someAction(pathname));
});

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <div>
          <div>
            <NavLink exact to="/" activeClassName="active">
              Root
            </NavLink>
            <NavLink to="/somepath" activeClassName="active">
              Something
            </NavLink>
          </div>
          <Switch>
            <Route
              exact
              path="/"
              component={SomeComponent}
            />
            <Route
              path="/somepath"
              component={SomeComponent}
            />
          </Switch>
        </div>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('app')
);
