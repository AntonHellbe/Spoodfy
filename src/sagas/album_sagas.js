import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { spotifyUrls } from '../constants/spotify';
import { albumActions } from '../constants/actions';
import {
    artistAlbumsSuccess,
    artistAlbumsError
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

const albumSagas = [
    takeLatest(albumActions.REQUEST_ARTIST_ALBUMS, artistAlbumsFetch)
];

export default albumSagas;
