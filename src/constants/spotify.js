export const spotifyUrls = {
    baseURL: 'https://api.spotify.com',
    version: '/v1',
    myPlaylists: '/me/playlists',
    search: '/search?',
    type: 'type',
    userInfo: '/me',
    recentlyPlayed: '/player/recently-played',
    browse: '/browse',
    newReleases: '/new-releases'

};

export const getPlaylistSongs = (playlistId, userId) => {
    return `${spotifyUrls.baseURL}${spotifyUrls.version}/${userId}/playlists/${playlistId}`;
};