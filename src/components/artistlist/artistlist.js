import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtistItem from './artistitem';
import Loader from '../loader/loader';
import {
    updateCurrentArtist
} from '../../actions/artist_actions';


class ArtistSection extends Component {


    render() {
        const {
            artists,
            loadingArtist = null
        } = this.props;
        if (loadingArtist) {
            return (
                <Loader />
            );
        }
        return (
            <div className="artists">
                { artists.map((artist) => (
                    <ArtistItem
                    artist={ artist }
                    updateCurrentArtist={ this.props.updateCurrentArtist }
                    />

                )) }

            
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCurrentArtist: (artist) => dispatch(updateCurrentArtist(artist))
});

// const mapStateToProps = (state) => ({
//     followedArtists: state.artists.followedArtists
// });

export default connect(null, mapDispatchToProps)(ArtistSection);

