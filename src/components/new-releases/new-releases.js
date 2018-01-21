import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewReleasesBanner from './new-releases-banner';
import { 
    newReleasesRequest
} from '../../actions/browse_actions';
import AlbumList from '../albumlist/albumlist';
import Loader from '../loader/loader';
import { 
    updateActivePlaylist 
} from '../../actions/playlist_actions';
import { 
    requestPlayPlaylist 
} from '../../actions/music_actions';

class NewReleases extends Component {

    componentWillMount() {
        if (this.props.newReleases.length === 0) {
            this.props.newReleasesRequest();
        }

    }
    
    handleClick = () => {
        this.props.history.push('/');
    }
    
    
    render() {
        const { 
            newReleases,
            loadingBrowse,
            featuredPlaylists
        } = this.props;
        return (
            <div className="main-content">
                <div className="main-content-wrapper">

                    <NewReleasesBanner 
                    handleClick={ this.handleClick } 
                    playlists={ featuredPlaylists }
                    onClickPlay={ this.onClickPlay }
                    onClickPlaylist={ this.onClickPlaylist }
                    />
                    
                    <div className="main-content-bottom">
                    <h3 className="new-releases-albums"> New Albums and Singles </h3>
                    <AlbumList
                    albums={ newReleases }
                    isLoading={ loadingBrowse }
                    />

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    newReleases: state.browse.newReleases,
    featuredPlaylists: state.playlists.featuredPlaylists,
    loadingBrowse: state.browse.loadingBrowse,
    spotifyId: state.user.spotifyId
});

const mapDispatchToProps = (dispatch) => ({
    newReleasesRequest: () => dispatch(newReleasesRequest()),
    updateActivePlaylist: (playlist, spotifyId) =>
        dispatch(updateActivePlaylist(playlist, spotifyId)),
    requestPlayPlaylist: (playlistUrl, playlist) =>
        dispatch(requestPlayPlaylist(playlistUrl, playlist))
});


export default connect(mapStateToProps, mapDispatchToProps)(NewReleases);