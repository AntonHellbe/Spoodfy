import { take, put, call, fork, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { spotifyUrls } from '../constants/spotify';
import { artistActions, authAuctions, authActions } from '../constants/actions';
import {
    topArtistsSuccess,
    topArtistsError,
    artistSuccess,
    artistError,
    relatedArtistsSuccess,
    relatedArtistsError,
    artistAlbumsSuccess,
    artistAlbumsError,
    followedArtistsSuccess,
    followedArtistsError,
    followActionSuccess
} from '../actions/artist_actions';

export function* topArtistsFetch() {
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

export function* artistFetch() {
    while (true) {
        const { id } = yield take(artistActions.REQUEST_ARTIST);
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.artists}/${id}`;
        try {
            const data = yield call(axios.get, URL);
            // console.log(data);
            yield put(artistSuccess(data.data));
        } catch (e) {
            yield put(artistError(e));
        }
    }
}

export function* relatedArtistsFetch() {
    while (true) {
        const { id } = yield take(artistActions.REQUEST_ARTIST);
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}` +
        `${spotifyUrls.artists}/${id}${spotifyUrls.relatedArtists}`;
        try {
            const data = yield call(axios.get, URL);
            yield put(relatedArtistsSuccess(data.data.artists));
        } catch (e) {
            yield put(relatedArtistsError(e));
        }
    }
}


export function* artistAlbumsFetch({ id }) {
    const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.artists}`+
    `/${id}${spotifyUrls.albums}${spotifyUrls.market}`;
    // console.log(URL);
    try {
        const data = yield call(axios.get, URL);
        // console.log(data);
        yield put(artistAlbumsSuccess(data.data.items));
    } catch (e) {
        console.log(e);
        yield put(artistAlbumsError(e));
    }
}

export function* followedArtistsRequest() {
    while (true) {
        yield take([authActions.SET_TOKEN, authActions.INITIAL_AUTH_SUCCESS, artistActions.FOLLOW_ACTION_SUCCESS]);
        console.log('Fetching followed artists!');
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}` +
        `${spotifyUrls.userInfo}${spotifyUrls.following}?type=artist`;
        try {
            const data = yield call(axios.get, URL);
            yield put(followedArtistsSuccess(data.data.artists.items));
        } catch (e) {
            console.log(e);
            yield put(followedArtistsError(e));
        }
    }
}

export function* followActionRequest({ id, action }) {
    const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.userInfo}` +
        `${spotifyUrls.following}?type=artist&ids=${id}`;
    try {
        const data = action === 'follow' ? yield call(axios.put, URL) : yield call(axios.delete, URL);
        if (data.status === 204) {
            console.log('Status is OK, yielding Action success');
            yield put(followActionSuccess());
        }

        //Handle error
        console.log(data);
    } catch (e) {
        console.log(e);
    }

}


export const artistsSagas = [
    fork(topArtistsFetch),
    fork(artistFetch),
    fork(relatedArtistsFetch),
    fork(followedArtistsRequest),
    takeLatest(artistActions.REQUEST_ARTIST_ALBUMS, artistAlbumsFetch),
    takeLatest(artistActions.REQUEST_FOLLOW_ARTIST, followActionRequest)
];