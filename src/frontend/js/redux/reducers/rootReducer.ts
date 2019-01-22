import { createReducer } from 'reduxsauce';

import TYPES from '../../constants/actionTypes';

// const someActionHandler = (state, { payload }) => {
//   return { ...state };
// };

export type RootState = {
  readonly sortBy: string;
  readonly sortOrder: string;
  readonly filter: {
    readonly firstName: string,
    readonly surname: string,
    readonly email: string,
    readonly phone: string,
    readonly residenceCountry: string,
    readonly residenceCity: string,
    readonly lastActiveFrom: string,
    readonly lastActiveTo: string,
  },
  readonly users: ReadonlyArray<any>,
  readonly limit: number,
  readonly page: number,
  readonly count: number,
  readonly loaded: boolean,
};


const setUsersHandler = (
  state: RootState,
  { users, limit }: { users: any, limit: number }
): RootState => ({
  ...state,
  users,
  limit,
});

const setLoadedHandler = (
  state: RootState,
  { loaded }: { loaded: boolean }
): RootState => ({
  ...state,
  loaded,
});

const changeSortOrderHandler = (
  state: RootState,
  { field }: { field: string }
): RootState => {
  const { sortBy, sortOrder } = state;

  if (sortBy !== field) {
    return {
      ...state,
      sortBy: field,
      sortOrder: 'asc',
    }
  }

  if (sortOrder === 'asc') {
    return {
      ...state,
      sortOrder: 'desc',
    }
  }

  return {
    ...state,
    sortBy: '',
    sortOrder: '',
    page: 0,
  };
};

const setFilterHandler = (
  state: RootState,
  {
    field,
    value
  }: {
    field: string,
    value: string,
  }
): RootState => ({
  ...state,
  page: 0,
  filter: {
    ...state.filter,
    [field]: value,
  }
});

const setPageHandler = (
  state: RootState,
  {
    page,
  }: {
    page: number,
  }
): RootState => ({
  ...state,
  page,
});

const HANDLERS = {
  [TYPES.SET_USERS]: setUsersHandler,
  [TYPES.SET_LOADED]: setLoadedHandler,
  [TYPES.SET_FILTER]: setFilterHandler,
  [TYPES.CHANGE_SORT_ORDER]: changeSortOrderHandler,
  [TYPES.SET_PAGE]: setPageHandler,
};

const INITIAL_STATE: RootState = {
  sortBy: '',
  sortOrder: '',
  filter: {
    firstName: '',
    surname: '',
    email: '',
    phone: '',
    residenceCountry: '',
    residenceCity: '',
    lastActiveFrom: '',
    lastActiveTo: '',
  },
  users: [],
  limit: 0,
  page: 0,
  count: 20,
  loaded: false,
};

export default createReducer(INITIAL_STATE, HANDLERS);
