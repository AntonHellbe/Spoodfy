import axios from 'axios';
import { take, fork, put, call, takeEvery } from 'redux-saga/effects';
import { authActions, musicActions } from '../constants/actions';
import { spotifyUrls } from '../constants/spotify';
import { 
    updateRecentlyPlayed, 
    errorRecentlyPlayed,
    playAlbumSuccess,
    playAlbumError,
    topArtistsSuccess,
    topArtistsError,
} from '../actions/music_actions';


export function* recentlyPlayedFetch() {
    while (true) {
        yield take([authActions.SET_TOKEN, authActions.INITIAL_AUTH_SUCCESS]);
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.userInfo}${spotifyUrls.recentlyPlayed}`; //eslint-disable-line
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
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.albums}/${id}${spotifyUrls.tracks}`;
        try {
            const data = yield call(axios.get, URL);
            // console.log(data.data.items);
            // console.log(album);
            yield put(playAlbumSuccess(data.data.items, album));
        } catch (e) {
            console.log(e);
            yield put(playAlbumError(e));
        }
    }
}

export function* topArtistsFetch() {
    while (true) {
        yield take(musicActions.REQUEST_TOP_ARTISTS);
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.userInfo}${spotifyUrls.top}${spotifyUrls.artists}${spotifyUrls.goodLimit}`;
        try {
            const data = yield call(axios.get, URL);
            console.log('Calling topArtists Success');
            yield put(topArtistsSuccess(data.data.items));
        } catch (e) {
            console.log(e);
            yield put(topArtistsError(e));
        }
    }


}


export const musicSagas = [
    fork(recentlyPlayedFetch),
    fork(albumTracksFetch),
    fork(topArtistsFetch),
];