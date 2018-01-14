import { browseActions } from '../constants/actions';

const INITIAL_STATE = {
    newReleases: [],
    newReleasesError: '',
    loadingBrowse: false,
    categories: [],
    browseError: '',
    categoryPlaylists: []
};

const browseReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case browseActions.NEW_RELEASES_SUCCESS:
            return { ...state, newReleases: action.newReleases };

        case browseActions.NEW_RELEASES_ERROR:
            return { ...state, newReleasesError: action.error };
        
        case browseActions.REQUEST_CATEGORIES:
            return { ...state, loadingBrowse: true };

        case browseActions.CATEGORIES_SUCCESS:
            return { ...state, categories: action.categories, loadingBrowse: false };
        
        case browseActions.CATEGORIES_ERROR:
            return { ...state, browseError: action.error, loadingBrowse: false };
        
        case browseActions.REQUEST_CATEGORY_PLAYLISTS:
            return { ...state, loadingBrowse: true };
        
        case browseActions.CATEGORY_PLAYLISTS_SUCCESS:
            return { ...state, categoryPlaylists: action.playlists, loadingBrowse: false };

        default:
            return state;
    }
};

export default browseReducer;