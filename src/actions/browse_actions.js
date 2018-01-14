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

export const requestCategories = () => ({
    type: browseActions.REQUEST_CATEGORIES,
});

export const categoriesSuccess = (categories) => ({
    type: browseActions.CATEGORIES_SUCCESS,
    categories
});

export const categoriesError = (error) => ({
    type: browseActions.CATEGORIES_ERROR,
    error
});

export const requestCategoryPlaylists = (id) => ({
    type: browseActions.REQUEST_CATEGORY_PLAYLISTS,
    id
});

export const categoryPlaylistsSuccess = (playlists) => ({
    type: browseActions.CATEGORY_PLAYLISTS_SUCCESS,
    playlists
});

export const categoryPlaylistsError = (error) => ({
    type: browseActions.CATEGORY_PLAYLISTS_ERROR,
    error
});