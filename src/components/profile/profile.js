import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    topArtistsRequest,
    requestArtist
} from '../../actions/artist_actions';
import {
    requestSelectTrack
} from '../../actions/music_actions';
import {
    requestUserTopTracks
} from '../../actions/track_actions';

import RecentTrack from './recent-track';
import ArtistList from '../artistlist/artistlist';
import TrackTable from '../tracktable/tracktable';
import { updateCurrentAlbum } from '../../actions/album_actions';

class Profile extends Component {

    componentWillMount() {
        if (this.props.topArtists.length === 0) {
            this.props.topArtistsRequest();
        }

    }

    topTracksClick = () => {
        if (this.props.userTopTracks.length === 0) {
            this.props.requestUserTopTracks();
        }
    }

    render() {
        const {
            topArtists,
            recentlyPlayedSpotify,
            currentTrack,
            loadingArtist,
            user: {
                images,
                type,
                id,
                display_name = id,
                followers: {
                    total
                },
                product
            }
        } = this.props;

        return (
            
            <div className="main-content">
            
                <div className="main-content-wrapper">
                  <div className="banner-container">

                    <div className="image-wrapper">
                        { images[0] ? 
                        (
                        <img 
                        src={ images[0].url }
                        role="presentation"
                        />
                        ) :
                        <img
                        src="https://d1wn0q81ehzw6k.cloudfront.net/additional/thul/media/0eaa14d11e8930f5?w=400&h=400"
                        role="presentation"
                        />
                        }
                    </div>
                    <div className="banner-title">
                        <h3>
                            {type}
                        </h3>
                        <h1>
                            { display_name ? display_name : id }
                        </h1>
                    </div>
                    <div className="information-top-right">
                        <p>
                            {`followers \n ${total}`}
                        </p>

                    </div>
                    <div className="information-bottom-right">
                        <p>
                            {`product ${product}`}
                        </p>
                    </div>
            </div>
                <div className="main-content-bottom">
                    <input
                        id="tab1"
                        type="radio"
                        name="tabs"
                        defaultChecked
                    />

                    <label htmlFor="tab1">
                        Your top artists
                        <hr />
                    </label>

                    <input
                        id="tab2"
                        type="radio"
                        name="tabs"
                    />
                        <label htmlFor="tab2">
                            Recently Played Tracks
                            <hr />
                        </label>

                    <input
                        id="tab3"
                        type="radio"
                        name="tabs"
                    />
                    <label 
                    htmlFor="tab3" 
                    onClick={ this.topTracksClick }
                    >
                        Your Top Tracks
                        <hr />
                    </label>

                    <section id="content1">
                        <ArtistList
                            artists={ topArtists }
                            loadingArtist={ loadingArtist }
                        />
                    </section>
                    <section id="content2">

                        <div className="recent-track-wrapper">
                            { recentlyPlayedSpotify.map((item) =>
                                (
                                    <RecentTrack
                                        item={ item }
                                        selectTrack={ this.props.requestSelectTrack }
                                        currentTrack={ currentTrack }
                                        updateCurrentAlbum={ this.props.updateCurrentAlbum }
                                        requestArtist={ this.props.requestArtist }
                                    />
                                )
                            )}
                        </div>

                    </section>
                    <section id="content3">
                        <TrackTable
                        tracks={ this.props.userTopTracks }
                        isLoading={ this.props.loadingTracks }
                        />

                    </section>
                </div>

                </div>
            </div>
            );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    topArtists: state.artists.topArtists,
    recentlyPlayedSpotify: state.tracks.recentlyPlayedSpotify,
    currentTrack: state.music.currentTrack,
    loadingArtist: state.artists.loadingArtist,
    userTopTracks: state.tracks.userTopTracks,
    loadingTracks: state.tracks.loadingTracks
});

const mapDispatchToProps = (dispatch) => ({
    topArtistsRequest: () => dispatch(topArtistsRequest()),
    requestSelectTrack: (track) => dispatch(requestSelectTrack(0, track, [])),
    requestUserTopTracks: () => dispatch(requestUserTopTracks()),
    updateCurrentAlbum: (album) => dispatch(updateCurrentAlbum(album)),
    requestArtist: (id) => dispatch(requestArtist(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);