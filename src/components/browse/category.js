import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    requestCategoryPlaylists
} from '../../actions/browse_actions';
import {
    updateActivePlaylist
} from '../../actions/playlist_actions';
import {
    requestPlayPlaylist
} from '../../actions/music_actions';

class Category extends Component {

    constructor(props) {
        super(props);

        this.props.requestCategoryPlaylists();
    }

    onClickPlaylist = (playlist, spotifyId) => {
        console.log('Dispatching action');
        this.props.updateActivePlaylist(playlist, spotifyId);
    }

    onClickPlay = (playlist) => {
        this.props.requestPlayPlaylist(playlist.href, playlist);
    }

    render() {
        // console.log(this.props);
        const {
            categoryPlaylists
        } = this.props;
        return (
            <div className="main-content">
                <div className="main-content-wrapper">
                    <div
                    className="category-banner"
                    >
                    <h3>
                        { this.props.match.params.id }
                    </h3>
                    </div>
            
                    <div className="main-content-bottom">
                        <div className="playlist-wrapper">
                        { categoryPlaylists.map((playlist) => {
                            const {
                                id,
                                images,
                                name,
                                owner,
                                href
                            } = playlist;
                            return (
                                <div className="playlist-item">
                                    <div className="playlist-image-wrapper">
                                        <Link 
                                        to={ `/playlists/${playlist.id}` }
                                        onClick={ () => this.onClickPlaylist(playlist, owner.id) }
                                        >
                                        <img
                                        src={ images[0].url }
                                        role="presentation"
                                        />
                                        </Link>
                                        <i
                                            className="fa fa-play"
                                            aria-hidden="true"
                                            onClick={ (e) => {
                                                e.stopPropagation();
                                                this.onClickPlay(playlist);
                                            } }
                                        />
                                    </div>
                                        <ul>
                                            <li>{ name }</li>
                                        </ul>
                                    
                                
                                </div>
                            );
                        }) }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    categoryPlaylists: state.browse.categoryPlaylists
});

const mapDispatchToProps = (dispatch, props) => ({
    requestCategoryPlaylists: () => dispatch(requestCategoryPlaylists(props.match.params.id)),
    updateActivePlaylist: (playlist, spotifyId) => 
        dispatch(updateActivePlaylist(playlist, spotifyId)),
    requestPlayPlaylist: (playlistUrl, playlist) => 
        dispatch(requestPlayPlaylist(playlistUrl, playlist))

    
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);