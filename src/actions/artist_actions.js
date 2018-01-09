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