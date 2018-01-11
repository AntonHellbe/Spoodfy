import { all } from 'redux-saga/effects';
import { playlistSagas } from './playlist_sagas';
import { authSagas } from './auth_sagas';
import { searchSagas } from './search_sagas';
import { musicSagas } from './music_sagas';
import { browseSagas } from './browse_sagas';
import { artistsSagas } from './artists_sagas';
import trackSagas from './tracks_sagas';

export default function* rootSaga() {
    yield all([
        ...playlistSagas,
        ...authSagas,
        ...searchSagas,
        ...musicSagas,
        ...browseSagas,
        ...artistsSagas,
        ...trackSagas
    ]);
}