import { accountConstants } from '../constants';

export function registration(state = {}, action) {
  switch (action.type) {
    case accountConstants.REGISTER_REQUEST:
      return { registering: true };
    case accountConstants.REGISTER_SUCCESS:
      return {};
    case accountConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}