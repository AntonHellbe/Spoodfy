import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    requestCategoryPlaylists
} from '../../actions/browse_actions';
import PlaylistCollection from '../playlistcollection/playlistcollection';

class Category extends Component {

    constructor(props) {
        super(props);

        this.props.requestCategoryPlaylists();
    }

    render() {
        // console.log(this.props);
        const {
            categoryPlaylists,
            loadingBrowse,
            match
        } = this.props;
        return (
            <div className="main-content">
                <div className="main-content-wrapper">
                    <div
                    className="category-banner"
                    >
                    <h3>
                        { match.params.id }
                    </h3>
                    </div>
            
                    <div className="main-content-bottom">
                        <PlaylistCollection
                        loadingBrowse={ loadingBrowse }
                        playlists={ categoryPlaylists }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    categoryPlaylists: state.browse.categoryPlaylists,
    loadingBrowse: state.browse.loadingBrowse,
});

const mapDispatchToProps = (dispatch, props) => ({
    requestCategoryPlaylists: () => dispatch(requestCategoryPlaylists(props.match.params.id)),
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);