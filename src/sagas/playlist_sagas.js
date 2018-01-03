import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { spotifyUrls } from '../constants/spotify';
import { playlistActions } from '../constants/actions';
import { playlistsFetched, playlistError } from '../actions/playlist_actions';


export function* myPlaylists({ token }) {
    const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.myPlaylists}`;
    try {
        const data = yield call(axios.get, URL, token);
        yield put(playlistsFetched(data.data.items));
    } catch (e) {
        console.log('ERROR OCCURED');
        console.log(e);
        yield put(playlistError(e));
    }
}


export const playlistSagas = [
    takeLatest(playlistActions.MY_PLAYLISTS, myPlaylists),
];