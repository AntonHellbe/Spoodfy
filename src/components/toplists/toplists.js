import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    requestFeaturedPlaylists,
    updateActivePlaylist
} from '../../actions/playlist_actions';


class TopLists extends Component {

    constructor(props) {
        super(props);

        if (this.props.featuredPlaylists.length === 0) {
            this.props.requestFeaturedPlaylists();
        }
    }

    onClickPlaylist = (playlist) => {
        this.props.updateActivePlaylist(playlist, this.props.spotifyId);
    }

    render() {
        const {
            featuredPlaylists
        } = this.props;
        return (
            <div className="main-content">
                <ul className="toplist-list">
                { featuredPlaylists.map((playlist) => {
                    const {
                        images,
                        id
                    } = playlist;
                    return (
                        <li className="toplist-item">
                            <Link
                            to={ `/playlists/${id}` }
                            onClick={ () => this.onClickPlaylist(playlist) }
                            >
                            <img
                            src={ images[0].url }
                            role="presentation"
                            />
                            </Link>
                        </li>
                    );
                }) }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    featuredPlaylists: state.playlists.featuredPlaylists,
    spotifyId: state.user.spotifyId
});

const mapDispatchToProps = (dispatch) => ({
    requestFeaturedPlaylists: () => dispatch(requestFeaturedPlaylists()),
    updateActivePlaylist: (playlist, spotifyId) =>
        dispatch(updateActivePlaylist(playlist, spotifyId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopLists);