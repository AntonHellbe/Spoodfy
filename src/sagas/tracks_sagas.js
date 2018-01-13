import axios from 'axios';
import { take, call, put, fork, takeLatest } from 'redux-saga/effects';
import { 
    trackActions, 
    musicActions, 
    authActions 
} from '../constants/actions';
import {
    userTopTracksSuccess, 
    userTopTracksError,
    artistTopTracksSuccess,
    artistTopTracksError,
    updateRecentlyPlayed,
    errorRecentlyPlayed
} from '../actions/track_actions';
import {
    spotifyUrls
} from '../constants/spotify';
import { selectTrack } from '../actions/music_actions';


function* userTopTracksFetch() {

    yield take(trackActions.REQUEST_USER_TOP_TRACKS);
    const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.userInfo}` +
    `${spotifyUrls.top}${spotifyUrls.tracks}`;
    try {
        const data = yield call(axios.get, URL);
        console.log(data);
        yield put(userTopTracksSuccess(data.data.items));
    } catch (e) {
        yield put(userTopTracksError(e));
        console.log(e);
    }
    
}

function* topTracksFetch({ id }) {
    const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}` +
        `${spotifyUrls.artists}/${id}${spotifyUrls.topTracks}?country=SE`;
    try {
        const data = yield call(axios.get, URL);
        yield put(artistTopTracksSuccess(data.data.tracks));
    } catch (e) {
        console.log(e);
        yield put(artistTopTracksError(e));
    }
}

function* playArtistTopTracksHelper() {
    const { id } = yield take(musicActions.REQUEST_PLAY_ARTIST_TOP_TRACKS);
    const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}` +
        `${spotifyUrls.artists}/${id}${spotifyUrls.topTracks}?country=SE`;
        console.log(URL);
    try {
        const data = yield call(axios.get, URL);
        console.log('Fetching...');
        console.log(data);
        yield put(selectTrack(0, data.data.tracks[0], data.data.tracks, id));
        yield put(artistTopTracksSuccess(data.data.tracks));
    } catch (e) {
        console.log(e);
        yield put(artistTopTracksError(e));
    }
}


function* recentlyPlayedFetch() {
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


const trackSagas = [
    fork(userTopTracksFetch),
    fork(playArtistTopTracksHelper),
    fork(recentlyPlayedFetch),
    takeLatest(trackActions.REQUEST_ARTIST_TOP_TRACKS, topTracksFetch),
];

export default trackSagas;
