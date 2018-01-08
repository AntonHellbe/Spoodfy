import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileBanner from './profile-banner';
import {
    topArtistsRequest
} from '../../actions/music_actions';
import ArtistItem from '../artistitem';

class Profile extends Component {

    componentWillMount() {
        if (this.props.topArtists.length === 0) {
            console.log('Requesting top artists...');
            console.log('Calling...');
            this.props.topArtistsRequest();
        }
    }

    render() {
        console.log(this.props.topArtists);
        const {
            user
        } = this.props;
        return (
            <div className="profile-div">
                <ProfileBanner user={ user } />

                <div className="profile-content">
                    { this.props.topArtists.length > 0 && 
                        <h1 className="title">Your top artists</h1>
                    }
                    <div className="artist-div">
                        { this.props.topArtists.map((artist) => 
                        (
                            <ArtistItem
                            artist={ artist }
                            />
                        ) 
                        ) }
                    </div>

                    <h1 className="title" >Lets Go</h1>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    topArtists: state.music.topArtists
});

const mapDispatchToProps = (dispatch) => ({
    topArtistsRequest: () => dispatch(topArtistsRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);