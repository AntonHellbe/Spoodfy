import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    requestPlayAlbum
} from '../../actions/music_actions';
import {
    updateCurrentAlbum
} from '../../actions/album_actions';
import {
    requestArtist
} from '../../actions/artist_actions';
import AlbumItem from './albumitem';
import Loader from '../loader/loader';


class AlbumSection extends Component {

    render() {
        const {
            albums,
            isLoading = null
        } = this.props;
        if (isLoading) {
            return (
                <Loader />
            );
        }

        return (
            <div className="albums">
                { albums.map((album) => (
                    <AlbumItem
                    album={ album }
                    requestPlayAlbum={ this.props.requestPlayAlbum }
                    updateCurrentAlbum={ this.props.updateCurrentAlbum }
                    requestArtist={ this.props.requestArtist }
                    currentTrack={ this.props.currentTrack }
                    />
                )) }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    currentTrack: state.music.currentTrack
});

const mapDispatchToProps = (dispatch) => ({
    requestPlayAlbum: (id, album) => dispatch(requestPlayAlbum(id, album)),
    updateCurrentAlbum: (album) => dispatch(updateCurrentAlbum(album)),
    requestArtist: (id) => dispatch(requestArtist(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumSection);