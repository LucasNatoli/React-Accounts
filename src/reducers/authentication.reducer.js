import { accountConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { user, fetching: false } : { fetching: false };

export function authentication(state = initialState, action) {
  switch (action.type) {

    case accountConstants.GET_SERVER_STATUS_REQUEST:
      return { loading: true }
    case accountConstants.GET_SERVER_STATUS_SUCCESS:
      return { 
        status: action.status,
        loading: false 
      }
      
    case accountConstants.GET_SERVER_STATUS_FAILURE:
      return {
        err: action.err,
        loading: false 
      }

    case accountConstants.LOGIN_REQUEST:
      return {
        fetching: true,
        user: action.user
      };
    case accountConstants.LOGIN_SUCCESS:
      return {
        fetching: false,
        user: action.user
      };
    case accountConstants.LOGIN_FAILURE:
      return {
        fetching: false
      };
    case accountConstants.LOGOUT:
      return {
        fetching: false
      };
      
    case accountConstants.CHECK_TOKEN_REQUEST:
      return {
        fetching: true,
      };
    case accountConstants.CHECK_TOKEN_SUCCESS:
      return {
        fetching: false,
      };
    case accountConstants.CHECK_TOKEN_FAILURE:
      return {
        fetching: false,
      };

    default:
      return state
  }
}