import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtistBanner from './artist-banner';
import _ from 'lodash';

class Artist extends Component {

    render() {
        // console.log(this.props);
        const {
            activeArtist,
            loadingArtist
        } = this.props;
        return (
            <div className="artist-layout">
                { !_.isEmpty(activeArtist) &&
                    <ArtistBanner 
                    loadingArtist={ loadingArtist } 
                    artist={ activeArtist } 
                    />
                }
            
            </div>

        );
    }

}

const mapStateToProps = (state) => ({
    activeArtist: state.artists.activeArtist,
    loadingArtist: state.artists.loadingArtist
});

// const mapDispatchToProps = (dispatch) => ({
// });

export default connect(mapStateToProps)(Artist);