import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileBanner from './profile-banner';
import {
    topArtistsRequest, 
    requestArtist,
} from '../../actions/artist_actions';
import {
    selectSingleTrack
} from '../../actions/music_actions';
import ArtistItem from '../artistitem';
import RecentTrack from './recent-track';

class Profile extends Component {

    componentWillMount() {
        if (this.props.topArtists.length === 0) {
            this.props.topArtistsRequest();
        }
    }

    render() {
        const {
            user,
            topArtists,
            recentlyPlayed,
            currentTrack
        } = this.props;
        return (
            <div className="profile-div">
                <ProfileBanner user={ user } />

                <div className="profile-content">

                    <h1 className="title" > Recently Played Tracks </h1>
                    <div className="recent-track-wrapper">
                        { recentlyPlayed.map((item) =>
                            (
                                <RecentTrack
                                    item={ item }
                                    selectSingleTrack={ this.props.selectSingleTrack }
                                    currentTrack={ currentTrack }
                                />
                            )
                        )}
                    </div>

                    { topArtists.length > 0 && 
                        <h1 className="title">Your top artists</h1>
                    }
                    <div className="artist-div">
                        { topArtists.map((artist) => 
                        (
                            <ArtistItem
                            artist={ artist }
                            requestArtist={ this.props.requestArtist }
                            />
                        ) 
                        ) }

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    topArtists: state.artists.topArtists,
    recentlyPlayed: state.music.recentlyPlayed,
    currentTrack: state.music.currentTrack,
});

const mapDispatchToProps = (dispatch) => ({
    topArtistsRequest: () => dispatch(topArtistsRequest()),
    selectSingleTrack: (track) => dispatch(selectSingleTrack(track)),
    requestArtist: (id) => dispatch(requestArtist(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);