import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewReleasesBanner from './new-releases-banner';
import { 
    newReleasesRequest
} from '../../actions/browse_actions';
import AlbumList from '../albumlist/albumlist';

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
        const { newReleases } = this.props;
        return (
            <div className="newReleasesDiv">
                <NewReleasesBanner handleClick={ this.handleClick } />
                <h3> New Albums and Singles </h3>
                <AlbumList
                albums={ newReleases }
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    newReleases: state.browse.newReleases,
});

const mapDispatchToProps = (dispatch) => ({
    newReleasesRequest: () => dispatch(newReleasesRequest()),
});


export default connect(mapStateToProps, mapDispatchToProps)(NewReleases);