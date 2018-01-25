import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    newReleasesRequest
} from '../../actions/browse_actions';
import AlbumList from '../albumlist/albumlist';
import { 
    updateActivePlaylist 
} from '../../actions/playlist_actions';

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
        } = this.props;
        return (
            <div className="main-content">
                <div className="thin-banner">
                    <h3 className="new-releases-title">New Releases </h3>
                    <button 
                    className="btn-search"
                    onClick={ this.handleClick }
                    >
                        Search
                    </button>
                </div>
                    <AlbumList
                    albums={ newReleases }
                    isLoading={ loadingBrowse }
                    />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    newReleases: state.browse.newReleases,
    loadingBrowse: state.browse.loadingBrowse,
    spotifyId: state.user.spotifyId
});

const mapDispatchToProps = (dispatch) => ({
    newReleasesRequest: () => dispatch(newReleasesRequest()),
    updateActivePlaylist: (playlist, spotifyId) =>
        dispatch(updateActivePlaylist(playlist, spotifyId)),
});


export default connect(mapStateToProps, mapDispatchToProps)(NewReleases);