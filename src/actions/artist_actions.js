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

export const requestTopTracks = (id) => ({
    type: artistActions.REQUEST_ARTIST_TOP_TRACKS,
    id
});

export const topTracksSuccess = (tracks) => ({
    type: artistActions.ARTIST_TOP_TRACKS_SUCCESS,
    tracks,
});

export const topTracksError = (error) => ({
    type: artistActions.ARTIST_TOP_TRACKS_ERROR,
    error
});

export const requestArtistAlbums = (id) => ({
    type: artistActions.REQUEST_ARTIST_ALBUMS,
    id
});

export const artistAlbumsSuccess = (albums) => ({
    type: artistActions.ARTIST_ALBUMS_SUCCESS,
    albums
});

export const artistAlbumsError = (error) => ({
    type: artistActions.ARTIST_ALBUMS_ERROR,
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