import axios from 'axios';
import { take, fork, put, call } from 'redux-saga/effects';
import { authActions, musicActions } from '../constants/actions';
import { spotifyUrls } from '../constants/spotify';
import { 
    updateRecentlyPlayed, 
    errorRecentlyPlayed,
    playAlbumSuccess,
    playAlbumError,
} from '../actions/music_actions';


export function* recentlyPlayedFetch() {
    while (true) {
        yield take([authActions.SET_TOKEN, authActions.INITIAL_AUTH_SUCCESS]);
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}` +
        `${spotifyUrls.userInfo}${spotifyUrls.recentlyPlayed}`;
        try {
            const data = yield call(axios.get, URL);
            yield put(updateRecentlyPlayed(data.data.items));
            
        } catch (e) {
            yield put(errorRecentlyPlayed(e));
        }
    }
}

export function* albumTracksFetch() {
    while (true) {
        const { id, album } = yield take(musicActions.REQUEST_PLAY_ALBUM);
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}` +
        `${spotifyUrls.albums}/${id}${spotifyUrls.tracks}`;
        try {
            const data = yield call(axios.get, URL);
            const tracks = data.data.items.map((track) => {
                return (
                    { ...track, album }
                );
            });
            // console.log(tracks);
            yield put(playAlbumSuccess(tracks, album));
        } catch (e) {
            console.log(e);
            yield put(playAlbumError(e));
        }
    }
}


export const musicSagas = [
    fork(recentlyPlayedFetch),
    fork(albumTracksFetch),
];