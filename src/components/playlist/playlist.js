import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    requestPlaylistSongs,
    updateActivePlaylist
} from '../../actions/playlist_actions';
import PlaylistBanner from './playlist-banner';
import TrackTable from '../tracktable/tracktable';

const isPlaylist = true;

class Playlist extends Component {


    render() {
        const { 
            playlistSongs,
            loadingPlaylist,
            activePlaylist: {
                name,
                owner,
                images,
                tracks
            }
        } = this.props;
        
        return (
            <React.Fragment>
                <PlaylistBanner 
                name={ name }
                owner={ owner }
                images={ images }
                tracks={ tracks }
                /> 
                <div className="playlistTracks">
                
                    <TrackTable 
                    tracks={ playlistSongs } 
                    isPlaylist={ isPlaylist }
                    isLoading={ loadingPlaylist }
                    />
                </div>
                
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    playlistSongs: state.playlists.playlistSongs,
    activePlaylist: state.playlists.activePlaylist,
    spotifyId: state.user.spotifyId,
    myPlaylists: state.playlists.myPlaylists,
    loadingPlaylist: state.playlists.loadingPlaylist
});

const mapDispatchToProps = (dispatch, props) => ({
    requestPlaylistSongs: () => dispatch(requestPlaylistSongs(props.params.match.id)),
    updateActivePlaylist: (playlist) => dispatch(updateActivePlaylist(playlist)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Playlist);