import React, { Component } from 'react';
import { connect } from 'react-redux';
import Banner from '../banner/banner';
import TrackTable from '../tracktable/tracktable';
import {
    requestAlbumTracks
} from '../../actions/album_actions';
import {
    selectTrack,
    requestPlayAlbum,
    togglePlaying
} from '../../actions/music_actions';
import {
    requestArtist
} from '../../actions/artist_actions';


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
            this.props.selectTrack(albumTracks[0], albumTracks);
        } else {
            this.props.requestPlayAlbum(currentAlbum.id, currentAlbum);
        }

    }

    onClickArtist = () => {
        console.log(this.props.currentAlbum.artists[0].id);
        this.props.requestArtist(this.props.currentAlbum.artists[0].id);
    }

    render() {

        const {
            currentAlbum: {
                name,
                type,
                artists,
                album_type,
                images,
                id
            },
            albumTracks,
            loadingAlbum,
            tracklistId,
            isPlaying
        } = this.props;

        const isPlayingCurrentAlbum = tracklistId === id;
        return (
            <div className="main-content">
                <div className="main-content-wrapper">
                <Banner
                title={ name }
                subtitle={ type }
                image={ images[0].url }
                topRightInformation={ album_type }
                items={ [`Artist: ${artists[0].name}`] }
                playAction={ isPlayingCurrentAlbum ? this.props.togglePlaying : this.onClickPlay }
                isPlaying={ isPlayingCurrentAlbum && isPlaying }
                pauseAction={ this.props.togglePlaying }
                link={ `/artists/${artists[0].id}` }
                linkAction={ this.onClickArtist }

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
    loadingAlbum: state.albums.loadingAlbum,
    tracklistId: state.music.tracklistId,
    isPlaying: state.music.isPlaying
});

const mapDispatchToProps = (dispatch, props) => ({
    requestAlbumTracks: (album) => dispatch(requestAlbumTracks(props.match.params.id, album)),
    selectTrack: (track, queue) => dispatch(selectTrack(0, track, queue, props.match.params.id)),
    requestPlayAlbum: (id, album) => dispatch(requestPlayAlbum(id, album)),
    togglePlaying: () => dispatch(togglePlaying()),
    requestArtist: (id) => dispatch(requestArtist(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Album);
