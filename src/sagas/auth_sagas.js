import { 
    call, 
    put, 
    takeEvery, 
    takeLatest, 
    take, 
    fork 
} from 'redux-saga/effects';
import axios from 'axios';
import { authActions } from '../constants/actions';
import { 
    setToken, 
    errorToken, 
    initialAuthSuccess, 
    clearToken,
    userInformationSuccess,
    userInformationError,
    } 
    from '../actions/auth_actions';
import { spotifyUrls } from '../constants/spotify';
import history from '../history';
import { store } from '../app';


function* requestToken() {
    const URL = 'http://localhost:5000/token';
    try {
        const data = yield call(axios.get, URL);
        axios.defaults.headers.common.Authorization = `Bearer ${data.data}`; //eslint-disable-line
        axios.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            let originalRequest = error.config; //eslint-disable-line
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                return axios.get('http://localhost:5000/refreshtoken')
                .then((newToken) => {
                    store.dispatch(setToken(newToken.data));
                    axios.defaults.headers.common.Authorization = `Bearer ${newToken.data}`;
                    return axios(originalRequest);
                }).catch(() => {
                    store.dispatch(clearToken());
                    window.sessionStorage.removeItem('token');
                    history.push('/login');
                });
            }
        });
        yield put(setToken(data.data));
        window.sessionStorage.setItem('token', data.data);
        yield history.push('/new-releases');
    } catch (e) {
        yield put(errorToken(e));
        yield history.push('/login');
    }
}


function* initialAuth() {
    const token = window.sessionStorage.getItem('token');
    if (token != null) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        yield put(initialAuthSuccess(token));
        yield history.push('/new-releases');
    }
}

function* logoutHandler() {
    window.sessionStorage.removeItem('token');
    axios.defaults.headers.common.Authorization = ''; //eslint-disable-line
    yield put(clearToken());
    yield history.push('/login');
}

function* requestUserinformation() {
    while (true) {
        yield take([authActions.SET_TOKEN, authActions.INITIAL_AUTH_SUCCESS]);
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.userInfo}`;
        try {
            const data = yield call(axios.get, URL);
            yield put(userInformationSuccess(data.data));
        } catch (e) {
            yield put(userInformationError(e));
            window.sessionStorage.removeItem('token');
            yield history.push('/login'); // Error with fetching userdata - Redirect back to login
        }
    }
}

const authSagas = [
    takeEvery(authActions.REQUEST_TOKEN, requestToken),
    takeLatest(authActions.INITIAL_AUTH_REQUESTED, initialAuth),
    takeLatest(authActions.LOGOUT_REQUESTED, logoutHandler),
    fork(requestUserinformation),
];

export default authSagas;