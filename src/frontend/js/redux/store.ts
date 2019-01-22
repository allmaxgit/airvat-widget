import 'regenerator-runtime/runtime';
import {createStore, applyMiddleware, combineReducers, Store } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { compose } from "redux";
import rootReducer from './reducers/rootReducer';
import rootSaga from './sagas/rootSaga';
import {PersistConfig, Persistor} from "redux-persist/es/types";

const rootPersistConfig: PersistConfig = {
  key: 'persist',
  whitelist: ['some'],
  storage,
};

const rootPersistReducer = persistReducer(rootPersistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === 'object' &&
  (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export default function configureStore(): { store: Store<any>, persistor: Persistor } {
  const store = createStore(
    combineReducers({ root: rootPersistReducer }),
    composeEnhancers(applyMiddleware(sagaMiddleware ))
  );

  const rootSagaFix:any = rootSaga;

  sagaMiddleware.run(rootSagaFix);

  const persistor = persistStore(store);

  return { store, persistor };
}
