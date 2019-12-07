import { accountConstants } from '../constants';

export function registration(state = {fetching: false}, action) {
  switch (action.type) {
    case accountConstants.REGISTER_REQUEST:
      return { fetching: true };
    case accountConstants.REGISTER_SUCCESS:
      return { fetching: false };
    case accountConstants.REGISTER_FAILURE:
      return { fetching: false };
    default:
      return state
  }
}