import axios from 'axios';
import { 
    take, 
    fork, 
    put, 
    call,
} from 'redux-saga/effects';

import { 
    musicActions
} from '../constants/actions';
import { spotifyUrls } from '../constants/spotify';
import { 
    selectTrack,
} from '../actions/music_actions';
import {
    albumTracksSuccess,
    albumTracksError
} from '../actions/album_actions';


function* albumTracksFetch() {
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

            const tracksToPlay = tracks.filter((track) => 
                track.preview_url !== null
            );
            // console.log(tracks);
            yield put(albumTracksSuccess(tracks));
            if (tracksToPlay.length !== 0) {
                yield put(selectTrack(0, tracksToPlay[0], tracksToPlay, id));
            }

            
        } catch (e) {
            console.log(e);
            yield put(albumTracksError(e));
        }
    }
}

const musicSagas = [
    fork(albumTracksFetch),
];

export default musicSagas;