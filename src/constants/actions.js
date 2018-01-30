export const playlistActions = {
    REQUEST_USER_PLAYLISTS: 'REQUEST_USER_PLAYLISTS',
    USER_PLAYLISTS_SUCCESS: 'PLAYLISTS_SUCCESS',
    USER_PLAYLISTS_ERROR: 'PLAYLISTS_ERROR',
    UPDATE_PLAYLIST_ID: 'UPDATE_PLAYLIST_ID',
    IS_FOLLOWING_ERROR: 'IS_FOLLOWING_ERROR',
    IS_FOLLOWING_SUCCESS: 'IS_FOLLOWING_SUCCESS',
    REQUEST_FOLLOW_PLAYLIST: 'REQUEST_FOLLOW_PLAYLIST',
    FOLLOW_PLAYLIST_SUCCESS: 'SUCCESS_FOLLOW_PLAYLIST',
    FOLLOW_PLAYLIST_ERROR: 'FOLLOW_PLAYLIST_ERROR',
    CLEAR_ACTIVE_PLAYLIST_ID: 'CLEAR_ACTIVE_PLAYLIST_ID',
    UPDATE_ACTIVE_PLAYLIST_ID: 'UPDATE_ACTIVE_PLAYLIST_ID',
    PLAY_PLAYLIST_SUCCESS: 'PLAY_PLAYLIST_SUCCESS',
    REQUEST_ADD_TRACK_PLAYLIST: 'REQUEST_ADD_TRACK_PLAYLIST',
    REQUEST_REMOVE_TRACK_PLAYLIST: 'REQUEST_REMOVE_TRACK_PLAYLIST',
    REMOVE_TRACK_SUCCESS: 'REMOVE_TRACK_SUCCESS',
    REQUEST_FEATURED_PLAYLISTS: 'REQUEST_FEATURED_PLAYLISTS',
    FEATURED_PLAYLISTS_SUCCESS: 'FEATURED_PLAYLISTS_SUCCESS',
    FEATURED_PLAYLISTS_ERROR: 'FEATURED_PLAYLISTS_ERROR',
    REQUEST_UPDATE_PLAYLIST_DETAILS: 'REQUEST_UPDATE_PLAYLIST_DETAILS',
    UPDATE_PLAYLIST_DETAILS_SUCCESS: 'UPDATE_PLAYLIST_DETAILS_SUCCESS',
    REQUEST_ADD_PLAYLIST: 'REQUEST_ADD_PLAYLIST',
    ADD_PLAYLIST_SUCCESS: 'ADD_PLAYLIST_SUCCESS',
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
    REQUEST_SELECT_TRACK: 'REQUEST_SELECT_TRACK',
    SELECT_TRACK: 'SELECT_TRACK',
    NEXT_TRACK: 'NEXT_TRACK',
    LOAD_NEXT_QUEUE_TRACK: 'LOAD_NEXT_QUEUE_TRACK',
    ADD_TO_QUEUE: 'ADD_TO_QUEUE',
    REQUEST_PLAY_ALBUM: 'REQUEST_PLAY_ALBUM',
    REQUEST_PLAY_ARTIST_TOP_TRACKS: 'REQUEST_PLAY_ARTIST_TOP_TRACKS',
    REQUEST_PLAY_PLAYLIST: 'REQUEST_PLAY_PLAYLIST',
    PLAY_ALBUM_ERROR: 'PLAY_ALBUM_ERROR',
    PLAY_ALBUM_SUCCESS: 'PLAY_ALBUM_SUCCESS',
    SELECT_SINGLE_TRACK: 'SELECT_SINGLE_TRACK',
    UPDATE_TRACKLIST_ID: 'UPDATE_TRACKLIST_ID',
    UPDATE_RECENTLY_PLAYED_MUSIC: 'UPDATE_RECENTLY_PLAYED_MUSIC',

};

export const musicControlActions = {
    TOGGLE_PLAYING: 'TOGGLE_PLAYING',
    TOGGLE_SHUFFLE: 'TOGGLE_SHUFFLE',
    TOGGLE_REPEAT: 'TOGGLE_REPEAT',
    REQUEST_NEXT_TRACK: 'REQUEST_NEXT_TRACK',
    REQUEST_PREVIOUS_TRACK: 'REQUEST_PREVIOUS_TRACK',
};

export const browseActions = {
    NEW_RELEASES_REQUESTED: 'NEW_RELEASES_REQUESTED',
    NEW_RELEASES_SUCCESS: 'NEW_RELEASES_SUCCESS',
    NEW_RELEASES_ERROR: 'NEW_RELEASES_ERROR',
    REQUEST_CATEGORIES: 'REQUEST_CATEGORIES',
    CATEGORIES_SUCCESS: 'CATEGORIES_SUCCESS',
    CATEGORIES_ERROR: 'CATEGORIES_ERROR',
    REQUEST_CATEGORY_PLAYLISTS: 'REQUEST_CATEGORY_PLAYLISTS',
    CATEGORY_PLAYLISTS_SUCCESS: 'CATEGORY_PLAYLISTS_SUCCESS',
    CATEGORY_PLAYLISTS_ERROR: 'CATEGORY_PLAYLISTS_ERROR',
    
};

export const artistActions = {
    TOP_ARTISTS_SUCCESS: 'TOP_ARTISTS_SUCCESS',
    TOP_ARTISTS_ERROR: 'TOP_ARTISTS_ERROR',
    REQUEST_TOP_ARTISTS: 'REQUEST_TOP_ARTISTS',
    UPDATE_CURRENT_ARTIST: 'UPDATE_CURRENT_ARTIST',
    REQUEST_FOLLOWED_ARTISTS: 'REQUEST_FOLLOWED_ARTISTS',
    FOLLOWED_ARTISTS_SUCCESS: 'FOLLOWED_ARTISTS_SUCCESS',
    FOLLOWED_ARTISTS_ERROR: 'FOLLOWED_ARTISTS_ERROR',
    REQUEST_FOLLOW_ARTIST: 'REQUEST_FOLLOW_ARTIST',
    FOLLOW_ACTION_SUCCESS: 'FOLLOW_ACTION_SUCCESS',
    CLEAR_CURRENT_ARTIST: 'CLEAR_CURRENT_ARTIST',
    REQUEST_RELATED_ARTISTS: 'REQUEST_RELATED_ARTISTS',
    RELATED_ARTISTS_SUCCESS: 'RELATED_ARTISTS_SUCCESS',
    RELATED_ARTISTS_ERROR: 'RELATED_ARTISTS_ERROR',
    REQUEST_ARTIST: 'REQUEST_ARTIST',
    ARTIST_SUCCESS: 'ARTIST_SUCCESS',
    ARTIST_ERROR: 'ARTIST_ERROR'
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
    REQUEST_PLAYLIST_TRACKS: 'REQUEST_PLAYLIST_TRACKS',
    PLAYLIST_TRACKS_SUCCESS: 'PLAYLIST_TRACKS_SUCCESS',
    PLAYLIST_TRACKS_ERROR: 'PLAYLIST_TRACKS_ERROR',
};

export const albumActions = {
    REQUEST_ARTIST_ALBUMS: 'REQUEST_ARTIST_ALBUMS',
    ARTIST_ALBUMS_SUCCESS: 'ARTIST_ALBUMS_SUCCESS',
    ARTIST_ALBUMS_ERROR: 'ARTIST_ALBUMS_ERROR',
    REQUEST_ALBUM_TRACKS: 'REQUEST_ALBUM_TRACKS',
    ALBUM_TRACKS_SUCCESS: 'ALBUM_TRACKS_SUCCESS',
    ALBUM_TRACKS_ERROR: 'ALBUM_TRACKS_ERROR',
    UPDATE_CURRENT_ALBUM: 'UPDATE_CURRENT_ALBUM',
    REQUEST_ALBUM: 'REQUEST_ALBUM',
    ALBUM_ERROR: 'ERROR_ALBUM',
};

export const modalActions = {
    TOGGLE_PLAYLIST_EDIT_MODAL: 'TOGGLE_PLAYLIST_MODAL',
    TOGGLE_PLAYLIST_ADD_MODAL: 'TOGGLE_PLAYLIST_ADD_MODAL',
    SHOW_MODAL: 'SHOW_MODAL',
    HIDE_MODAL: 'HIDE_MODAL'
};


export const DEFAULT_IMAGE_URL = 'https://i.imgur.com/7W5XVvJ.jpg';