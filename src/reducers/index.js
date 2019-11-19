import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { notify } from './notify.reducer';


const rootReducer = combineReducers({
  authentication,
  registration,
  notify,
});

export default rootReducer;