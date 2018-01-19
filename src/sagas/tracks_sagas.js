import axios from 'axios';
import { take, call, put, fork, takeLatest } from 'redux-saga/effects';
import { 
    trackActions, 
    musicActions, 
    authActions,
    playlistActions
} from '../constants/actions';
import {
    userTopTracksSuccess, 
    userTopTracksError,
    artistTopTracksSuccess,
    artistTopTracksError,
    updateRecentlyPlayed,
    errorRecentlyPlayed,
    playlistTracksSuccess,
    playlistTracksError,
    reuestPlaylistTracks
} from '../actions/track_actions';
import { 
    selectTrack 
} from '../actions/music_actions';
import {
    spotifyUrls
} from '../constants/spotify';


function* userTopTracksFetch() {

    yield take(trackActions.REQUEST_USER_TOP_TRACKS);
    const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.userInfo}` +
    `${spotifyUrls.top}${spotifyUrls.tracks}`;
    try {
        const data = yield call(axios.get, URL);
        // console.log(data);
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
    while (true) {
        const { id } = yield take(musicActions.REQUEST_PLAY_ARTIST_TOP_TRACKS);
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}` +
            `${spotifyUrls.artists}/${id}${spotifyUrls.topTracks}?country=SE`;
        try {
            const data = yield call(axios.get, URL);
            yield put(selectTrack(0, data.data.tracks[0], data.data.tracks, id));
            yield put(artistTopTracksSuccess(data.data.tracks));
        } catch (e) {
            console.log(e);
            yield put(artistTopTracksError(e));
        }
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

function* playPlaylistHelper({ playlistUrl, playlist }) {
    const URL = `${playlistUrl}${spotifyUrls.tracks}`;

    try {
        const data = yield call(axios.get, URL);
        const tracks = data.data.items
        .filter((item) => item.track.preview_url !== null)
            .map((item) => item.track);
        yield put(playlistTracksSuccess(tracks));
        yield put(selectTrack(0, tracks[0], tracks, playlist.id));

    } catch (e) {
        console.log(e);
    }
}

function* playlistTracks() {
    while (true) {
        const { playlist } = yield take([playlistActions.UPDATE_PLAYLIST_ID,
        playlistActions.REMOVE_TRACK_SUCCESS]);
        yield put(reuestPlaylistTracks());
        const URL = `${playlist.href}${spotifyUrls.tracks}?=limit50`;
        try {
            const data = yield call(axios.get, URL);
            yield put(playlistTracksSuccess(data.data.items));
        } catch (e) {
            console.log(e);
            yield put(playlistTracksError(e));
        }
    }
}


const trackSagas = [
    fork(playlistTracks),
    fork(userTopTracksFetch),
    fork(playArtistTopTracksHelper),
    fork(recentlyPlayedFetch),
    takeLatest(musicActions.REQUEST_PLAY_PLAYLIST, playPlaylistHelper),
    takeLatest(trackActions.REQUEST_ARTIST_TOP_TRACKS, topTracksFetch),
];

export default trackSagas;
