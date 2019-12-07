import { combineReducers } from 'redux';

import { accountInfo } from './account-info.reducer';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { notify } from './notify.reducer';


const rootReducer = combineReducers({
  accountInfo,
  authentication,
  registration,
  notify,
});

export default rootReducer;