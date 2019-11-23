import { accountConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user, loading: false } : { loggedIn: false, loading: false };

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
      return {
        loggedIn: false
      };
    case accountConstants.LOGOUT:
      return {
        loggedIn: false
      };
      
    case accountConstants.CHECK_SESSION_REQUEST:
      return {
        loading: true,
      };
    case accountConstants.CHECK_SESSION_SUCCESS:
      return {
        loading: false,
        loggedIn: true,
      };
    case accountConstants.CHECK_SESSION_FAILURE:
      return {
        loading: false,
        loggedIn: false,
      };

    default:
      return state
  }
}