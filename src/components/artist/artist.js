import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { 
    requestArtist,
    requestArtistAlbums,
    requestFollowArtist
} from '../../actions/artist_actions';
import {
    requestArtistTopTracks
} from '../../actions/track_actions';
import {
    selectTrack,
    requestPlayArtistTopTracks
} from '../../actions/music_actions';
import Banner from '../banner/banner';
import ArtistList from '../artistlist/artistlist';
import TrackTable from '../tracktable/tracktable';
import AlbumList from '../albumlist/albumlist';

class Artist extends Component {

    onClickPlay = () => {
        const { artistTopTracks, currentArtist } = this.props;
        const isCorrectTracks = artistTopTracks.length !== 0 ? artistTopTracks[0].artists.find((artist) => currentArtist.id === artist.id) : null;
        console.log(isCorrectTracks);
        if (isCorrectTracks) {
            this.props.selectTrack(artistTopTracks[0], artistTopTracks);
            // console.log(artistTopTracks[0], artistTopTracks);
        } else {
            this.props.requestPlayArtistTopTracks();
        }
    }

    handleCheckboxChange = (e) => {
        const id = e.target.id;
        const { 
            currentArtist, 
            artistTopTracks,
            artistAlbums
        } = this.props;

        switch (id) {
            case 'tab2':
                console.log('Requesting toptracks');
                if (artistTopTracks.length === 0 || 
                    !artistTopTracks[0].artists.find((artist) => currentArtist.id === artist.id)) {
                    this.props.requestArtistTopTracks();
                }
                break;
            case 'tab3':
                if (artistAlbums.length === 0 ||
                    !artistAlbums[0].artists.find((artist) => currentArtist.id === artist.id)) {
                    this.props.requestArtistAlbums();
                }
                break;

            default:
                console.log('ERROR - DEFAULT CASE ARTIST');
        }

    }

    render() {
        const {
            loadingArtist,
            relatedArtists,
            artistTopTracks,
            artistAlbums,
            followedArtists,
            loadingTracks,
            currentArtist
        } = this.props;

        console.log(this.props);

        return (
            <div className="main-content">
                <div className="main-content-wrapper">
                { !(_.isEmpty(this.props.currentArtist)) &&
                <Banner
                title={ this.props.currentArtist.name }
                subtitle={ this.props.currentArtist.type }
                topRightInformation={ `popularity ${this.props.currentArtist.popularity}` }
                bottomRightInformation={ `followers ${this.props.currentArtist.followers.total}` }
                image={ this.props.currentArtist.images ? this.props.currentArtist.images[0].url : null }
                isFollowing={ followedArtists.find((artist) => currentArtist.id === artist.id) }
                renderAllButtons = { true } //eslint-disable-line
                followAction={ this.props.requestFollowArtist }
                playAction={ this.onClickPlay }
                />
                }

                    <div className="main-content-bottom">
                        <input
                            id="tab1"
                            type="radio"
                            name="tabs"
                            defaultChecked
                        />

                        <label htmlFor="tab1">Related artists</label>


                        <input
                            id="tab2"
                            type="radio"
                            name="tabs"
                            onClick={ this.handleCheckboxChange }
                        />
                        <label htmlFor="tab2" >Top Tracks</label>

                        <input
                            id="tab3"
                            type="radio"
                            name="tabs"
                            onClick={ this.handleCheckboxChange }
                        />
                        <label htmlFor="tab3" >Albums</label>

                        <section id="content1">
                            <ArtistList
                                artists={ relatedArtists }
                                isLoading={ loadingArtist }
                            />

                        </section>
                        <section id="content2">
                            <TrackTable
                            tracks={ artistTopTracks }
                            isLoading={ loadingTracks }
                            />
                        </section>
                        <section id="content3">
                            <AlbumList
                            albums={ artistAlbums }
                            isLoading={ loadingArtist }
                            />


                        </section>
                    </div>
                
                
                </div>
            
            
            </div>

        );
    }

}

const mapStateToProps = (state) => ({
    loadingArtist: state.artists.loadingArtist,
    relatedArtists: state.artists.relatedArtists,
    currentArtist: state.artists.currentArtist,
    artistAlbums: state.artists.artistAlbums,
    followedArtists: state.artists.followedArtists,
    artistTopTracks: state.tracks.artistTopTracks
});

const mapDispatchToProps = (dispatch, props) => ({
    requestArtist: (id) => dispatch(requestArtist(id)),
    requestArtistAlbums: () => dispatch(requestArtistAlbums(props.match.params.id)),
    requestFollowArtist: (type) => dispatch(requestFollowArtist(props.match.params.id, type)),
    requestArtistTopTracks: () => dispatch(requestArtistTopTracks(props.match.params.id)),
    requestPlayArtistTopTracks: () => dispatch(requestPlayArtistTopTracks(props.match.params.id)),
    selectTrack: (track, queue) => dispatch(selectTrack(0, track, queue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Artist);