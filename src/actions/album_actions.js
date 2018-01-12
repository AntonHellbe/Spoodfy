import { albumActions } from '../constants/actions';

export const requestArtistAlbums = (id) => ({
    type: albumActions.REQUEST_ARTIST_ALBUMS,
    id
});

export const artistAlbumsSuccess = (albums) => ({
    type: albumActions.ARTIST_ALBUMS_SUCCESS,
    albums
});

export const artistAlbumsError = (error) => ({
    type: albumActions.ARTIST_ALBUMS_ERROR,
    error
});

export const requestAlbumTracks = (album) => ({
    type: albumActions.REQUEST_ALBUM_TRACKS,
    album
});

export const albumTracksSuccess = (tracks) => ({
    type: albumActions.ALBUM_TRACKS_SUCCESS,
    tracks
});

export const albumTracksError = (error) => ({
    type: albumActions.ALBUM_TRACKS_ERROR,
    error
});