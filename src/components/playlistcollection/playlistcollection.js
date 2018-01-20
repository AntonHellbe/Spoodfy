import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    requestPlayPlaylist,
} from '../../actions/music_actions';
import {
    updateActivePlaylist
} from '../../actions/playlist_actions';
import PlaylistItem from './playlistitem';
import Loader from '../loader/loader';


class PlaylistCollection extends Component {

    onClickPlaylist = (playlist) => {
        this.props.updateActivePlaylist(playlist, this.props.spotifyId);
    }

    onClickPlay = (playlist) => {
        this.props.requestPlayPlaylist(playlist.href, playlist);
    }

    render() {
        const {
            playlists,
            loadingBrowse
        } = this.props;

        if (loadingBrowse) {
            return (
                <Loader />
            );
        }
        return (


            <div className="playlist-wrapper">
                { playlists.map((playlist) => {
                    return (
                        <PlaylistItem
                        playlist={ playlist }
                        onClickPlay={ this.onClickPlay }
                        onClickPlaylist={ this.onClickPlaylist }
                        />
                    );
                }) }

            </div>
        );

    }

}

const mapStateToProps = (state) => ({
    spotifyId: state.user.spotifyId
});

const mapDispatchToProps = (dispatch) => ({
    requestPlayPlaylist: (playlistUrl, playlist) => 
        dispatch(requestPlayPlaylist(playlistUrl, playlist)),
    updateActivePlaylist: (spotifyId, playlist) => 
        dispatch(updateActivePlaylist(spotifyId, playlist))

});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistCollection);