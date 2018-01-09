import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    requestPlayAlbum
} from '../../actions/music_actions';
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
                    currentAlbum={ this.props.currentAlbum }
                    />
                )) }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    currentAlbum: state.music.currentAlbum
});

const mapDispatchToProps = (dispatch) => ({
    requestPlayAlbum: (id, album) => dispatch(requestPlayAlbum(id, album))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumSection);