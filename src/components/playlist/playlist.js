import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    requestPlaylistSongs,
    updateActivePlaylist
} from '../../actions/playlist_actions';
import PlaylistBanner from './playlist-banner';
import TrackTable from '../tracktable';
import { 
    AddToQueue, 
    selectTrack 
} from '../../actions/music_actions';

const isPlaylist = true;

class Playlist extends Component {


    render() {
        const { playlistSongs } = this.props;
        const { name, owner, images, tracks } = this.props.activePlaylist;
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
                    AddToQueue={ this.props.AddToQueue } 
                    selectTrack={ this.props.selectTrack } 
                    isPlaylist={ isPlaylist }
                    currentTrack={ this.props.currentTrack }
                    // searchResult={ this.props.searchResult }
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
    currentTrack: state.music.currentTrack

});

const mapDispatchToProps = (dispatch, props) => ({
    requestPlaylistSongs: () => dispatch(requestPlaylistSongs(props.params.match.id)),
    updateActivePlaylist: (playlist) => dispatch(updateActivePlaylist(playlist)),
    AddToQueue: (track) => dispatch(AddToQueue(track)),
    selectTrack: (index, track, queue) => dispatch(selectTrack(index, track, queue))

});


export default connect(mapStateToProps, mapDispatchToProps)(Playlist);