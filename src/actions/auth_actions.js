import { authActions } from '../constants/actions';

export const requestToken = (code) => {
    console.log('We are dispatched');
    return {
        type: authActions.REQUEST_TOKEN,
        code
    };
};

export const setToken = (token) => ({
    type: authActions.SET_TOKEN,
    token
});

export const errorToken = (error) => ({
    type: authActions.ERROR_TOKEN,
    error
});

export const clearToken = () => ({
    type: authActions.CLEAR_TOKEN,
});

export const initialAuthRequest = () => ({
    type: authActions.INITIAL_AUTH_REQUESTED
});

export const initialAuthSuccess = (token) => ({
    type: authActions.INITIAL_AUTH_SUCCESS,
    token
});

export const logoutRequest = () => ({
    type: authActions.LOGOUT_REQUESTED
});

export const userInformationRequested = () => ({
    type: authActions.USER_INFO_REQUESTED
});

export const userInformationSuccess = (user) => ({
    type: authActions.USER_INFO_SUCCESS,
    user
});

export const userInformationError = (error) => ({
    type: authActions.USER_INFO_ERROR,
    error
});

export const refreshToken = (token) => ({
    type: authActions.REFRESH_TOKEN,
    token

});