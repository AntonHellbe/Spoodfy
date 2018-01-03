import { browseActions } from '../constants/actions';


export const newReleasesRequest = () => ({
    type: browseActions.NEW_RELEASES_REQUESTED,
});

export const newReleasesSuccess = (newReleases) => ({
    type: browseActions.NEW_RELEASES_SUCCESS,
    newReleases
});

export const newReleasesError = (error) => ({
    type: browseActions.NEW_RELEASES_ERROR,
    error
});