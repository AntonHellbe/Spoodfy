import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { togglePlaying } from '../../actions/music_actions';
import { 
    requestFollowArtist, 
    requestArtist 
} from '../../actions/artist_actions';
import {
    requestFollowPlaylist
} from '../../actions/playlist_actions';


class Banner extends Component {

    onClickFollowArtist = (e) => {
        const action = e.target.id;
        const {
            id
        } = this.props;
        this.props.requestFollowArtist(id, action);
    }

    onClickFollowPlaylist = (e) => {
        const action = e.target.id;
        const {
            activePlaylist,
            spotifyId
        } = this.props;
        this.props.requestFollowPlaylist(activePlaylist.playlist, action, spotifyId);
    }

    followAction = (e) => {
        if (this.props.type === 'artist') {
            this.onClickFollowArtist(e);
        }

        if (this.props.type === 'playlist') {
            this.onClickFollowPlaylist(e);
        }
    }

    renderImage = (images) => {
    
        if (typeof images[0] !== 'undefined') {
            return (
                <img 
                src={ images[0].url }
                role="presentation"
                />
            );
        }

        return (
            <img
                src="https://d1wn0q81ehzw6k.cloudfront.net/additional/thul/media/0eaa14d11e8930f5?w=400&h=400"
                role="presentation"
            />
        );
    }

    renderFollowButton = () => {
        const {
            isFollowing
        } = this.props;

        console.log('Rendering followbutton');
       
        if (isFollowing) {
            return (
                <button
                className="btn-follow"
                id="unfollow"
                onClick={ this.followAction }
                >
                    Unfollow
                </button>

            );
        }
        return (
            <button
            className="btn-follow"
            id="follow"
            onClick={ this.followAction }
            >
                Follow
            </button>
        );
        

    }


    render() {

        const {
            type,
            images,
            name,
            topRight,
            bottomRight,
            isPlaying,
            playAction,
            id,
            tracklistId,
            artists,
            author,
            totalTracks

        } = this.props;
        
        const isActive = id === tracklistId;

        console.log(type);
        return (
            <div className="banner-container">
                <div className="image-wrapper">
                    { this.renderImage(images) }
                </div>
                <div className="banner-title">
                    <h3>
                        {type}
                    </h3>
                    <h1>
                        {name}
                    </h1>
                </div>

                <div className="banner-description">
                    <ul>
                        { type === 'album' &&
                            <li>
                                <Link 
                                to={ `/artists/${artists[0].id}` }
                                onClick={ () => this.props.requestArtist(artists[0].id) }
                                >
                                    { `Artist: ${artists[0].name}` }
                                </Link>

                            </li>
                        }
                        { type === 'playlist' &&
                            <React.Fragment>
                                <li>
                                    { author }
                                </li>
                                <li>
                                    { totalTracks }
                                </li>
                            </React.Fragment>

                        }
                        
                    </ul>
                </div>

                <div className="information-top-right">
                    { topRight &&
                        <p>
                            { topRight }
                        </p>
                    }
                </div>
                <div className="information-bottom-right">
                    { bottomRight &&
                        <p>
                            { bottomRight }
                        </p>
                    }
                </div>

                <div className="action-buttons">
                    { isPlaying ?
                        (
                        <button
                        className="btn-play"
                        onClick={ this.props.togglePlaying }
                        >
                                Pause
                        </button>
                        )
                        :
                        (
                        <button
                        className="btn-play"
                        onClick={ isActive ?
                        this.props.togglePlaying :
                        playAction }
                        >
                            Play
                        </button>
                        )
                    }

                    { type === 'artist' &&
                        this.renderFollowButton()
                    }
                    { type === 'playlist' &&
                        this.renderFollowButton()
                    }
                </div>


            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    isPlaying: state.music.isPlaying,
    tracklistId: state.music.tracklistId,
    spotifyId: state.user.spotifyId,
    user: state.user.user,
    activePlaylist: state.playlists.activePlaylist
});

const mapDispatchToProps = (dispatch) => ({
    togglePlaying: () => dispatch(togglePlaying()),
    requestFollowArtist: (id, action) => 
        dispatch(requestFollowArtist(id, action)),
    requestFollowPlaylist: (playlist, action, spotifyId) =>
        dispatch(requestFollowPlaylist(playlist, action, spotifyId)),
    requestArtist: (id) => dispatch(requestArtist(id))

});

export default connect(mapStateToProps, mapDispatchToProps)(Banner);