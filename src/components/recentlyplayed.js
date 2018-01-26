import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecentItem from './recentitem';
import WithAuthentication from '../HOC/WithAuthentication';

class RecentlyPlayed extends Component {

    render() {
        const mostRecent = this.props.recentlyPlayed.slice(0, 7);
        
        return (
            <div className="recent">
                <h3>Recently Played</h3>
                { mostRecent.map((item) => {
                    return (
                        <RecentItem item={ item } />
                    );
                }) }
                
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    recentlyPlayed: state.tracks.recentlyPlayed,
    isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, null)(WithAuthentication(RecentlyPlayed));