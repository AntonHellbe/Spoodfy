import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { browseActions } from '../constants/actions';
import { spotifyUrls } from '../constants/spotify';
import {
    newReleasesSuccess,
    newReleasesError,
    categoriesSuccess,
    categoriesError,
    categoryPlaylistsSuccess,
    categoryPlaylistsError
} from '../actions/browse_actions';


function* fetchNewReleases() {
    const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}` +
    `${spotifyUrls.browse}${spotifyUrls.newReleases}`;
    try {
        const data = yield call(axios.get, URL);
        yield put(newReleasesSuccess(data.data.albums.items));
    } catch (e) {
        yield put(newReleasesError(e));
    }
}

function* categoriesFetch() {
    const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}` +
    `${spotifyUrls.browse}${spotifyUrls.categories}`;
    try {
        const data = yield call(axios.get, URL);
        // console.log(data);
        yield put(categoriesSuccess(data.data.categories.items));
        // console.log(data);
    } catch (e) {
        yield put(categoriesError(e));
        console.log(e);
    }
}

function* categoryPlaylistsFetch({ id }) {
    const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}` +
    `${spotifyUrls.browse}${spotifyUrls.categories}/${id}${spotifyUrls.playlists}`;
    console.log(URL);
    try {
        const data = yield call(axios.get, URL);
        yield put(categoryPlaylistsSuccess(data.data.playlists.items));
        // console.log(data);
    } catch (e) {
        yield put(categoryPlaylistsError(e));
    }
}


const browseSagas = [
    takeLatest(browseActions.NEW_RELEASES_REQUESTED, fetchNewReleases),
    takeLatest(browseActions.REQUEST_CATEGORIES, categoriesFetch),
    takeLatest(browseActions.REQUEST_CATEGORY_PLAYLISTS, categoryPlaylistsFetch),
];

export default browseSagas;