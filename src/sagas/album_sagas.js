import { 
    takeLatest, 
    call, 
    put,
    take,
    fork
} from 'redux-saga/effects';
import axios from 'axios';
import { spotifyUrls } from '../constants/spotify';
import { albumActions } from '../constants/actions';
import {
    artistAlbumsSuccess,
    artistAlbumsError,
    albumTracksError,
    albumTracksSuccess
} from '../actions/album_actions';


function* artistAlbumsFetch({ id }) {
    const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.artists}` +
        `/${id}${spotifyUrls.albums}${spotifyUrls.market}${spotifyUrls.queryAlbumType}album`;
    console.log(URL);
    try {
        const data = yield call(axios.get, URL);
        // console.log(data);
        yield put(artistAlbumsSuccess(data.data.items));
    } catch (e) {
        console.log(e);
        yield put(artistAlbumsError(e));
    }
}

function* albumTracksFetch() {
    while (true) {
        const { id, album } = yield take(albumActions.REQUEST_ALBUM_TRACKS);
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
            yield put(albumTracksSuccess(tracks));
        } catch (e) {
            console.log(e);
            yield put(albumTracksError(e));
        }
    }
}

const albumSagas = [
    takeLatest(albumActions.REQUEST_ARTIST_ALBUMS, artistAlbumsFetch),
    fork(albumTracksFetch),
];

export default albumSagas;
