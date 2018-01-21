import { authActions } from '../constants/actions';

const INITIAL_STATE = {
    token: '',
    isAuthenticated: false,
    token_error: '',
    user: {},
    user_error: '',
    spotifyId: ''
};


const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case authActions.INITIAL_AUTH_SUCCESS:
            return { ...state, token: action.token, isAuthenticated: true };

        case authActions.SET_TOKEN:
            return { ...state, token: action.token, isAuthenticated: true };
        
        case authActions.CLEAR_TOKEN:
            return { ...state, token: '', isAuthenticated: false, user: {}, spotifyId: '' };
        
        case authActions.ERROR_TOKEN:
            return { ...state, token_error: action.error };
        
        case authActions.USER_INFO_SUCCESS:
            return { ...state, user: action.user, spotifyId: action.user.id };

        case authActions.USER_INFO_ERROR:
            return { ...state, user_error: action.error };
        
        default:
            return state;
    }
};

export default authReducer;