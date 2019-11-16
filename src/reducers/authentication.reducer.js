import { accountConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case accountConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case accountConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case accountConstants.LOGIN_FAILURE:
      return {};
    case accountConstants.LOGOUT:
      return {};
    default:
      return state
  }
}