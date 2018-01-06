import { put, call, takeLatest, take, fork } from 'redux-saga/effects';
import axios from 'axios';
import { spotifyUrls } from '../constants/spotify';
import { playlistActions } from '../constants/actions';
import { 
    playlistsFetched, 
    playlistError,
    playlistTracksError,
    playlistTracksSuccess
} from '../actions/playlist_actions';


export function* myPlaylists() {
    const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.myPlaylists}`;
    try {
        const data = yield call(axios.get, URL);
        yield put(playlistsFetched(data.data.items));
    } catch (e) {
        console.log('ERROR OCCURED');
        yield put(playlistError(e));
    }
}

export function* playlistTracks() {
    while (true) {
        const { playlist } = yield take(playlistActions.UPDATE_PLAYLIST_ID);
        const URL = `${playlist.href}${spotifyUrls.tracks}?=limit50`;
        try {
            const data = yield call(axios.get, URL);
            yield put(playlistTracksSuccess(data.data.items));
        } catch (e) {
            yield put(playlistTracksError(e));
        }
    }
}


export const playlistSagas = [
    takeLatest(playlistActions.MY_PLAYLISTS, myPlaylists),
    fork(playlistTracks),
];