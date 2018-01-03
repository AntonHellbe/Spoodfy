import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { browseActions } from '../constants/actions';
import { spotifyUrls } from '../constants/spotify';
import {
    newReleasesSuccess,
    newReleasesError
} from '../actions/browse_actions';


export function* fetchNewReleases() {
    const URL = `${spotifyUrls.baseURL}${spotifyUrls.version}${spotifyUrls.browse}${spotifyUrls.newReleases}`;
    try {
        const data = yield call(axios.get, URL);
        yield put(newReleasesSuccess(data.data.albums.items));
    } catch (e) {
        yield put(newReleasesError(e));
    }
}


export const browseSagas = [
    takeLatest(browseActions.NEW_RELEASES_REQUESTED, fetchNewReleases),
];