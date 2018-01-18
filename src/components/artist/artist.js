import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { 
    requestRelatedArtists,
    requestFollowArtist,
} from '../../actions/artist_actions';
import {
    requestArtistTopTracks
} from '../../actions/track_actions';
import {
    selectTrack,
    requestPlayArtistTopTracks,
    togglePlaying
} from '../../actions/music_actions';
import {
    requestArtistAlbums
} from '../../actions/album_actions';
import Banner from '../banner/banner';
import ArtistList from '../artistlist/artistlist';
import TrackTable from '../tracktable/tracktable';
import AlbumList from '../albumlist/albumlist';

class Artist extends Component {
    
    constructor(props) {
        super(props);
        
        this.props.requestRelatedArtists(this.props.match.params.id); // At every mount, fetch related artists
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentArtist.id !== this.props.currentArtist.id) {
            this.props.requestRelatedArtists(nextProps.currentArtist.id); //During mount, fetch new related artists if currentArtist changes
        }
    }

    onClickPlay = () => {
        const { artistTopTracks, currentArtist } = this.props;
        if (artistTopTracks.find((artist) => currentArtist.id === artist.id)) {
            this.props.selectTrack(artistTopTracks[0], artistTopTracks, currentArtist.id);
        } else {
            this.props.requestPlayArtistTopTracks(currentArtist.id);
        }
    }

    onClickFollow = (action) => {
        this.props.requestFollowArtist(action); //action = follow or unfollow
    }

    handleCheckboxChange = (e) => {
        const id = e.target.id;
        const { 
            currentArtist, 
            artistTopTracks,
            artistAlbums,
        } = this.props;

        switch (id) {
            case 'tab2':
                if (artistTopTracks.length === 0 || 
                    !artistTopTracks[0].artists.find((artist) => currentArtist.id === artist.id)) {
                    // Only fetch is we have no toptracks or the current toptracks are not for
                    // the current artist
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
            loadingTracks,
            loadingAlbum,
            relatedArtists,
            artistTopTracks,
            artistAlbums,
            followedArtists,
            currentArtist,
            tracklistId,
            isPlaying,
            currentArtist: {
                type
            }
        } = this.props;

        const isPlayingCurrentArtist = currentArtist.id === tracklistId;
        const imageUrl = currentArtist.images ? currentArtist.images[0].url : null;
        // console.log(loadingArtist);
        return (
            <div className="main-content">
                <div className="main-content-wrapper">
                { !(_.isEmpty(this.props.currentArtist)) &&
                <Banner
                title={ currentArtist.name }
                subtitle={ currentArtist.type }
                topRightInformation={ 
                    `Popularity ${this.props.currentArtist.popularity}` }
                bottomRightInformation={ 
                    `Followers ${this.props.currentArtist.followers.total}` }
                image={ imageUrl }
                followButton={ true } // eslint-disable-line
                isFollowing={ followedArtists.find((artist) => currentArtist.id === artist.id) }
                followAction={ this.onClickFollow }
                isPlaying={ isPlayingCurrentArtist && isPlaying }
                playAction={ isPlayingCurrentArtist ? this.props.togglePlaying : this.onClickPlay }
                pauseAction={ this.props.togglePlaying }
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
                            isArtist={ true } //eslint-disable-line
                            type={ type }
                            />
                        </section>
                        <section id="content3">
                            <AlbumList
                            albums={ artistAlbums }
                            isLoading={ loadingAlbum }
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
    followedArtists: state.artists.followedArtists,
    artistAlbums: state.albums.artistAlbums,
    loadingAlbum: state.albums.loadingAlbum,
    artistTopTracks: state.tracks.artistTopTracks,
    loadingTracks: state.tracks.loadingTracks,
    tracklistId: state.music.tracklistId,
    isPlaying: state.music.isPlaying
});

const mapDispatchToProps = (dispatch, props) => ({
    requestArtistAlbums: () => dispatch(requestArtistAlbums(props.match.params.id)),
    requestArtistTopTracks: () => dispatch(requestArtistTopTracks(props.match.params.id)),
    requestPlayArtistTopTracks: () => dispatch(requestPlayArtistTopTracks(props.match.params.id)),
    selectTrack: (track, queue, id) => dispatch(selectTrack(0, track, queue, id)),
    togglePlaying: () => dispatch(togglePlaying()),
    requestRelatedArtists: (id) => dispatch(requestRelatedArtists(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Artist);