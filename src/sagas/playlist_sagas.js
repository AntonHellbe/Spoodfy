import { put, call, takeLatest, take, fork, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { spotifyUrls } from '../constants/spotify';
import { 
    playlistActions,
    authActions,
    browseActions
} from '../constants/actions';
import { 
    playlistsFetched, 
    playlistError,
    isFollowingPlaylistSuccess,
    isFollowingPlaylistError,
    followPlaylistSuccess,
    removeTrackSuccess,
    featuredPlaylistsSuccess,
    featuredPlaylistsError
} from '../actions/playlist_actions';
import { 
    startSubmit,
    stopSubmit
} from 'redux-form'


function* userPlaylistsFetch() {
    while (true) {
        yield take([authActions.USER_INFO_SUCCESS,
            playlistActions.IS_FOLLOWING_SUCCESS]);
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
        const { playlist, spotifyId } = yield take([playlistActions.UPDATE_PLAYLIST_ID, 
            playlistActions.FOLLOW_PLAYLIST_SUCCESS]);
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

function* addTrackToPlaylist({ spotifyId, playlistId, trackUri }) {
    const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.users}/` +
        `${spotifyId}${spotifyUrls.playlists}/${playlistId}${spotifyUrls.tracks}?uris=${trackUri}`;
    // console.log(URL);
    try {
        const data = yield call(axios.post, URL);
        if (data.status === 201) {
            //Add success to post notification that track is added
        }
        
        console.log(data);
    } catch (e) {
        console.log(e);
    }
}

function* removeTrackFromPlaylistHelper({ spotifyId, playlist, trackUri }) {
    // console.log(spotifyId, trackUri);
    const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.users}/` +
    `${spotifyId}${spotifyUrls.playlists}/${playlist.id}${spotifyUrls.tracks}`;
    // console.log(URL);
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
        yield take(browseActions.NEW_RELEASES_REQUESTED);
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.browse}`
        + `${spotifyUrls.featuredPlaylists}?${spotifyUrls.queryCountry}&limit=5`;
        // console.log(URL);
        
        try {
            const data = yield call(axios.get, URL);
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
            playlist
        } = yield take(playlistActions.REQUEST_UPDATE_PLAYLIST_DETAILS);
        const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.users}` +
        `/${spotifyId}${spotifyUrls.playlists}/${playlist.id}`;
        console.log(values);
        yield put(startSubmit('playlist'));
        try {
            const data = yield call(axios.put, URL, {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    name: values.name,
                    public: values.publicPlaylist,
                    collaborative: values.collaborative,
                    description: values.description
                }
            });
            console.log(data);
            if (data.status === 200) {
                yield put(stopSubmit('playlist'));
            }

            console.log(data);
        } catch (e) {
            yield put(stopSubmit('playlist'));
            console.log(e);
        }

    }
};


const playlistSagas = [
    fork(followedPlaylistsFetch),
    fork(followPlaylistRequest),
    fork(userPlaylistsFetch),
    fork(featuredPlaylistsFetch),
    fork(updatePlaylistHelper),
    takeLatest(playlistActions.REQUEST_ADD_TRACK_PLAYLIST, addTrackToPlaylist),
    takeEvery(playlistActions.REQUEST_REMOVE_TRACK_PLAYLIST, removeTrackFromPlaylistHelper)
];

export default playlistSagas;