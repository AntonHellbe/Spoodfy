import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileBanner from './profile-banner';
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
            loadingArtist
        } = this.props;
        const {
            display_name,
            id,
            followers: { total },
            type,
            external_urls: { spotify },
            product
        } = this.props.user;
        return (

            <div className="main-content">

                <div className="main-content-wrapper">

                <Banner 
                shareButton={ true } //eslint-disable-line
                title={ display_name ? display_name : id }
                subtitle={ type }
                bottomRightInformation={ `followers \n ${total}` }
                topRightInformation={ `product ${product}` }
                />

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