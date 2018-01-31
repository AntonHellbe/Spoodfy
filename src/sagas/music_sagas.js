import axios from 'axios';
import { 
    take, 
    fork, 
    put, 
    call,
    select
} from 'redux-saga/effects';
import { 
    musicActions,
} from '../constants/actions';
import { 
    spotifyUrls 
} from '../constants/spotify';
import { 
    selectTrack, 
    updateRecentlyPlayed 
} from '../actions/music_actions';
import {
    albumTracksSuccess,
    albumTracksError
} from '../actions/album_actions';

const getRecentlyPlayed = state => state.music.recentlyPlayed;

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

function* requestSelectTrack() {
    while (true) {
        const { 
            index, 
            track, 
            tracklist, 
            tracklistId 
        } = yield take(musicActions.REQUEST_SELECT_TRACK);
        const recentlyPlayed = yield select(getRecentlyPlayed);
        let correctIndex = 0;
        let tracksToPlay = [];

        if (tracklist.length > 0) {

            if (tracklist[0].track) {
                tracksToPlay = tracklist.filter((playlistTrack) => 
                    playlistTrack.track.preview_url !== null
                ).map((trackWithPreview) => 
                    trackWithPreview.track
                );
            } else {
                tracksToPlay = tracklist.filter((trackitem) => 
                    trackitem.preview_url !== null
                );
            }

            if (tracksToPlay.length === 0) {
                return;
            }
        }
        
        if (index !== 0) {
            tracksToPlay.find((trackItem, trackIndex) => {
                if (trackItem.id === track.id) {
                    correctIndex = trackIndex;
                }

                return null;
            });
        }

        const trackToPlay = track.preview_url ? track : tracksToPlay[0];
        if (!(recentlyPlayed.find((recentTrack) => recentTrack.id === track.id))) {
            yield put(updateRecentlyPlayed(trackToPlay));
        }
        // console.log(correctIndex, track, tracksToPlay, tracklistId);
        yield put(selectTrack(correctIndex, trackToPlay, tracksToPlay, tracklistId));
        
    }
}

const musicSagas = [
    fork(albumTracksFetch),
    fork(requestSelectTrack)
];

export default musicSagas;