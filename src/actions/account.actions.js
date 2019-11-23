import { accountConstants } from '../constants';
import { accountsService } from '../services';
import { notifyActions } from './notify.actions';
import { history } from '../helpers';

export const accountActions = {
    login,
    logout,
    register,
    checkSession,
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email: email }));

        accountsService.login(email, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(notifyActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: accountConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: accountConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: accountConstants.LOGIN_FAILURE, error } }
}

function logout() {
    accountsService.logout();
    return { type: accountConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        accountsService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(notifyActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(notifyActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: accountConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: accountConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: accountConstants.REGISTER_FAILURE, error } }
}


function checkSession() {
    return dispatch => {
        dispatch(request());

        accountsService.checkSession()
            .then(
                results => { 
                    dispatch(success());
                    dispatch(notifyActions.success(results[0].serverTime));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(notifyActions.error(error.toString()));
                }
            );
    };
    function request() { return { type: accountConstants.CHECK_SESSION_REQUEST,  } }
    function success(user) { return { type: accountConstants.CHECK_SESSION_SUCCESS, user } }
    function failure(error) { return { type: accountConstants.CHECK_SESSION_FAILURE, error } }
}
