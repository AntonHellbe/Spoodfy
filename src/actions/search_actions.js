import { searchActions } from '../constants/actions';

export const updateTerm = (term) => ({
    type: searchActions.UPDATE_TERM,
    term
});

export const searchRequested = (term) => ({
    type: searchActions.SEARCH_REQUESTED,
    term
});

export const searchSuccess = (result) => ({
    type: searchActions.SEARCH_SUCCESS,
    result
});

export const searchError = (error) => ({
    type: searchActions.SEARCH_FAILURE,
    error
});

export const topTracks = (top) => ({
    type: searchActions.UPDATE_TOP_TRACKS,
    top
});