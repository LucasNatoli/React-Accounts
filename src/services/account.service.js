import { 
    //authHeader, 
    config 
} from '../helpers';
import { SHA3 } from 'sha3'

export const accountsService = {
    login,
    logout,
    register,
};

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
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    return fetch(`${config.apiUrl}/logout`, requestOptions).then(handleResponse);
}

function register(user) {
    let json_body = JSON.stringify(user)
    console.log('json_body.password A: ',json_body.password)
    const hash = new SHA3(512)
    hash.update(json_body.password)
    json_body.password = hash.digest('hex')
    console.log('json_body.password B: ',json_body.password)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: json_body
    };

    return fetch(`${config.apiUrl}/register`, requestOptions).then(handleResponse);
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
