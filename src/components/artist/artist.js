import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ArtistBanner from './artist-banner'; //eslint-disable-line
import { 
    requestArtist,
    requestTopTracks,
    requestArtistAlbums,
    requestFollowArtist
} from '../../actions/artist_actions';
import ArtistList from '../artistlist/artistlist';
import TrackTable from '../tracktable/tracktable';
import AlbumList from '../albumlist/albumlist';

class Artist extends Component {

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
                    this.props.requestTopTracks();
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
            currentArtist,
            artistTopTracks,
            artistAlbums,
            followedArtists
        } = this.props;

        // console.log(this.props);
        return (
            <div className="artist-layout">
                { !_.isEmpty(currentArtist) &&
                    <ArtistBanner 
                    artist={ currentArtist }
                    isFollowed={ followedArtists.find((artist) => artist.id === currentArtist.id) }
                    requestFollowArtist={ this.props.requestFollowArtist }
                    />
                }
                <div className="tabbed">
                    <input 
                    id="tab1" 
                    type="radio" 
                    name="tabs" 
                    defaultChecked 
                    />

                        <label htmlFor="tab1">Related Artists</label>

                    <input 
                    id="tab2" 
                    type="radio" 
                    name="tabs" 
                    onChange={ this.handleCheckboxChange } 
                    />
                        <label htmlFor="tab2">Top Tracks</label>

                    <input 
                    id="tab3" 
                    type="radio" 
                    name="tabs" 
                    onChange={ this.handleCheckboxChange } 
                    />
                        <label htmlFor="tab3">Albums</label>

                    <section id="content1">
                        <ArtistList
                            artists={ relatedArtists }
                            requestArtist={ this.props.requestArtist }
                        />
                    </section>
                    <section id="content2">
                        <TrackTable
                            tracks={ artistTopTracks }
                            isPlaylist={ false }
                            isLoading={ loadingArtist }
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

        );
    }

}

const mapStateToProps = (state) => ({
    loadingArtist: state.artists.loadingArtist,
    relatedArtists: state.artists.relatedArtists,
    currentArtist: state.artists.currentArtist,
    artistTopTracks: state.artists.artistTopTracks,
    artistAlbums: state.artists.artistAlbums,
    followedArtists: state.artists.followedArtists
});

const mapDispatchToProps = (dispatch, props) => ({
    requestArtist: (id) => dispatch(requestArtist(id)),
    requestTopTracks: () => dispatch(requestTopTracks(props.match.params.id)),
    requestArtistAlbums: () => dispatch(requestArtistAlbums(props.match.params.id)),
    requestFollowArtist: (type) => dispatch(requestFollowArtist(props.match.params.id, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(Artist);