import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import PlaylistMenu from './playlistmenu';
import { 
    getUserPlaylists,
    updateActivePlaylist
} from '../../actions/playlist_actions';
import { DEFAULT_IMAGE_URL } from '../../constants/actions';

class SideMenu extends Component {

    
    componentWillReceiveProps(nextProps) {
        if (nextProps.userPlaylists.length === 0) {
            this.props.getUserPlaylists();
        }
    }

    onUpdateActivePlaylist = (playlist) => {
        this.props.updateActivePlaylist(playlist, this.props.spotifyId);
    }

    renderAlbumImage = () => {
        const {
            currentTrack
        } = this.props;

        if (this.props.isAuthenticated) {
            if (_.isEmpty(currentTrack) || typeof currentTrack.album.images[0] === 'undefined') {
                return <img className="imgAlbum" src={ DEFAULT_IMAGE_URL } role="presentation" />;
            }

            return (<img 
                    className="imgAlbum" 
                    src={ currentTrack.album.images[0].url }
                    role="presentation" 
                    />);
        }

    }


    render() {
        return (
            <div className="sidemenu">
                <p className="playlistTitle"> Playlists </p>
                { !this.props.isAuthenticated ?
                    (
                        <p>
                            You need to login
                        </p>
                    ) 
                    :
                    (
                        <PlaylistMenu 
                        playlists={ this.props.userPlaylists } 
                        activePlaylist={ this.props.activePlaylist }
                        tracklistId={ this.props.tracklistId }
                        updateActivePlaylist={ this.onUpdateActivePlaylist }
                        isPlaying={ this.props.isPlaying }
                        />
                    ) 
                }
                
                <div className="albumImage">
                    {this.renderAlbumImage()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.user.isAuthenticated,
        spotifyId: state.user.spotifyId,
        userPlaylists: state.playlists.userPlaylists,
        activePlaylist: state.playlists.activePlaylist,
        currentTrack: state.music.currentTrack,
        tracklistId: state.music.tracklistId,
        isPlaying: state.music.isPlaying
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        getUserPlaylists: () => dispatch(getUserPlaylists()),
        updateActivePlaylist: (playlist, spotifyId) => 
            dispatch(updateActivePlaylist(playlist, spotifyId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideMenu));