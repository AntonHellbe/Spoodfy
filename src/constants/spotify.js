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
    top: '/top',
    artists: '/artists',
    goodLimit: '?limit=18',
    relatedArtists: '/related-artists',
    topTracks: '/top-tracks',
    market: '?market=SE',
    following: '/following',
    queryType: '?type=',
    queryIds: '&ids=',
    followers: '/followers',
    contains: '/contains',
    categories: '/categories',
    queryAlbumType: '&album_type='

};

export const getPlaylistSongs = (playlistId, userId) => {
    return `${spotifyUrls.baseURL}${spotifyUrls.version}/${userId}/playlists/${playlistId}`;
};