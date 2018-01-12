import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    requestPlaylistSongs,
    updateActivePlaylist,
    requestFollowPlaylist,
    clearActivePlaylist
} from '../../actions/playlist_actions';
import {
    playPlaylist,
    togglePlaying,
} from '../../actions/music_actions';
import Banner from '../banner/banner';
import TrackTable from '../tracktable/tracktable';


const isPlaylist = true;

class Playlist extends Component {

    componentWillUnmount() {
        this.props.clearActivePlaylist();
    }

    onClickPlay = () => {
        const { 
            playlistSongs, 
            activePlaylist 
        } = this.props;
        this.props.playPlaylist(playlistSongs.map((song) => song.track), activePlaylist.id);    
    }

    onClickFollow = (action) => {
        // console.log(action);
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
                name,
                owner: {
                    display_name,
                    id
                },
                images,
                tracks,
                tracks: { total },
                type,
            },
            activePlaylist,
            spotifyId,
            isFollowingActivePlaylist,
            isPlaying,
            tracklistId
        } = this.props;

        console.log(tracklistId);
        let playingCurrentPlaylist = false;

        if (tracklistId !== '') {
            playingCurrentPlaylist = tracklistId === activePlaylist.id;
        }

        return (
            <div className="main-content">
                <div className="main-content-wrapper">
                <Banner
                title={ name }
                subtitle={ type }
                bottomRightInformation={ this.props.activePlaylist.public 
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
                    isPlaylist={ isPlaylist }
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
    isPlaying: state.music.isPlaying
});

const mapDispatchToProps = (dispatch, props) => ({
    requestPlaylistSongs: () => dispatch(requestPlaylistSongs(props.params.match.id)),
    updateActivePlaylist: (playlist) => dispatch(updateActivePlaylist(playlist)),
    playPlaylist: (tracks, playlist) => dispatch(playPlaylist(tracks, playlist)),
    requestFollowPlaylist: (playlist, action, spotifyId) => 
        dispatch(requestFollowPlaylist(playlist, action, spotifyId)),
    togglePlaying: () => dispatch(togglePlaying()),
    clearActivePlaylist: () => dispatch(clearActivePlaylist())
    
    
});


export default connect(mapStateToProps, mapDispatchToProps)(Playlist);