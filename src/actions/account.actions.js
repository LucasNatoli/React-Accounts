import { accountConstants } from '../constants';
import { accountsService } from '../services';
import { alertActions } from './alert.actions';
import { history } from '../helpers';

export const accountActions = {
    login,
    logout,
    register,
/*     getAll,
    delete: _delete */
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        accountsService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
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
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: accountConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: accountConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: accountConstants.REGISTER_FAILURE, error } }
}
/* 
function getAll() {
    return dispatch => {
        dispatch(request());

        accountsService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: accountConstants.GETALL_REQUEST } }
    function success(users) { return { type: accountConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: accountConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        accountsService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: accountConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: accountConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: accountConstants.DELETE_FAILURE, id, error } }
} */