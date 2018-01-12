export const playlistActions = {
    MY_PLAYLISTS: 'MY_PLAYLISTS',
    PLAYLISTS_SUCCESS: 'PLAYLISTS_SUCCESS',
    PLAYLISTS_ERROR: 'PLAYLISTS_ERROR',
    REQUEST_PLAYLIST_TRACKS: 'REQUEST_PLAYLIST_TRACKS',
    PLAYLIST_TRACKS_SUCCESS: 'PLAYLIST_TRACKS_SUCCESS',
    PLAYLIST_TRACKS_ERROR: 'PLAYLIST_TRACKS_ERROR',
    UPDATE_PLAYLIST_ID: 'UPDATE_PLAYLIST_ID',
    IS_FOLLOWING_ERROR: 'IS_FOLLOWING_ERROR',
    IS_FOLLOWING_SUCCESS: 'IS_FOLLOWING_SUCCESS',
    REQUEST_FOLLOW_PLAYLIST: 'REQUEST_FOLLOW_PLAYLIST',
    FOLLOW_PLAYLIST_SUCCESS: 'SUCCESS_FOLLOW_PLAYLIST',
    FOLLOW_PLAYLIST_ERROR: 'FOLLOW_PLAYLIST_ERROR',
    CLEAR_ACTIVE_PLAYLIST_ID: 'CLEAR_ACTIVE_PLAYLIST_ID',
    UPDATE_ACTIVE_PLAYLIST_ID: 'UPDATE_ACTIVE_PLAYLIST_ID'

};

export const authActions = {
    SET_TOKEN: 'SET_TOKEN',
    REQUEST_TOKEN: 'REQUEST_TOKEN',
    NEW_TOKEN: 'NEW_TOKEN',
    REFRESH_TOKEN: 'REFRESH_TOKEN',
    ERROR_TOKEN: 'ERROR_TOKEN',
    CLEAR_TOKEN: 'CLEAR_TOKEN',
    INITIAL_AUTH_SUCCESS: 'INITIAL_AUTH_SUCCESS',
    INITIAL_AUTH_REQUESTED: 'INITIAL_AUTH_REQUESTED',
    LOGOUT_REQUESTED: 'LOGOUT_REQUESTED',
    USER_INFO_SUCCESS: 'USER_INFO_SUCCESS',
    USER_INFO_ERROR: 'USER_INFO_ERROR',
    USER_INFO_REQUESTED: 'USER_INFO_REQUESTED'

};

export const searchActions = {
    SEARCH_REQUESTED: 'SEARCH_REQUESTED',
    SEARCH_SUCCESS: 'SEARCH_SUCCESS',
    SEARCH_FAILURE: 'SEARCH_FAILURE',
    UPDATE_TERM: 'UPDATE_TERM',
    UPDATE_TOP_TRACKS: 'UPDATE_TOP_TRACKS',

};

export const musicActions = {
    TOGGLE_PLAYING: 'TOGGLE_PLAYING',
    SELECT_TRACK: 'SELECT_TRACK',
    NEXT_TRACK: 'NEXT_TRACK',
    TOGGLE_SHUFFLE: 'TOGGLE_SHUFFLE',
    TOGGLE_REPEAT: 'TOGGLE_REPEAT',
    ADD_TO_QUEUE: 'ADD_TO_QUEUE',
    UPDATE_VOLUME: 'UPDATE_VOLUME',
    PREVIOUS_TRACK: 'PREVIOUS_TRACK',
    REQUEST_PLAY_ALBUM: 'REQUEST_PLAY_ALBUM',
    PLAY_ALBUM_ERROR: 'PLAY_ALBUM_ERROR',
    PLAY_ALBUM_SUCCESS: 'PLAY_ALBUM_SUCCESS',
    SELECT_SINGLE_TRACK: 'SELECT_SINGLE_TRACK',
    REQUEST_PLAY_ARTIST_TOP_TRACKS: 'REQUEST_PLAY_ARTIST_TOP_TRACKS',
    PLAY_PLAYLIST: 'PLAY_PLAYLIST',
    SELECT_PLAYLIST_TRACK: 'SELECT_PLAYLIST_TRACK',
    PLAY_MUSIC: 'PLAY_MUSIC',
    PAUSE_MUSIC: 'PAUSE_MUSIC',
    UPDATE_TRACKLIST_ID: 'UPDATE_TRACKLIST_ID'
    
};

export const browseActions = {
    NEW_RELEASES_REQUESTED: 'NEW_RELEASES_REQUESTED',
    NEW_RELEASES_SUCCESS: 'NEW_RELEASES_SUCCESS',
    NEW_RELEASES_ERROR: 'NEW_RELEASES_ERROR',
};

export const artistActions = {
    TOP_ARTISTS_SUCCESS: 'TOP_ARTISTS_SUCCESS',
    TOP_ARTISTS_ERROR: 'TOP_ARTISTS_ERROR',
    REQUEST_TOP_ARTISTS: 'REQUEST_TOP_ARTISTS',
    REQUEST_ARTIST: 'REQUEST_ARTIST',
    ARTIST_SUCCESS: 'ARTIST_SUCCESS',
    ARTIST_ERROR: 'ARTIST_ERROR',
    REQUEST_FOLLOWED_ARTISTS: 'REQUEST_FOLLOWED_ARTISTS',
    FOLLOWED_ARTISTS_SUCCESS: 'FOLLOWED_ARTISTS_SUCCESS',
    FOLLOWED_ARTISTS_ERROR: 'FOLLOWED_ARTISTS_ERROR',
    REQUEST_FOLLOW_ARTIST: 'REQUEST_FOLLOW_ARTIST',
    FOLLOW_ACTION_SUCCESS: 'FOLLOW_ACTION_SUCCESS',
    CLEAR_CURRENT_ARTIST: 'CLEAR_CURRENT_ARTIST',
    RELATED_ARTISTS_SUCCESS: 'RELATED_ARTISTS_SUCCESS',
    RELATED_ARTISTS_ERROR: 'RELATED_ARTISTS_ERROR',
};

export const trackActions = {
    REQUEST_USER_TOP_TRACKS: 'REQUEST_USER_TOP_TRACKS',
    USER_TOP_TRACKS_SUCCESS: 'USER_TOP_TRACKS_SUCCESS',
    USER_TOP_TRACKS_ERROR: 'USER_TOP_TRACKS_ERROR',
    REQUEST_ARTIST_TOP_TRACKS: 'REQUEST_ARTIST_TOP_TRACKS',
    ARTIST_TOP_TRACKS_SUCCESS: 'ARTIST_TOP_TRACKS_SUCCESS',
    ARTIST_TOP_TRACKS_ERROR: 'ARTIST_TOP_TRACKS_ERROR',
    REQUEST_RECENTLY_PLAYED: 'REQUEST_RECENTLY_PLAYED',
    UPDATE_RECENTLY_PLAYED: 'UPDATE_RECENTLY_PLAYED',
    ERROR_RECENTLY_PLAYED: 'ERROR_RECENTLY_PLAYED',

};

export const albumActions = {

    REQUEST_ARTIST_ALBUMS: 'REQUEST_ARTIST_ALBUMS',
    ARTIST_ALBUMS_SUCCESS: 'ARTIST_ALBUMS_SUCCESS',
    ARTIST_ALBUMS_ERROR: 'ARTIST_ALBUMS_ERROR',
    REQUEST_ALBUM_TRACKS: 'REQUEST_ALBUM_TRACKS',
    ALBUM_TRACKS_SUCCESS: 'ALBUM_TRACKS_SUCCESS',
    ALBUM_TRACKS_ERROR: 'ALBUM_TRACKS_ERROR',
};


export const DEFAULT_IMAGE_URL = 'https://i.imgur.com/7W5XVvJ.jpg';