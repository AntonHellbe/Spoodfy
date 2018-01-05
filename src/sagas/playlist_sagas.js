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
        // console.log(e);
        yield put(playlistError(e));
    }
}

export function* playlistTracks() {
    while (true) {
        const { playlistId, spotifyId } = yield take(playlistActions.UPDATE_PLAYLIST_ID);
        console.log('Requesting data');
        console.log(axios.defaults.headers.common['Authorization']);
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.users}/${spotifyId}${spotifyUrls.playlists}/${playlistId}${spotifyUrls.tracks}?limit=50`;
        try {
            console.log('Calling Axios get');
            const data = yield call(axios.get, URL);
            // console.log(data.data);
            // console.log(JSON.parse(data.request.response));
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