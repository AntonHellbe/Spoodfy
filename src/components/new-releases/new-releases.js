import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewReleasesBanner from './new-releases-banner';
import { 
    newReleasesRequest
} from '../../actions/browse_actions';
import {
    requestPlayAlbum
} from '../../actions/music_actions';
import AlbumItem from '../albumitem';

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
        const { newReleases, currentAlbum } = this.props;
        return (
            <div className="newReleasesDiv">
                <NewReleasesBanner handleClick={ this.handleClick } />
                <h3> New Albums and Singles </h3>
                <div className="newAlbums">
                    { newReleases.map((album) => 
                        (
                        <AlbumItem 
                        album={ album } 
                        currentAlbum={ currentAlbum }
                        requestPlayAlbum={ this.props.requestPlayAlbum }
                        />
                        )
                    ) }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    newReleases: state.browse.newReleases,
    currentAlbum: state.music.currentAlbum,
});

const mapDispatchToProps = (dispatch) => ({
    newReleasesRequest: () => dispatch(newReleasesRequest()),
    requestPlayAlbum: (id, album) => dispatch(requestPlayAlbum(id, album))
});


export default connect(mapStateToProps, mapDispatchToProps)(NewReleases);