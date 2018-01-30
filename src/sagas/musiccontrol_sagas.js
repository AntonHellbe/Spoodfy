import {
    take,
    fork,
    put,
    select
} from 'redux-saga/effects';
import {
    loadNextTrack,
    loadNextQueueTrack,
    updateRecentlyPlayed,
} from '../actions/music_actions';
import {
    togglePlaying
} from '../actions/musiccontrol_actions';
import {
    musicControlActions
} from '../constants/actions';

const getMusic = state => state.music;

function* requestNextTrack() {
    while (true) {
        yield take(musicControlActions.REQUEST_NEXT_TRACK);
        const music = yield select(getMusic);
        let index;
        let nextTrack = null;
        const {
            shuffle,
            queue,
            playingIndex,
            tracklist,
        } = music;

        if (shuffle && queue.length === 0) {
            index = Math.floor(Math.random() * tracklist.length - 1) + 1;
            nextTrack = tracklist[index];
            yield put(updateRecentlyPlayed(tracklist[index]));
            yield put(loadNextTrack(index));
        } else if (queue.length > 0) {
            nextTrack = queue[0];
            yield put(loadNextQueueTrack());
        } else if (playingIndex < tracklist.length - 1) {
            nextTrack = tracklist[playingIndex + 1];
            yield put(loadNextTrack(playingIndex + 1));
        } else {
            yield put(togglePlaying());
        }

        if (nextTrack !== null) {
            yield put(updateRecentlyPlayed(nextTrack));
        }

    }
}

function* requestPreviousTrack() {
    while (true) {
        yield take(musicControlActions.REQUEST_PREVIOUS_TRACK);
        const music = yield select(getMusic);
        const {
            playingIndex,
            recentlyPlayed,
            tracklist
        } = music;
        if (playingIndex === 0) {
            return;
        }
        if (recentlyPlayed[recentlyPlayed.length - 1].id !== tracklist[playingIndex - 1].id) {
            yield put(updateRecentlyPlayed(tracklist[playingIndex - 1]));
        }
        yield put(loadNextTrack(playingIndex - 1));

    }

}

const musicControlSagas = [
    fork(requestNextTrack),
    fork(requestPreviousTrack)
];

export default musicControlSagas;