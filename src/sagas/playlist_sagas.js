import { put, call, takeLatest, take, fork } from 'redux-saga/effects';
import axios from 'axios';
import { spotifyUrls } from '../constants/spotify';
import { 
    playlistActions,
    musicActions
} from '../constants/actions';
import { 
    playlistsFetched, 
    playlistError,
    playlistTracksError,
    playlistTracksSuccess,
    isFollowingPlaylistSuccess,
    isFollowingPlaylistError,
    followPlaylistSuccess,
    playPlaylistSuccess
} from '../actions/playlist_actions';
import { selectTrack } from '../actions/music_actions';


function* userPlaylistsFetch() {
    const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.myPlaylists}`;
    try {
        const data = yield call(axios.get, URL);
        yield put(playlistsFetched(data.data.items));
    } catch (e) {
        console.log('ERROR OCCURED');
        console.log(e);
        yield put(playlistError(e));
    }
}

function* playlistTracks() {
    while (true) {
        const { playlist } = yield take(playlistActions.UPDATE_PLAYLIST_ID);
        const URL = `${playlist.href}${spotifyUrls.tracks}?=limit50`;
        try {
            const data = yield call(axios.get, URL);
            // console.log(data);
            yield put(playlistTracksSuccess(data.data.items));
        } catch (e) {
            console.log('ERROR OCCURED - PLAYLISTTRACKS');
            yield put(playlistTracksError(e));
        }
    }
}

function* followedPlaylistsFetch() {
    while (true) {
        const { playlist, spotifyId } = yield take([playlistActions.UPDATE_PLAYLIST_ID, playlistActions.FOLLOW_PLAYLIST_SUCCESS]);
        const {
            id,
            owner
        } = playlist;
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.users}/` +
        `${owner.id}${spotifyUrls.playlists}/${id}${spotifyUrls.followers}` +
        `${spotifyUrls.contains}?${spotifyUrls.queryIds}${spotifyId}`;
        // console.log(URL);
        try {
            const data = yield call(axios.get, URL);
            // console.log(data.data[0]);
            yield put(isFollowingPlaylistSuccess(data.data[0]));
        } catch (e) {
            console.log(e);
            yield put(isFollowingPlaylistError(e));
        }
    }
}

function* followPlaylistRequest() {
    while (true) {
        const { 
            action, 
            playlist: {
                owner,
                id
            }, 
            spotifyId,
            playlist
        } = yield take(playlistActions.REQUEST_FOLLOW_PLAYLIST);
        console.log(playlist);
        
        try {
            const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.users}` +
            `/${owner.id}${spotifyUrls.playlists}/${id}${spotifyUrls.followers}`;
            console.log(URL);
            const data = action === 'follow' ? 
                yield call(axios.put, URL) :
                yield call(axios.delete, URL);
            if (data.status === 200) {
                yield put(followPlaylistSuccess(playlist, spotifyId));
            } else {
                //Empty
            }

            
        } catch (e) {
            console.log(e);
        }
    }
    
}

function* playPlaylistHelper({ playlistUrl, playlist }) {
    const URL = `${playlistUrl}${spotifyUrls.tracks}`;

    try {
        const data = yield call(axios.get, URL);
        const tracks = data.data.items.map((item) => item.track);
        yield put(playPlaylistSuccess(playlist, data.data.items));
        yield put(selectTrack(0, data.data.items[0].track, tracks, playlist.id));
        
    } catch (e) {
        console.log(e);
    }
}


const playlistSagas = [
    fork(playlistTracks),
    fork(followedPlaylistsFetch),
    fork(followPlaylistRequest),
    takeLatest(musicActions.REQUEST_PLAY_PLAYLIST, playPlaylistHelper),
    takeLatest([playlistActions.REQUEST_USER_PLAYLISTS, 
        playlistActions.IS_FOLLOWING_SUCCESS], userPlaylistsFetch),
];

export default playlistSagas;