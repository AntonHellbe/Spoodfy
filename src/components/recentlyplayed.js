import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecentItem from './recentitem';
import WithAuthentication from '../HOC/WithAuthentication';
import { 
    selectTrack, 
} from '../actions/music_actions';
import {
    togglePlaying
} from '../actions/musiccontrol_actions';

class RecentlyPlayed extends Component {

    onClickPlay = (track) => {
        this.props.selectTrack(track);
    }

    render() {
        const {
            recentlyPlayed,
            currentTrack,
            isPlaying,
        } = this.props;
        return (
            <div className="recent">
                <h3>Recently Played</h3>
                <ul className="latest-played-tracks">
                { recentlyPlayed.map((item) => {
                    return (
                        <RecentItem 
                        item={ item } 
                        onClickPlay={ this.onClickPlay }
                        currentTrack={ currentTrack }
                        isPlaying={ isPlaying }
                        togglePlaying={ this.props.togglePlaying }
                        />
                    );
                }) }
                </ul>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
    recentlyPlayed: state.music.recentlyPlayed,
    currentTrack: state.music.currentTrack,
    isPlaying: state.controls.isPlaying
});

const mapDispatchToProps = (dispatch) => ({
    selectTrack: (track) => dispatch(selectTrack(0, track, [])),
    togglePlaying: () => dispatch(togglePlaying())
});

export default connect(mapStateToProps, mapDispatchToProps)(WithAuthentication(RecentlyPlayed));