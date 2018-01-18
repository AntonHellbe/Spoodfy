import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { togglePlaying } from '../../actions/music_actions';
import { 
    requestFollowArtist 
} from '../../actions/artist_actions';
import {
    requestFollowPlaylist
} from '../../actions/playlist_actions';


class Banner extends Component {

    onClickFollowArtist = (e) => {
        const action = e.target.id;
        const {
            currentArtist: {
                id
            }
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

    renderImage = (images) => {
    
        if (typeof images[0].url !== 'undefined') {
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

    renderArtist = () => {
        const {
            currentArtist: {
                images,
                name,
                type,
                popularity,
                followers: {
                    total
                },
                id
            },
            followedArtists,
            isPlaying,
            tracklistId,
            playAction
        } = this.props;

        const isFollowing = followedArtists.find((artist) => artist.id === id);
        const isPlayingCurrentArtist = tracklistId === id && isPlaying;

        return (
            <React.Fragment>
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
                <div className="information-top-right">
                    <p>
                        {`Popularity ${popularity}`}
                    </p>

                </div>

                <div className="information-bottom-right">
                    <p>
                        {`Followers ${total}`}
                    </p>
                </div>
                <div className="action-buttons">
                    { isFollowing ?
                        (
                            <button 
                            className="btn-follow" 
                            id="unfollow" 
                            onClick={ this.onClickFollowArtist }
                            >
                                Unfollow
                            </button>
                        ) : 
                        (
                            <button 
                            className="btn-follow" 
                            id="follow" 
                            onClick={ this.onClickFollowArtist } 
                            >
                                    Follow
                            </button>
                        )
                    }

                    { isPlaying ?
                        (
                        <button className="btn-play" onClick={ this.props.togglePlaying } >
                            Pause
                        </button>
                        )
                        :
                        (
                        <button 
                        className="btn-play" 
                        onClick={ isPlayingCurrentArtist ? 
                            this.props.togglePlaying :
                            playAction
                        }
                        >
                            Play
                        </button>
                        )
                    
                    }

                </div>
            </React.Fragment>
 
        );

    }

    renderAlbum = () => {
        const {
            currentAlbum: {
                name,
                id,
                type,
                images,
                album_type
            },
            tracklistId,
            isPlaying,
            playAction
        } = this.props;

        const isPlayingCurrentAlbum = tracklistId === id && isPlaying;

        return (
            <React.Fragment>
                <div className="image-wrapper">
                    {this.renderImage(images)}
                </div>
                <div className="banner-title">
                    <h3>
                        {type}
                    </h3>
                    <h1>
                        {name}
                    </h1>
                </div>
                <div className="information-top-right">
                    <p>
                        {`${album_type}`}
                    </p>

                </div>

                <div className="action-buttons">

                    {isPlaying ?
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
                        onClick={ isPlayingCurrentAlbum ?  
                            this.props.togglePlaying :
                            playAction }
                        >
                            Play
                        </button>
                        )

                    }
                    

                </div>
            </React.Fragment>

        );

    }

    renderPlaylist = () => {
        const {
            activePlaylist: {
                playlist: {
                    name,
                    type,
                    owner: {
                        id,
                        display_name
                    },
                    tracks: { total },
                    images,
                
                },
                playlist
            },
            tracklistId,
            isPlaying,
            playAction,
            isFollowingActivePlaylist
        } = this.props;

        const isPlayingCurrentPlaylist = tracklistId === playlist.id && isPlaying;

        return (
            <React.Fragment>
                <div className="image-wrapper">
                    {this.renderImage(images)}
                </div>
                <div className="banner-title">
                    <h3>
                        { type }
                    </h3>
                    <h1>
                        { name }
                    </h1>
                </div>
                <div className="banner-description">
                    <ul>
                        <li> 
                            { display_name ? `Created by:${display_name}` : `Created by:${id}` } 
                        </li>
                        <li>
                            { `Total Tracks: ${total}` } 
                        </li>
                    </ul>

                </div>  
                <div className="information-top-right">
                    <p>
                        {id}
                    </p>

                </div>
                <div className="information-bottom-right">
                    <p>
                        { playlist.public ? 'Public Playlist' : 'Private Playlist' }
                    </p>
                </div>

                <div className="action-buttons">

                    {isPlaying ?
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
                        onClick={ isPlayingCurrentPlaylist ? 
                            this.props.togglePlaying :
                            playAction }
                        >
                                Play
                        </button>
                        )

                    }

                    { isFollowingActivePlaylist ?
                        (
                            <button
                            className="btn-follow"
                            id="unfollow"
                            onClick={ this.onClickFollowPlaylist }
                            >
                                Unfollow
                            </button>
                        ) :
                        (
                            <button
                            className="btn-follow"
                            id="follow"
                            onClick={ this.onClickFollowPlaylist }
                            >
                                Follow
                            </button>
                        )
                    }
                </div>
            </React.Fragment>

        );

    }


    render() {

        const {
            type
        } = this.props;

        return (
            <div className="banner-container">
                { type === 'artist' && 
                    this.renderArtist()
                }

                { type === 'playlist' &&
                    this.renderPlaylist()
                }

                { type === 'album' &&
                    this.renderAlbum()
                }


            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    currentArtist: state.artists.currentArtist,
    currentAlbum: state.albums.currentAlbum,
    activePlaylist: state.playlists.activePlaylist,
    isPlaying: state.music.isPlaying,
    tracklistId: state.music.tracklistId,
    followedArtists: state.artists.followedArtists,
    isFollowingActivePlaylist: state.playlists.isFollowingActivePlaylist,
    spotifyId: state.user.spotifyId

});

const mapDispatchToProps = (dispatch) => ({
    togglePlaying: () => dispatch(togglePlaying()),
    requestFollowArtist: (id, action) => 
        dispatch(requestFollowArtist(id, action)),
    requestFollowPlaylist: (playlist, action, spotifyId) =>
        dispatch(requestFollowPlaylist(playlist, action, spotifyId)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Banner);