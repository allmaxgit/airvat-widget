import { createReducer } from 'reduxsauce';

import TYPES from '../../constants/actionTypes';

const someActionHandler = (state, { payload }) => {
  
  // const {
  //   //val1,
  //   //val2,
  //   //val3,
  // } = payload;

  return { ...state, /* val1, val2, val3 */ };
};

const HANDLERS = {
  [TYPES.SOME_ACTION]: someActionHandler,
};

const INITIAL_STATE = {
  // key: val,
  // key: val,
  // key: val
};

export default createReducer(INITIAL_STATE, HANDLERS);
