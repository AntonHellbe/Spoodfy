import React, { Component } from 'react';
import FaVolumeUp from 'react-icons/lib/fa/volume-up';
import { connect } from 'react-redux';
import {
    togglePlaying,
    loadNextTrack,
    previousTrack,
    toggleShuffle,
    toggleRepeat,
    updateVolume
} from '../actions/music_actions';
import MusicPlayer from './musicplayer';
import Playing from './playing';
import _ from 'lodash';


class MusicBar extends Component {

    constructor(props) {
        super(props);
        this.currentTimeInterval = null;
    }

    state = {
        value: 0.0,
    }


    componentDidMount() {
        this.audioElement.addEventListener('ended', this.OnEndedListener);
        this.audioElement.addEventListener('play', this.OnPlay);
        this.audioElement.addEventListener('loadedmetadata', this.metaDataloaded);
        this.audioElement.addEventListener('loadeddata', this.onLoadedData);
        this.audioElement.addEventListener('pause', this.OnPause);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentTrack !== null && 
            this.props.currentTrack.id !== nextProps.currentTrack.id) {
            clearInterval(this.currentTimeInterval); //Clear interval if it isn't the same track we are receiving, i.e slider needs to back to zero
        }
         if (nextProps.currentTrack.preview_url === null) {
                this.props.loadNextTrack();
             
         }
    }

    componentWillUnmount() {
        this.audioElement.removeEventListener('loadmetadata', this.metaDataloaded);
        this.audioElement.removeEventListener('play', this.OnPlay);
        this.audioElement.removeEventListener('ended', this.props.OnEndedListener);
        this.audioElement.removeEventListener('loadeddata', this.onLoadedData);
        this.audioElement.removeEventListener('pause', this.OnPause);
    }

    onMouseDown = () => {
        this.audioElement.pause();
    }

    onChange = (e) => {
        const value = e.target.value;
        this.setState(() => ({ value }));
        this.audioElement.currentTime = value;
        clearInterval(this.currentTimeInterval);
    }

    onMouseUp = () => {
        this.audioElement.play();
    }
    
    onLoadedData = () => {
        // console.log('Loaded Data Called...');
        if (!this.props.isPlaying) {
            this.props.togglePlaying();
        }
        if (!this.state.isSeeking) {
            this.playAudio();
        }

    }
    
    onChangeVolume = (e) => {
        const volume = e.target.value;
        console.log(volume);
        this.props.updateVolume(volume);
        this.audioElement.volume = (volume);
    }
    
    OnPause = () => {
        clearInterval(this.currentTimeInterval);
    }

    handleKeyPress = (event) => { // Needs to be a global event listener
        console.log(event.key);
        if (event.key === 'Space') {
            if (this.props.isPlaying) {
                this.pauseAudio();
            } else {
                this.playAudio();
            }
            this.props.togglePlaying();
        }
    }

    OnEndedListener = () => {
        if (this.props.repeat) {
            this.audioElement.load();
            this.audioElement.play();
        } else if (this.props.playingIndex < this.props.queue.length) {
            this.props.loadNextTrack();
            
        } else {
            clearInterval(this.currentTimeInterval); 
            this.setState(() => ({ value: 0 })); // If no track in queue, reset slider
            this.props.togglePlaying(); // toggle back to not playing
        }

    }


    OnPlay = () => {
        this.currentTimeInterval = setInterval(() => {
            this.setState(() => ({ value: this.audioElement.currentTime }));
        }, 500);

    }

    handleMusicControls = (e) => {
        const {  
            currentTrack,
            playingIndex,
            queue
         } = this.props;
        const id = e.target.id;
        switch (id) {
            case 'pause':
                this.pauseAudio();
                this.props.togglePlaying();
                break;

            case 'play':
                if (!_.isEmpty(currentTrack)) {
                    this.playAudio();
                    this.props.togglePlaying();
                }
                break;

            case 'shuffle':
                this.props.toggleShuffle();
                break;
            case 'repeat':
                this.props.toggleRepeat();
                break;
            case 'next':
                if (playingIndex < queue.length) {
                    this.props.loadNextTrack();
                }
                break;
            case 'prev':
                if (playingIndex > 0) {
                    this.props.previousTrack();
                }
                break;

            default:
                console.log('ERROR - DEFAULT CASE MUSICPLAYER');
        }
    }

    playAudio = () => {
        this.audioElement.play();
    }

    playAndLoad = () => {
        this.audioElement.load();
        this.audioElement.play();
    }

    pauseAudio = () => {
        this.audioElement.pause();
    }

    render() {
        const { 
            repeat,
            currentTrack,
            isPlaying,
            shuffle,
            duration,
            volume
            
         } = this.props;
        const preview_url = _.isEmpty(currentTrack) ? null : currentTrack.track ? currentTrack.track.preview_url : currentTrack.preview_url; //eslint-disable-line
        return (
            <React.Fragment>
                <div className="musicDisplay" key="musicDisplay">
                    <MusicPlayer 
                    handleMusicControls={ this.handleMusicControls }
                    keyPress={ this.handleKeyPress }
                    repeat={ repeat }
                    currentTrack={ currentTrack }
                    isPlaying={ isPlaying }
                    shuffle={ shuffle }
                    key="musicPlayer"
                    />

                <div className="progress" key="progress">
                    
                    <input 
                    className="inputProgress"
                    ref={ (slider) => { this.slider = slider; } }
                    value={ this.state.value }
                    type="range"
                    name="points" 
                    min="0"
                    max={ duration }
                    onMouseDown={ this.onMouseDown }
                    onMouseUp={ this.onMouseUp }
                    onChange={ this.onChange }
                    key="inputProgress"
                    />
                    <ul>
                        <li className="currentVal">{ (this.state.value / 100).toFixed(2) }</li>
                        <li>{ (duration / 100).toFixed(2) }</li>
                    </ul>    
                    </div>


                <div className="volumeControl" key="volume">
                        <FaVolumeUp color={ '#cfcfd1' } size={ '20px' } />
                    <input
                        className="volumeInput"
                        type="range"
                        name="points"
                        value={ volume }
                        max="1"
                        min="0"
                        step="0.01"
                        onChange={ this.onChangeVolume }

                    />

                </div>
                </div>
                <audio 
                ref={ (audio) => { this.audioElement = audio; } }
                src={ preview_url }
                key="audio"
                />
                <div className="discodiv" />
                    
                <Playing currentTrack={ currentTrack } key="playing" />

            </React.Fragment>
        );
    }

}

const mapStateToProps = (state) => ({
    repeat: state.music.repeat,
    isPlaying: state.music.isPlaying,
    queue: state.music.queue,
    currentTrack: state.music.currentTrack,
    shuffle: state.music.shuffle,
    duration: state.music.duration,
    volume: state.music.volume,
    isAuthenticated: state.user.isAuthenticated,
    playingIndex: state.music.playingIndex,
});

const mapDispatchToProps = (dispatch) => {
    return {
        togglePlaying: () => dispatch(togglePlaying()),
        loadNextTrack: () => dispatch(loadNextTrack()),
        toggleShuffle: () => dispatch(toggleShuffle()),
        toggleRepeat: () => dispatch(toggleRepeat()),
        updateVolume: (volume) => dispatch(updateVolume(volume)),
        previousTrack: () => dispatch(previousTrack()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicBar);