import TYPES from '../../constants/actionTypes';

type ACTION_TYPE = {
  type: string,
  [x: string]: any,
}

export const setUsers = ({ users, limit }: { users: Array<any>, limit: number }): ACTION_TYPE => ({
  type: TYPES.SET_USERS,
  users,
  limit,
});

export const setLoaded = (loaded: boolean): ACTION_TYPE => ({
  type: TYPES.SET_LOADED,
  loaded,
});

export const changeSortOrder = (field: string): ACTION_TYPE => ({
  type: TYPES.CHANGE_SORT_ORDER,
  field,
});

export const setFilter = (field: string, value: string): ACTION_TYPE => ({
  type: TYPES.SET_FILTER,
  field,
  value,
});
