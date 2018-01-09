import { take, put, call, fork, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { spotifyUrls } from '../constants/spotify';
import { artistActions } from '../constants/actions';
import {
    topArtistsSuccess,
    topArtistsError,
    artistSuccess,
    artistError,
    relatedArtistsSuccess,
    relatedArtistsError,
    topTracksSuccess,
    topTracksError,
    artistAlbumsSuccess,
    artistAlbumsError
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
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.artists}/${id}${spotifyUrls.relatedArtists}`;
        // console.log(URL);
        try {
            const data = yield call(axios.get, URL);
            // console.log(data);
            yield put(relatedArtistsSuccess(data.data.artists));
        } catch (e) {
            yield put(relatedArtistsError(e));
        }
    }
}

export function* topTracksFetch({ id }) {
    const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.artists}/${id}${spotifyUrls.topTracks}?country=SE`;
    try {
        const data = yield call(axios.get, URL);
        yield put(topTracksSuccess(data.data.tracks));
    } catch (e) {
        yield put(topTracksError(e));
    }
}

export function* artistAlbumsFetch({ id }) {
    const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.artists}/${id}${spotifyUrls.albums}${spotifyUrls.market}`;
    console.log(URL);
    try {
        const data = yield call(axios.get, URL);
        yield put(artistAlbumsSuccess(data.data.items));
    } catch (e) {
        console.log(e);
        yield put(artistAlbumsError(e));
    }
}


export const artistsSagas = [
    fork(topArtistsFetch),
    fork(artistFetch),
    fork(relatedArtistsFetch),
    takeLatest(artistActions.REQUEST_ARTIST_TOP_TRACKS, topTracksFetch),
    takeLatest(artistActions.REQUEST_ARTIST_ALBUMS, artistAlbumsFetch),
];