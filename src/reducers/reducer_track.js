import { trackActions } from '../constants/actions';

const INITIAL_STATE = {
    userTopTracks: [],
    artistTopTracks: [],
    recentlyPlayed: [],
    loadingTracks: false,
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
                recentlyPlayed: action.recentTracks
            };
        case trackActions.ERROR_RECENTLY_PLAYED:
            return {
                ...state,
                errorRecentlyPlayed: action.error
            };


        default:
            return state;
    }

};


export default tracksReducer;