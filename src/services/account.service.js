import {
    authHeader, 
    config
} from '../helpers';
import { SHA3 } from 'sha3'

export const accountsService = {
    checkSession,
    login,
    logout,
    register,
};

function checkSession() {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/check-session`, requestOptions)
        .then(handleResponse)
        .then(
            results => {
                return results;
            }
        );
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                //TODO: Check this out => location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

function login(email, password) {

    const hash = new SHA3(512)
    hash.update(password)
    const password_hash = hash.digest('hex')

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: password_hash })
    };

    return fetch(`${config.apiUrl}/login`, requestOptions)
        .then(handleResponse)
        .then(
            user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                return user;
            }
        );
}

function logout() {
    // remove user from local storage to log user out
    localStorage.clear()

    return Promise.resolve()
}

function register(user) {

    const hash = new SHA3(512)
    hash.update(user.password)
    const body = {
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        password: hash.digest('hex')
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(`${config.apiUrl}/register`, requestOptions).then(handleResponse);
}
