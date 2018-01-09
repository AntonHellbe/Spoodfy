import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ArtistBanner from './artist-banner'; //eslint-disable-line
import { 
    requestArtist,
    requestTopTracks,
    requestArtistAlbums
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
        if (artistTopTracks.length === 0 ||
            artistAlbums.length === 0 ||
            artistTopTracks[0].id !== currentArtist.id) {
            switch (id) {
                case 'tab2':
                    console.log('Requesting toptracks');
                    this.props.requestTopTracks();
                    break;
                case 'tab3':
                    this.props.requestArtistAlbums();
                    break;

                default:
                    console.log('ERROR');
            }
        }

    }

    render() {
        // console.log(this.props);
        const {
            loadingArtist,
            relatedArtists,
            currentArtist,
            artistTopTracks,
            artistAlbums
        } = this.props;


        return (
            <div className="artist-layout">
                { !_.isEmpty(currentArtist) &&
                    <ArtistBanner 
                    artist={ currentArtist } 
                    />
                }
                <div className="tabbed">
                    <input id="tab1" type="radio" name="tabs" defaultChecked />
                        <label htmlFor="tab1">Related Artists</label>

                    <input id="tab2" type="radio" name="tabs" onChange={ this.handleCheckboxChange } />
                        <label htmlFor="tab2">Top Tracks</label>

                    <input id="tab3" type="radio" name="tabs" onChange={ this.handleCheckboxChange } />
                        <label htmlFor="tab3">Albums</label>

                    <section id="content1">
                        <ArtistList
                            artists={ relatedArtists }
                            loadingArtist={ loadingArtist }
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
    artistAlbums: state.artists.artistAlbums
});

const mapDispatchToProps = (dispatch, props) => ({
    requestArtist: (id) => dispatch(requestArtist(id)),
    requestTopTracks: () => dispatch(requestTopTracks(props.match.params.id)),
    requestArtistAlbums: () => dispatch(requestArtistAlbums(props.match.params.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Artist);