import { take, put, call, fork } from 'redux-saga/effects';
import axios from 'axios';
import { spotifyUrls } from '../constants/spotify';
import { artistActions } from '../constants/actions';
import {
    topArtistsSuccess,
    topArtistsError,
    artistSuccess,
    artistError
} from '../actions/artist_actions';

export function* topArtistsFetch() {
    while (true) {
        yield take(artistActions.REQUEST_TOP_ARTISTS);
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.userInfo}${spotifyUrls.top}${spotifyUrls.artists}${spotifyUrls.goodLimit}`;
        try {
            const data = yield call(axios.get, URL);
            yield put(topArtistsSuccess(data.data.items));
        } catch (e) {
            console.log(e);
            yield put(topArtistsError(e));
        }
    }
}

export function* artistFetch() {
    while (true) {
        const { id } = yield take(artistActions.REQUEST_ARTIST);
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.artists}/${id}`;
        try {
            const data = yield call(axios.get, URL);
            console.log(data);
            yield put(artistSuccess(data.data));
        } catch (e) {
            yield put(artistError(e));
        }
    }
}


export const artistsSagas = [
    fork(topArtistsFetch),
    fork(artistFetch),
];