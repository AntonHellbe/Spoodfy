import React, { Component } from 'react';
import PropTypes from 'prop-types';


class MusicPlayer extends Component {


    render() {
        const {
            isPlaying,
            shuffle,
            repeat,
            handleMusicControls
        } = this.props;
        return (
            
            <div 
            className="innerDiv" 
            onClick={ handleMusicControls } 
            >   
            
                <button id="prev">
                    <i className="fa fa-step-backward" aria-hidden="true" />
                </button>
                <button id="shuffle">
                    <i 
                    className="fa fa-random" 
                    aria-hidden="true" 
                    style={ shuffle ? { color: '#50f442' } : { color: '#cfcfd1' } } 
                    />

                </button >
                { isPlaying ? 
                    (
                    <button id="pause">
                        <i className="fa fa-pause-circle" aria-hidden="true" style={ { fontSize: '32px', color: '#cfcfd1' } } />
                    </button> 
                    )
                    :
                    (
                    <button id="play">
                            <i className="fa fa-play-circle" aria-hidden="true" />
                    </button>
                    )
                }
                <button id="repeat">
                    <i 
                    className="fa fa-repeat"
                    aria-hidden="true"
                    style={ repeat ? { color: '#50f442' } : { color: '#cfcfd1' } }
                    />
                </button>
                <button id="next">
                    <i className="fa fa-step-forward" aria-hidden="true" />
                </button>
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

