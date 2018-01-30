import React, { Component } from 'react';
import { connect } from 'react-redux';
import Banner from '../banner/banner';
import TrackTable from '../tracktable/tracktable';
import _ from 'lodash';
import {
    requestAlbumTracks
} from '../../actions/album_actions';
import {
    requestSelectTrack,
    requestPlayAlbum,
} from '../../actions/music_actions';


class Album extends Component {

    constructor(props) {
        super(props);

        const {
            albumTracks,
            currentAlbum,
        } = this.props;

        if (albumTracks.length === 0 ||
            albumTracks[0].album.id !== currentAlbum.id
            ) {
            this.props.requestAlbumTracks(currentAlbum);
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.currentAlbum.id !== this.props.albumTracks[0].album.id) {
    //         this.props.requestAlbumTracks(nextProps.currentAlbum);
    //     }
    // }
    // Not needed at the moment, as its impossible to navigate from album to album...

    onClickPlay = () => {
        const {
            albumTracks,
            currentAlbum
        } = this.props;

        if (albumTracks[0].album !== currentAlbum.id) {
            this.props.requestSelectTrack(albumTracks[0], albumTracks);
        } else {
            this.props.requestPlayAlbum(currentAlbum.id, currentAlbum);
        }

    }


    render() {

        const {
            currentAlbum: {
                type,
                name,
                album_type,
                artists,
                images,
                id
            },
            currentAlbum,
            albumTracks,
            loadingAlbum,
        } = this.props;

        return (
            <div className="main-content">
                <div className="main-content-wrapper">
                { !_.isEmpty(currentAlbum) && 
                    <Banner
                    type={ type }
                    name={ name }
                    topRight={ album_type }
                    id={ id }
                    playAction={ this.onClickPlay }
                    images={ images }
                    artists={ artists }
                    />
                }
                
                <div className="main-content-bottom">
                    <TrackTable
                    tracks={ albumTracks }
                    type={ type }
                    isLoading={ loadingAlbum }
                    />

                
                </div>
                </div>
            </div>

        );
    }
}


const mapStateToProps = (state) => ({
    currentAlbum: state.albums.currentAlbum,
    albumTracks: state.albums.albumTracks,
    loadingAlbum: state.albums.loadingAlbum,
});

const mapDispatchToProps = (dispatch, props) => ({
    requestAlbumTracks: (album) => dispatch(requestAlbumTracks(props.match.params.id, album)),
    requestSelectTrack: (track, queue) => 
        dispatch(requestSelectTrack(0, track, queue, props.match.params.id)),
    requestPlayAlbum: (id, album) => dispatch(requestPlayAlbum(id, album)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Album);
