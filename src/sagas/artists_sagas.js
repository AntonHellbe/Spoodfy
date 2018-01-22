import { take, put, call, fork, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { spotifyUrls } from '../constants/spotify';
import { artistActions, 
    authActions } from '../constants/actions';
import {
    topArtistsSuccess,
    topArtistsError,
    relatedArtistsSuccess,
    relatedArtistsError,
    followedArtistsSuccess,
    followedArtistsError,
    followActionSuccess,
    artistError,
    artistSuccess
} from '../actions/artist_actions';

function* topArtistsFetch() {
    while (true) {
        yield take(artistActions.REQUEST_TOP_ARTISTS);
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.userInfo}` +
        `${spotifyUrls.top}${spotifyUrls.artists}${spotifyUrls.goodLimit}`;
        try {
            const data = yield call(axios.get, URL);
            yield put(topArtistsSuccess(data.data.items));
        } catch (e) {
            console.log(e);
            yield put(topArtistsError(e));
        }
    }
}

function* artistFetch() {
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

function* relatedArtistsFetch() {
    while (true) {
        const { id } = yield take([artistActions.REQUEST_RELATED_ARTISTS, artistActions.REQUEST_ARTIST]);
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}` +
        `${spotifyUrls.artists}/${id}${spotifyUrls.relatedArtists}`;
        if (typeof id === 'undefined') {
            return;
        }
        try {
            const data = yield call(axios.get, URL);
            yield put(relatedArtistsSuccess(data.data.artists));
        } catch (e) {
            yield put(relatedArtistsError(e));
        }
    }
}

function* followedArtistsRequest() {
    while (true) {
        yield take([authActions.SET_TOKEN, 
            authActions.INITIAL_AUTH_SUCCESS, 
            artistActions.FOLLOW_ACTION_SUCCESS]);
        // console.log('Fetching followed artists!');
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}` +
        `${spotifyUrls.userInfo}${spotifyUrls.following}?type=artist`;
        // console.log(URL);
        try {
            const data = yield call(axios.get, URL);
            // console.log(data);
            yield put(followedArtistsSuccess(data.data.artists.items));
        } catch (e) {
            console.log(e);
            yield put(followedArtistsError(e));
        }
    }
}

function* followArtistRequest({ id, action }) {
    const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.userInfo}` +
        `${spotifyUrls.following}${spotifyUrls.queryType}artist${spotifyUrls.queryIds}${id}`;
    try {
        const data = action === 'follow' ? 
        yield call(axios.put, URL) : 
        yield call(axios.delete, URL);
        if (data.status === 204) {
            // console.log('Status is OK, yielding Action success');
            yield put(followActionSuccess());
        }

    } catch (e) {
        console.log(e);
    }

}

const artistsSagas = [
    fork(topArtistsFetch),
    fork(relatedArtistsFetch),
    fork(followedArtistsRequest),
    fork(artistFetch),
    takeLatest(artistActions.REQUEST_FOLLOW_ARTIST, followArtistRequest)
];

export default artistsSagas;