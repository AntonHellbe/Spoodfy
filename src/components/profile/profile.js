import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    topArtistsRequest, 
} from '../../actions/artist_actions';
import {
    selectSingleTrack
} from '../../actions/music_actions';
import {
    requestUserTopTracks
} from '../../actions/track_actions';

import RecentTrack from './recent-track';
import ArtistList from '../artistlist/artistlist';
import Banner from '../banner/banner';
import TrackTable from '../tracktable/tracktable';

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
            recentlyPlayed,
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
                            { display_name }
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

                    <label htmlFor="tab1">Your top artists</label>

                    <input
                        id="tab2"
                        type="radio"
                        name="tabs"
                    />
                        <label htmlFor="tab2">Recently Played Tracks</label>

                    <input
                        id="tab3"
                        type="radio"
                        name="tabs"
                    />
                    <label htmlFor="tab3" onClick={ this.topTracksClick } >Your Top Tracks</label>

                    <section id="content1">
                        <ArtistList
                            artists={ topArtists }
                            loadingArtist={ loadingArtist }
                        />
                    </section>
                    <section id="content2">

                        <div className="recent-track-wrapper">
                            {recentlyPlayed.map((item) =>
                                (
                                    <RecentTrack
                                        item={ item }
                                        selectSingleTrack={ this.props.selectSingleTrack }
                                        currentTrack={ currentTrack }
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
    recentlyPlayed: state.tracks.recentlyPlayed,
    currentTrack: state.music.currentTrack,
    loadingArtist: state.artists.loadingArtist,
    userTopTracks: state.tracks.userTopTracks,
    loadingTracks: state.tracks.loadingTracks
});

const mapDispatchToProps = (dispatch) => ({
    topArtistsRequest: () => dispatch(topArtistsRequest()),
    selectSingleTrack: (track) => dispatch(selectSingleTrack(track)),
    requestUserTopTracks: () => dispatch(requestUserTopTracks())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);