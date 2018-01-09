import { searchActions } from '../constants/actions';

const INITIAL_STATE = {
    searchResult: {
        tracks: [],
        albums: [],
        artists: []
    },
    term: '',
    error: '',
    topResult: [],
    isSearching: false,
};


const searchReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case searchActions.SEARCH_REQUESTED:
            return { ...state, isSearching: true };

        case searchActions.UPDATE_TERM:        
            return { ...state, term: action.term };
        
        case searchActions.SEARCH_SUCCESS:
            return { ...state, searchResult: action.result, isSearching: false };

        case searchActions.UPDATE_TOP_TRACKS:
            return { ...state, topResult: action.top };
        default:
            return state;
    }
};

export default searchReducer;