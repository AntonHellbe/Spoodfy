import axios from 'axios';
import { take, fork, put, call } from 'redux-saga/effects';
import { musicActions } from '../constants/actions';
import { spotifyUrls } from '../constants/spotify';
import { 
    playAlbumSuccess,
    playAlbumError,
} from '../actions/music_actions';


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
    fork(albumTracksFetch),
];