import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    requestPlaylistSongs,
    updateActivePlaylistId
} from '../../actions/playlist_actions';
import PlaylistBanner from './playlist-banner';
import TrackTable from '../tracktable';
import { 
    AddToQueue, 
    selectTrack 
} from '../../actions/music_actions';


class Playlist extends Component {


    componentWillMount() {
        if (this.props.activePlaylistId === '') {
            this.props.updateActivePlaylistId(this.props.spotifyId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.activePlaylistId !== nextProps) {
            this.props.updateActivePlaylistId(nextProps.activePlaylistId, this.props.spotifyId);
        }
    }

    render() {
        console.log(this.props);
        const { playlistSongs } = this.props;
        console.log(playlistSongs);
        const isPlaylist = true;
        return (
            <React.Fragment>
                <PlaylistBanner />
                <div className="playlistTracks">
                    <TrackTable 
                    tracks={ playlistSongs } 
                    AddToQueue={ this.props.AddToQueue } 
                    selectTrack={ this.props.selectTrack } 
                    isPlaylist={ isPlaylist }
                    />
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    playlistSongs: state.playlists.playlistSongs,
    activePlaylistId: state.playlists.activePlaylistId,
    spotifyId: state.user.spotifyId

});

const mapDispatchToProps = (dispatch, props) => ({
    requestPlaylistSongs: () => dispatch(requestPlaylistSongs(props.params.match.id)),
    updateActivePlaylistId: (spotifyId) => dispatch(updateActivePlaylistId(props.match.params.id, spotifyId)),
    AddToQueue: (track) => dispatch(AddToQueue(track)),
    selectTrack: (track) => dispatch(selectTrack(track))

});


export default connect(mapStateToProps, mapDispatchToProps)(Playlist);