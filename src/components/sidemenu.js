import { connect } from 'react-redux';
import React, { Component } from 'react';
import { getUserPlaylists } from '../actions/playlist_actions';
import { DEFAULT_IMAGE_URL } from '../constants/actions';
import PlaylistMenu from './playlistmenu';
import { withRouter } from 'react-router-dom';

class SideMenu extends Component {

    componentWillReceiveProps(nextProps) {
        console.log('Receiving new props - Sidemenu');
        console.log(this.props.match.url);
        if (nextProps.playlists.length === 0) {
            this.props.getUserPlaylists();
        }
    }

    renderAlbumImage = () => {
        if (this.props.isAuthenticated) {
            if (this.props.currentTrack === null) {
                return <img className="imgAlbum" src={ DEFAULT_IMAGE_URL } role="presentation" />;
            }

            return (<img 
                    className="imgAlbum" 
                    src={ this.props.currentTrack.album.images[0].url }
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
                        <PlaylistMenu playlists={ this.props.playlists } />
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
        token: state.user.token,
        playlists: state.playlists.myPlaylists,
        currentTrack: state.music.currentTrack
    };
};


const mapDispatchToProps = (dispatch) => ({
    getUserPlaylists: () => dispatch(getUserPlaylists())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideMenu));