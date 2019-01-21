import 'regenerator-runtime/runtime';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import rootReducer from './reducers/rootReducer';
import someSagas from './sagas/someSagas';

const rootPersistConfig = {
  key: 'persist',
  storage,
};

const rootPersistReducer = persistReducer(rootPersistConfig, rootReducer);

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

//redux extension composer
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export default function configureStore(history) {
  const store = createStore(
    combineReducers({ root: rootPersistReducer, routing: routerReducer }),
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware ))
  );

  // then run the saga
  sagaMiddleware.run(someSagas);

  const persistor = persistStore(store);

  return { store, persistor };
}
