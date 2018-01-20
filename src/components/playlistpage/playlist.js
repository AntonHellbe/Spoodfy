import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    clearActivePlaylistId,
} from '../../actions/playlist_actions';
import {
    selectTrack,
} from '../../actions/music_actions';
import Banner from '../banner/banner';
import TrackTable from '../tracktable/tracktable';
import Modal from '../modal/modal';
import EditPlaylistModal from '../modal/EditPlaylistModal';


class Playlist extends Component {

    componentWillUnmount() {
        this.props.clearActivePlaylistId();
    }

    onClickPlay = () => {
        const { 
            playlistTracks, 
        } = this.props;
        const tracks = playlistTracks.filter((item) => item.track.preview_url !== null)
            .map((item) => item.track);
        this.props.selectTrack(tracks[0], tracks);
    }


    render() {
        const { 
            playlistTracks,
            loadingTracks,
            activePlaylist: {
                playlist: {
                    type,
                    name,
                    owner: {
                        id,
                        display_name = id
                    },
                    images,
                    tracks: { total }
                },
                playlist
            },
            isFollowingActivePlaylist
            

        } = this.props;
        // console.log(playlistTracks);
        return (
            <div className="main-content">
                <div className="main-content-wrapper">
                <Banner
                playAction={ this.onClickPlay }
                type={ type }
                name={ name }
                topRight={ display_name ? display_name : id } // eslint-disable-line
                bottomRight={ playlist.public ? 'Public Playlist' : 'Private Playlst' }
                isFollowing={ isFollowingActivePlaylist }
                id={ playlist.id }
                images={ images }
                author={ display_name ? `Created by: ${display_name}` : `Created by: ${id}` }
                totalTracks={ `Total tracks ${total}` }
                /> 
                
                <div className="main-content-bottom">
                
                    <TrackTable 
                    tracks={ playlistTracks } 
                    type={ type }
                    isLoading={ loadingTracks }
                    />
                </div>
                </div>
                <Modal>
                    <EditPlaylistModal 
                    initialValues={ 
                        { name, 
                        public: playlist.public, 
                        collaborative: playlist.collaborative } 
                    }
                    />
                </Modal>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    playlistTracks: state.tracks.playlistTracks,
    loadingTracks: state.tracks.loadingTracks,
    activePlaylist: state.playlists.activePlaylist,
    isFollowingActivePlaylist: state.playlists.isFollowingActivePlaylist,
});

const mapDispatchToProps = (dispatch, props) => ({
    clearActivePlaylistId: () => dispatch(clearActivePlaylistId()),
    selectTrack: (track, queue) => dispatch(selectTrack(0, track, queue, props.match.params.id)),
    
});


export default connect(mapStateToProps, mapDispatchToProps)(Playlist);