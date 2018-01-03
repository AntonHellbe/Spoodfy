import React, { Component } from 'react';
import FaPlayCircle from 'react-icons/lib/fa/play-circle';
import FaPauseCircle from 'react-icons/lib/fa/pause-circle';
import FaRepeat from 'react-icons/lib/fa/repeat';
import FaRandom from 'react-icons/lib/fa/random';
import FaStepBackward from 'react-icons/lib/fa/step-backward';
import FaStepForward from 'react-icons/lib/fa/step-forward';
import PropTypes from 'prop-types';


class MusicPlayer extends Component {

    renderPlayPause() {
        if (!this.props.isPlaying) {
            return <FaPlayCircle className="faPlay" id="play" color={ '#cfcfd1' } />;
        }
        return <FaPauseCircle className="faPlay" id="pause" color={ '#cfcfd1' } />;
    }


    render() {
        return (
            
            <div 
            className="innerDiv" 
            onClick={ this.props.handleMusicControls } 
            onKeyDown={ this.props.keyPress }
            >
                <FaStepBackward className="faBackward" id="prev" color={ '#cfcfd1' } />
                <FaRandom 
                color={ this.props.shuffle ? '#50f442' : '#cfcfd1' } 
                id="shuffle"
                />                                        
                { this.renderPlayPause() }
                <FaRepeat id="repeat" color={ this.props.repeat ? '#50f442' : '#cfcfd1' } />
                <FaStepForward className="faForward" id="next" color={ '#cfcfd1' } />
            </div>
            

        );
    }
}

MusicPlayer.PropTypes = {
    shuffle: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    repeat: PropTypes.bool.isRequired,
    currentTrack: PropTypes.object.isRequired,
    handleMusicControls: PropTypes.func.isRequired
};


export default MusicPlayer;

