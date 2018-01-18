import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    requestPlaylistSongs,
    requestFollowPlaylist,
    clearActivePlaylistId,
} from '../../actions/playlist_actions';
import {
    togglePlaying,
    selectTrack,
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
        } = this.props;
        this.props.selectTrack(playlistSongs[0].track, playlistSongs.map((song) => song.track));    
    }


    render() {
        const { 
            playlistSongs,
            loadingPlaylist,
            activePlaylist: {
                playlist: {
                    type
                }
            }

        } = this.props;

        return (
            <div className="main-content">
                <div className="main-content-wrapper">
                <Banner
                type={ type }
                playAction={ this.onClickPlay }
                /> 
                
                <div className="main-content-bottom">
                
                    <TrackTable 
                    tracks={ playlistSongs } 
                    type={ type }
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
    loadingPlaylist: state.playlists.loadingPlaylist,
});

const mapDispatchToProps = (dispatch, props) => ({
    requestPlaylistSongs: () => dispatch(requestPlaylistSongs(props.params.match.id)),
    clearActivePlaylistId: () => dispatch(clearActivePlaylistId()),
    selectTrack: (track, queue) => dispatch(selectTrack(0, track, queue, props.match.params.id)),
    
});


export default connect(mapStateToProps, mapDispatchToProps)(Playlist);