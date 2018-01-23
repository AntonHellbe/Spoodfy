import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
    clearActivePlaylistId,
} from '../../actions/playlist_actions';
import {
    showModal
} from '../../actions/modal_actions';
import {
    selectTrack,
} from '../../actions/music_actions';
import Banner from '../banner/banner';
import TrackTable from '../tracktable/tracktable';


class Playlist extends Component {

    constructor(props) {
        super(props);

        this.debouncedScroll = _.debounce(this.onScroll, 100);
        this.banner = document.getElementsByClassName('action-buttons');
    }
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

    onScroll = () => {
        let scrolled = false;
        if (this.wrapper.scrollTop > 270) {
            if (scrolled === false) {
                scrolled = true;
                this.banner[0].classList = [this.banner[0].classList + ' effect1'];
            }
        } else {
            scrolled = false;
            this.banner[0].classList = ['action-buttons'];
        }
    };


    submit = (values) => {
        const {
            spotifyId,
            activePlaylist: {
                playlist
            }
        } = this.props;
        this.props.requestUpdatePlaylistDetails(values, spotifyId, playlist);
        // this.onClickEdit();
    }

    openModal = () => {
        const {
            activePlaylist: {
                playlist
            },
            spotifyId
        } = this.props;
        this.props.showModal({
            playlist,
            spotifyId
        });
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
            isFollowingActivePlaylist,
            spotifyId,       
        } = this.props;

        return (
            <div className="main-content">
                <div 
                className="main-content-wrapper" 
                onScroll={ this.debouncedScroll }
                ref={ test => { this.wrapper = test; } }
                >
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
                edit={ spotifyId === id }
                editAction={ this.openModal }
                /> 
                
                <div className="main-content-bottom">
                
                    <TrackTable 
                    tracks={ playlistTracks } 
                    type={ type }
                    isLoading={ loadingTracks }
                    />
                </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    playlistTracks: state.tracks.playlistTracks,
    loadingTracks: state.tracks.loadingTracks,
    activePlaylist: state.playlists.activePlaylist,
    isFollowingActivePlaylist: state.playlists.isFollowingActivePlaylist,
    spotifyId: state.user.spotifyId,
});

const mapDispatchToProps = (dispatch, props) => ({
    clearActivePlaylistId: () => dispatch(clearActivePlaylistId()),
    selectTrack: (track, queue) => dispatch(selectTrack(0, track, queue, props.match.params.id)),
    showModal: (modalProps) => dispatch(showModal('EDIT_PLAYLIST_MODAL', modalProps))
    
});


export default connect(mapStateToProps, mapDispatchToProps)(Playlist);