import React, { Component } from 'react';
import { connect } from 'react-redux';
import Banner from '../banner/banner';
import TrackTable from '../tracktable/tracktable';
import {
    requestAlbumTracks
} from '../../actions/album_actions';
import {
    selectTrack
} from '../../actions/music_actions';


class Album extends Component {

    componentWillMount() {
        const {
            albumTracks,
            currentAlbum,
        } = this.props;

        if (albumTracks.length === 0 || 
            albumTracks[0].album.id !== currentAlbum.id) {
            this.props.requestAlbumTracks(currentAlbum);
        }
    }

    render() {
        const {
            currentAlbum,
            currentAlbum: {
                name,
                type,
                artists,
                album_type,
                images
            },
            albumTracks,
            loadingAlbum
        } = this.props;
        console.log(currentAlbum);
        return (
            <div className="main-content">
                <div className="main-content-wrapper">
                <Banner
                title={ name }
                subtitle={ type }
                image={ images[0].url }
                topRightInformation={ album_type }
                items={ [`Artist: ${artists[0].name}`] }
                // playAction={  }
                />
                
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
    loadingAlbum: state.albums.loadingAlbum
});

const mapDispatchToProps = (dispatch, props) => ({
    requestAlbumTracks: (album) => dispatch(requestAlbumTracks(props.match.params.id, album)),
    selectTrack: (track, queue) => dispatch(selectTrack(0, track, queue, props.match.params.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Album);
