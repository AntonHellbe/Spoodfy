import { browseActions } from '../constants/actions';

const INITIAL_STATE = {
    newReleases: [],
    newReleasesError: ''
};

const browseReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case browseActions.NEW_RELEASES_SUCCESS:
            return { ...state, newReleases: action.newReleases };

        case browseActions.NEW_RELEASES_ERROR:
            return { ...state, newReleasesError: action.error };
        default:
            return state;
    }
};

export default browseReducer;