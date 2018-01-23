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

export const requestAlbumTracks = (id, album) => ({
    type: albumActions.REQUEST_ALBUM_TRACKS,
    id,
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


export const updateCurrentAlbum = (album) => ({
    type: albumActions.UPDATE_CURRENT_ALBUM,
    album
});

export const requestAlbum = (albumId) => ({
    type: albumActions.REQUEST_ALBUM,
    albumId
});