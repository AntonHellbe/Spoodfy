import { call, put, takeLatest, take, fork } from 'redux-saga/effects';
import axios from 'axios';
import { searchActions } from '../constants/actions';
import { 
    searchSuccess, 
    searchError,
    topTracks } from '../actions/search_actions';
import { spotifyUrls } from '../constants/spotify';


export function* searchRequested({ term }) {
    const searchResult = {};
    const searchUrl = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.search}q=${term}&type=track,album,artist`; //eslint-disable-line
    try {
        const data = yield call(axios.get, searchUrl);
        searchResult.tracks = data.data.tracks.items;
        searchResult.albums = data.data.albums.items;
        searchResult.artists = data.data.artists.items;
        yield put(searchSuccess(searchResult));
    } catch (e) {
        console.log('Error' + e);
        yield put(searchError(e));
    }
}

export function* getTopResult() {
    while (true) {
        let { result } = yield take(searchActions.SEARCH_SUCCESS);
        if (result.length > 5) {
            result = result.slice(0, 5);
        }
        yield put(topTracks(result));
    }
}


export const searchSagas = [
    takeLatest(searchActions.SEARCH_REQUESTED, searchRequested),
    fork(getTopResult),
];