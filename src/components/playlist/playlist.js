import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    requestPlaylistSongs,
    updateActivePlaylist,
    requestFollowPlaylist
} from '../../actions/playlist_actions';
import {
    selectTrack
} from '../../actions/music_actions';
import Banner from '../banner/banner';
import TrackTable from '../tracktable/tracktable';


const isPlaylist = true;

class Playlist extends Component {

    componentWillUnmount() {
        
    }

    onClickPlay = () => {
        const { playlistSongs } = this.props;
        console.log(playlistSongs);
        this.props.selectTrack(playlistSongs[0].track, playlistSongs.map((track) => track.track));
    }

    onClickFollow = (action) => {
        console.log(action);
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
            spotifyId,
            isFollowingActivePlaylist
        } = this.props;
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
                item1={ display_name ? `Created by: ${display_name}` : `Created by: ${id}` }
                item2={ `Total tracks: ${total}` }
                image={ images[0] ? images[0].url : null }
                playButton={ true }
                playAction={ this.onClickPlay }
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
    isFollowingActivePlaylist: state.playlists.isFollowingActivePlaylist
});

const mapDispatchToProps = (dispatch, props) => ({
    requestPlaylistSongs: () => dispatch(requestPlaylistSongs(props.params.match.id)),
    updateActivePlaylist: (playlist) => dispatch(updateActivePlaylist(playlist)),
    selectTrack: (track, queue) => dispatch(selectTrack(0, track, queue)),
    requestFollowPlaylist: (playlist, action, spotifyId) => dispatch(requestFollowPlaylist(playlist, action, spotifyId)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Playlist);