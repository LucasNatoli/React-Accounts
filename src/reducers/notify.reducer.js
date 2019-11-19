import { notifyConstants } from '../constants';

export function notify(state = {}, action) {
  switch (action.type) {
    case notifyConstants.SUCCESS:
      return {
        type: notifyConstants.SUCCESS,
        message: action.message
      };
    case notifyConstants.ERROR:
      return {
        type: notifyConstants.ERROR,
        message: action.message
      };
    case notifyConstants.CLEAR:
      return {};
    default:
      return state
  }
}