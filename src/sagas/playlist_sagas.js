import { put, call, takeLatest, take, fork, takeEvery, select } from 'redux-saga/effects';
import axios from 'axios';
import { 
    startSubmit,
    stopSubmit
} from 'redux-form';
import { spotifyUrls } from '../constants/spotify';
import { 
    playlistActions,
    authActions,
} from '../constants/actions';
import { 
    playlistsFetched, 
    playlistError,
    isFollowingPlaylistSuccess,
    isFollowingPlaylistError,
    followPlaylistSuccess,
    removeTrackSuccess,
    featuredPlaylistsSuccess,
    featuredPlaylistsError,
    updatePlaylistDetailsSuccess,
    updateActivePlaylist,
    addPlaylistSuccess
} from '../actions/playlist_actions';
import {
    hideModal
} from '../actions/modal_actions';


const getSpotifyId = state => state.user.spotifyId;

function* userPlaylistsFetch() {
    while (true) {
        yield take([authActions.USER_INFO_SUCCESS,
            playlistActions.IS_FOLLOWING_SUCCESS, 
            playlistActions.ADD_PLAYLIST_SUCCESS]);
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
}


function* followedPlaylistsFetch() {
    while (true) {
        const { playlist } = yield take([playlistActions.UPDATE_PLAYLIST_ID,
            playlistActions.FOLLOW_PLAYLIST_SUCCESS]);
        const spotifyId = yield select(getSpotifyId);
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
        
        try {
            const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.users}` +
            `/${owner.id}${spotifyUrls.playlists}/${id}${spotifyUrls.followers}`;
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

function* addTrackToPlaylist({ playlistId, spotifyId, trackUri }) {
    const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.users}/` +
        `${spotifyId}${spotifyUrls.playlists}/${playlistId}${spotifyUrls.tracks}?uris=${trackUri}`;
    // console.log(URL);
    console.log(URL);
    try {
        const data = yield call(axios.post, URL);
        if (data.status === 201) {
            yield put(hideModal());
            //Add success to post notification that track is added
        }
        
        console.log(data);
    } catch (e) {
        console.log(e);
    }
}

function* removeTrackFromPlaylistHelper({ playlist, trackUri }) {
    // console.log(spotifyId, trackUri);
    console.log(playlist);
    const spotifyId = yield select(getSpotifyId);
    const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.users}/` +
    `${spotifyId}${spotifyUrls.playlists}/${playlist.id}${spotifyUrls.tracks}`;
    console.log(URL);
    try {
        const data = yield call(axios.delete, URL, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                tracks: [{ uri: trackUri }]
            }
        });
        if (data.status === 200) {
            yield put(removeTrackSuccess(playlist));
        }
    } catch (e) {
        console.log(e);
    }
}

function* featuredPlaylistsFetch() {
    while (true) {
        yield take(playlistActions.REQUEST_FEATURED_PLAYLISTS);
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.browse}`
        + `${spotifyUrls.featuredPlaylists}?${spotifyUrls.queryCountry}&limit=12`;
        // console.log(URL);
        
        try {
            const data = yield call(axios.get, URL);
            console.log(data);
            yield put(featuredPlaylistsSuccess(data.data.playlists.items));
        } catch (e) {
            console.log(e);
            yield put(featuredPlaylistsError(e));
        }

    }
}

function* updatePlaylistHelper() {
    while (true) {
        const {
            values,
            spotifyId,
            playlist,
        } = yield take(playlistActions.REQUEST_UPDATE_PLAYLIST_DETAILS);
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.users}` +
        `/${spotifyId}${spotifyUrls.playlists}/${playlist.id}`;
        yield put(startSubmit('editPlaylist'));
        const {
            name,
            collaborative,
            description
        } = values;
        const requestBody = {
            name,
            collaborative,
            public: values.public
        };

        if (description.length > 1) {
            requestBody.description = description;
        }

        try {
            const data = yield call(axios.put, URL, requestBody);
            // console.log(data);
            if (data.status === 200) {
                yield put(stopSubmit('editPlaylist'));
                yield put(updatePlaylistDetailsSuccess(spotifyId, playlist.id));
                yield put(hideModal());
            }

        } catch (e) {
            console.log(e);
            yield put(stopSubmit('editPlaylist'));
        }

    }
}

function* updatePlaylistFetch({ playlistId }) {
    const spotifyId = yield select(getSpotifyId);
    const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.users}/` +
    `${spotifyId}${spotifyUrls.playlists}/${playlistId}`;
    try {
        const data = yield call(axios.get, URL);
        // console.log(data);
        yield put(updateActivePlaylist(data.data));
    } catch (e) {
        console.log(e);
    }
}

function* addPlaylistHelper() {
    while (true) {
        const { 
            values 
        } = yield take(playlistActions.REQUEST_ADD_PLAYLIST);
        const spotifyId = yield select(getSpotifyId);
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.users}/` +
        `${spotifyId}${spotifyUrls.playlists}`;
        yield put(startSubmit('addPlaylist'));
        try {
            const data = yield call(axios.post, URL, {
                name: values.name,
                public: values.public,
                collaborative: values.collaborative,
                description: values.description
            });
            // console.log(data);
            if (data.status === 201) {
                yield put(stopSubmit('addPlaylist'));
                yield put(hideModal());
                yield put(addPlaylistSuccess());
            } else {
                //If not 201, error occured.
                console.log('Error occured adding playlist');
                console.log(data.status);
            }
        } catch (e) {
            yield put(stopSubmit('addPlaylist'));
            // add Error handler that outputs the error inside the modal
            console.log(e);
        }

    }
}


const playlistSagas = [
    fork(followedPlaylistsFetch),
    fork(followPlaylistRequest),
    fork(userPlaylistsFetch),
    fork(featuredPlaylistsFetch),
    fork(updatePlaylistHelper),
    fork(addPlaylistHelper),
    takeLatest(playlistActions.REQUEST_ADD_TRACK_PLAYLIST, addTrackToPlaylist),
    takeEvery(playlistActions.REQUEST_REMOVE_TRACK_PLAYLIST, removeTrackFromPlaylistHelper),
    takeEvery(playlistActions.UPDATE_PLAYLIST_DETAILS_SUCCESS, updatePlaylistFetch)
];

export default playlistSagas;