import { artistActions } from '../constants/actions';


export const topArtistsRequest = () => ({
    type: artistActions.REQUEST_TOP_ARTISTS
});

export const topArtistsSuccess = (topArtists) => ({
    type: artistActions.TOP_ARTISTS_SUCCESS,
    topArtists 
});

export const topArtistsError = (error) => ({
    type: artistActions.TOP_ARTISTS_ERROR,
    error
});

export const updateCurrentArtist = (artist) => ({
    type: artistActions.UPDATE_CURRENT_ARTIST,
    artist
});

export const requestRelatedArtists = (id) => ({
    type: artistActions.REQUEST_RELATED_ARTISTS,
    id
});

export const requestArtist = (id) => ({
    type: artistActions.REQUEST_ARTIST,
    id
});

export const artistSuccess = (artist) => ({
    type: artistActions.ARTIST_SUCCESS,
    artist
});

export const artistError = (error) => ({
    type: artistActions.ARTIST_ERROR,
    error
});

export const relatedArtistsSuccess = (artists) => ({
    type: artistActions.RELATED_ARTISTS_SUCCESS,
    artists
});

export const relatedArtistsError = (error) => ({
    type: artistActions.RELATED_ARTISTS_ERROR,
    error
});

export const followedArtistsSuccess = (artists) => ({
    type: artistActions.FOLLOWED_ARTISTS_SUCCESS,
    artists
});

export const followedArtistsError = (error) => ({
    type: artistActions.FOLLOWED_ARTISTS_ERROR,
    error
});

export const requestFollowArtist = (id, action) => ({
    type: artistActions.REQUEST_FOLLOW_ARTIST,
    id,
    action
});

export const followActionSuccess = () => ({
    type: artistActions.FOLLOW_ACTION_SUCCESS,
});
