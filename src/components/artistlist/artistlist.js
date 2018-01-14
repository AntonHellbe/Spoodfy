import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtistItem from './artistitem';
import Loader from '../loader/loader';
import {
    artistSuccess
} from '../../actions/artist_actions';


class ArtistList extends Component {


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
                    updateCurrentArtist={ this.props.artistSuccess }
                    />

                )) }

            
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    artistSuccess: (artist) => dispatch(artistSuccess(artist)) 
    // We already have the artist object, utilize that
});

// const mapStateToProps = (state) => ({
//     followedArtists: state.artists.followedArtists
// });

export default connect(null, mapDispatchToProps)(ArtistList);

