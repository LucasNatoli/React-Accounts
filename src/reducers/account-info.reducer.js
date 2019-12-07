import { accountConstants } from '../constants';

export function accountInfo(state = { fullname : '', email : '', phone : '', fetching : false }, action) {
  switch (action.type) {

    case accountConstants.ACCOUNT_INFO_REQUEST:
      return { fetching: true };
    case accountConstants.ACCOUNT_INFO_SUCCESS:
      return Object.assign(
        {},
        action.accountInfo,
        { fetching: false }
      );
    case accountConstants.ACCOUNT_INFO_FAILURE:
      return { fetching: false };

    case accountConstants.UPDATE_ACCOUNT_REQUEST:
      return { fetching: true };
    case accountConstants.UPDATE_ACCOUNT_SUCCESS:
      return Object.assign(
        {},
        action.accountInfo,
        { fetching: false }
      );
    case accountConstants.UPDATE_ACCOUNT_FAILURE:
      return { fetching: false };

    default:
      return state
  }
}