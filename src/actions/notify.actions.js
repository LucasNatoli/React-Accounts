import { notifyConstants } from '../constants';

export const notifyActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: notifyConstants.SUCCESS, message };
}

function error(message) {
    return { type: notifyConstants.ERROR, message };
}

function clear() {
    return { type: notifyConstants.CLEAR };
}