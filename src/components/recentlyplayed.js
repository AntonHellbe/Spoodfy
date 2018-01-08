import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecentItem from './recentitem';

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
    recentlyPlayed: state.music.recentlyPlayed,
});

export default connect(mapStateToProps, null)(RecentlyPlayed);