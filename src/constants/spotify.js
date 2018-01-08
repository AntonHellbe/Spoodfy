export const spotifyUrls = {
    baseURL: 'https://api.spotify.com',
    version: '/v1',
    myPlaylists: '/me/playlists',
    search: '/search?',
    type: 'type',
    userInfo: '/me',
    recentlyPlayed: '/player/recently-played',
    browse: '/browse',
    newReleases: '/new-releases',
    tracks: '/tracks',
    playlists: '/playlists',
    users: '/users',
    albums: '/albums',

};

export const getPlaylistSongs = (playlistId, userId) => {
    return `${spotifyUrls.baseURL}${spotifyUrls.version}/${userId}/playlists/${playlistId}`;
};