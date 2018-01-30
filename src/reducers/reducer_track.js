import { trackActions } from '../constants/actions';

const INITIAL_STATE = {
    userTopTracks: [],
    artistTopTracks: [],
    recentlyPlayedSpotify: [],
    loadingTracks: false,
    playlistTracks: []
};

const tracksReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case trackActions.REQUEST_USER_TOP_TRACKS:
            return { ...state, loadingTracks: true };

        case trackActions.USER_TOP_TRACKS_SUCCESS:
            return { ...state, userTopTracks: action.tracks, loadingTracks: false };

        case trackActions.REQUEST_ARTIST_TOP_TRACKS:
            return { ...state, loadingTracks: true };

        case trackActions.ARTIST_TOP_TRACKS_SUCCESS:
            return { ...state, artistTopTracks: action.tracks, loadingTracks: false };

        case trackActions.UPDATE_RECENTLY_PLAYED:
            return {
                ...state,
                recentlyPlayedSpotify: action.recentTracks
            };
        case trackActions.ERROR_RECENTLY_PLAYED:
            return {
                ...state,
                errorRecentlyPlayed: action.error
            };
        case trackActions.REQUEST_PLAYLIST_TRACKS:
            return { ...state, loadingTracks: true };

        case trackActions.PLAYLIST_TRACKS_SUCCESS:
            return { ...state, playlistTracks: action.tracks, loadingTracks: false };


        default:
            return state;
    }

};


export default tracksReducer;