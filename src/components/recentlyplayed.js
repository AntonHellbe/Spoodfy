import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecentItem from './recentitem';

class RecentlyPlayed extends Component {

    render() {
        return (
            <div className="recent">
                <h3>Recently Played</h3>
                { this.props.recentlyPlayed.map((item) => {
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