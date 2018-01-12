import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    requestPlaylistSongs,
    updateActivePlaylist,
    requestFollowPlaylist,
    clearActivePlaylistId,
    updateActivePlaylistId
} from '../../actions/playlist_actions';
import {
    playPlaylist,
    togglePlaying,
} from '../../actions/music_actions';
import Banner from '../banner/banner';
import TrackTable from '../tracktable/tracktable';


class Playlist extends Component {

    componentWillUnmount() {
        this.props.clearActivePlaylistId();
    }

    onClickPlay = () => {
        const { 
            playlistSongs, 
            activePlaylist: {
                playlistId
            } 
        } = this.props;
        this.props.playPlaylist(playlistSongs.map((song) => song.track), playlistId);    
    }

    onClickFollow = (action) => {
        const {
            activePlaylist,
            spotifyId
        } = this.props;
        this.props.requestFollowPlaylist(activePlaylist, action, spotifyId);
    }


    render() {
        const { 
            playlistSongs,
            loadingPlaylist,
            activePlaylist: {
                    playlist: {
                    name,
                    owner: {
                        display_name,
                        id
                    },
                    images,
                    tracks: { total },
                    type,
                },
            },
            activePlaylist: { 
                playlist,
                playlistId
            },
            spotifyId,
            isFollowingActivePlaylist,
            isPlaying,
            tracklistId
        } = this.props;

        let playingCurrentPlaylist = false;

        if (tracklistId !== '') {
            playingCurrentPlaylist = tracklistId === playlistId;
        }
        return (
            <div className="main-content">
                <div className="main-content-wrapper">
                <Banner
                title={ name }
                subtitle={ type }
                bottomRightInformation={ playlist.public 
                    ? 'Public Playlist' 
                    : 'Private Playlist' }
                topRightInformation={ `${id}` }
                items={ [display_name ? `Created by: ${display_name}` : `Created by: ${id}`,
                    `Total tracks: ${total}`] }
                image={ images[0] ? images[0].url : null }
                playAction={ playingCurrentPlaylist ? this.props.togglePlaying : this.onClickPlay }
                pauseAction={ this.props.togglePlaying }
                isPlaying={ isPlaying && playingCurrentPlaylist }
                followButton={ spotifyId !== id }
                isFollowing={ isFollowingActivePlaylist }
                followAction={ this.onClickFollow }
                /> 
                
                <div className="main-content-bottom">
                
                    <TrackTable 
                    tracks={ playlistSongs } 
                    isPlaylist={ type === 'playlist' }
                    isLoading={ loadingPlaylist }
                    />
                </div>
                </div>
            </div>
                
        );
    }
}

const mapStateToProps = (state) => ({
    playlistSongs: state.playlists.playlistSongs,
    activePlaylist: state.playlists.activePlaylist,
    myPlaylists: state.playlists.myPlaylists,
    loadingPlaylist: state.playlists.loadingPlaylist,
    spotifyId: state.user.spotifyId,
    isFollowingActivePlaylist: state.playlists.isFollowingActivePlaylist,
    tracklistId: state.music.tracklistId,
    isPlaying: state.music.isPlaying,
});

const mapDispatchToProps = (dispatch, props) => ({
    requestPlaylistSongs: () => dispatch(requestPlaylistSongs(props.params.match.id)),
    updateActivePlaylist: (playlist) => dispatch(updateActivePlaylist(playlist)),
    playPlaylist: (tracks, playlist) => dispatch(playPlaylist(tracks, playlist)),
    requestFollowPlaylist: (playlist, action, spotifyId) => 
        dispatch(requestFollowPlaylist(playlist, action, spotifyId)),
    togglePlaying: () => dispatch(togglePlaying()),
    clearActivePlaylistId: () => dispatch(clearActivePlaylistId()),
    updateActivePlaylistId: () => dispatch(updateActivePlaylistId())
    
    
});


export default connect(mapStateToProps, mapDispatchToProps)(Playlist);