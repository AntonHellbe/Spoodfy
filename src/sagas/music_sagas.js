import axios from 'axios';
import { take, fork, put, call } from 'redux-saga/effects';
import { authActions } from '../constants/actions';
import { spotifyUrls } from '../constants/spotify';
import { 
    updateRecentlyPlayed, 
    errorRecentlyPlayed 
} from '../actions/music_actions';


export function* recentlyPlayedFetch() {
    while (true) {
        yield take([authActions.SET_TOKEN, authActions.INITIAL_AUTH_SUCCESS]);
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.userInfo}${spotifyUrls.recentlyPlayed}`; //eslint-disable-line
        try {
            const data = yield call(axios.get, URL);
            if (data.data.items.length > 8) {
                yield put(updateRecentlyPlayed(data.data.items.slice(0, 7)));
            } else {
                yield put(updateRecentlyPlayed(data.data.items));
            }
        } catch (e) {
            yield put(errorRecentlyPlayed(e));
        }
    }
}


export const musicSagas = [
    fork(recentlyPlayedFetch)
];